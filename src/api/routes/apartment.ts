import { Router, Request, Response } from 'express'
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto'
import * as apartmentController from '../controllers/apartment'
import * as addressController from '../controllers/address'
import { checkCache } from '../../lib/check-cache'
import { CreateAddressDTO } from '../dto/address.dto'
import getUser from '../controllers/auth/getUser'
import { deleteS3Object, upload } from '../../../s3'
import { compareAndFilterLists } from '../../../utils'
import { getById} from '../../db/dal/apartment';
import Address from '../../db/models/address'
import { Op } from 'sequelize'
import Apartment from '../../db/models/apartment'
import User from '../../db/models/user'



const apartmentRouter = Router()

interface InputData {
    photos: File[],
    data: unknown
}

apartmentRouter.get('/rec', checkCache, async (req: Request, res: Response) => {
    const results = await apartmentController.recommendApartment()
    return res.status(200).send(results)
  })

apartmentRouter.post('/', upload.fields([{ name: 'data' }, { name: 'photos' }]),  async (req: Request, res: Response) => {
    
    let authorizationHeader = req.headers.token as string;
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const payload: CreateApartmentDTO = JSON.parse(req.body.data)
    try {
        payload.landlordId = await getUser(authorizationHeader)
    }
    catch (error) {
        return res.status(401).json({ message: 'Not valid token' });
    }
    const addressData: CreateAddressDTO = payload.addressId as any
    const address = await addressController.create(addressData)
    payload.addressId = address.id
    const photos_data: any = req.files;
    const photosUrl = [];
    if (photos_data) {
        if (photos_data.photos) {
            for (const photo of photos_data.photos) {
                photosUrl.push(photo.location)
            }
        }
    }
    payload.photos = photosUrl;
    const result = await apartmentController.create(payload)
    return res.status(200).send(result)
})

apartmentRouter.get("/search", async (req: Request, res: Response) => {
    try {
      const { location, page, limit, rooms, floor, minPrice, maxPrice } = req.query as unknown as {
        location: string;
        page: number | undefined;
        limit: number | undefined;
        rooms: number | undefined;
        floor: number | undefined;
        minPrice: number | undefined;
        maxPrice: number | undefined;
      };
      
      const pageParse = page || 1;
      const limitParse = limit || 9;
      const offset = (pageParse - 1) * limitParse;
      // Find apartments with matching location from the Address table.
      const addresses = await Address.findAll({
        where: {
          city: {
            [Op.like]: `%${location}%`, // Partial search for location.
          },
        },
        attributes: ["id"], // Select only the 'id' field from the Address table.
      });
  
      // Extract the address ids from the addresses array.
      const addressIds = addresses.map((address) => address.id);
  
      // Search for apartments that match the given criteria.
      const apartmentFilter = {
        addressId: addressIds,
        room_count: rooms || { [Op.gt]: 0 },
        floor: floor || { [Op.gt]: 0 },
        cost: {
          [Op.between]: [minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER],
        },
      };
      
      // Get the count of all records matching the filters
      const totalApartmentsCount = await Apartment.count({
        where: apartmentFilter,
      });
      
      // Fetch the apartments with the offset and limit
      const apartments = await Apartment.findAll({
        offset,
        limit,
        where: apartmentFilter,
        include: [
          {
            model: Address,
            as: "address",
          },
          {
            model: User,
            as: "tenant",
          },
          {
            model: User,
            as: "landlord",
          },
        ],
      });
      const result = [apartments, totalApartmentsCount]
    return res.status(200).send(result)
    } catch (error) {
      console.error("Error while searching for apartments:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

apartmentRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const page: number = parseInt(req.query.page as string) || 1
    const limit: number = parseInt(req.query.limit as string) || 155
    const limitedApartments = await apartmentController.getAllPagination(page, limit)
    const total = await apartmentController.getAll()
    const results = [limitedApartments, total]
    return res.status(200).send(results)
})

apartmentRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await apartmentController.getById(id)
    return res.status(200).send(result)
})

apartmentRouter.get('/:id/landlord', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await apartmentController.getAllByLandlordId(id)
    return res.status(200).send(result)
})

apartmentRouter.put('/:id',  upload.fields([{ name: 'data' }, { name: 'photos' }]), async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const photos_data: any = req.files;
    const payload: UpdateApartmentDTO = JSON.parse(req.body.data)
    if (photos_data && payload.photos) {
        try {
            console.log(payload.photos)
            await deleteS3Object(payload.photos)
        }
        catch (error) {
            return res.status(500).json({ message: 'Problems with deleting photos from s3 bucket' });
        }
    const current_photos = (await getById(id)).photos
    if (current_photos) {
        const files_for_deleting = compareAndFilterLists(payload.photos, current_photos)
        if (files_for_deleting.length) {
            try {
                await deleteS3Object(files_for_deleting)
            }
            catch (error) {
                return res.status(500).json({ message: 'Problems with deleting photos from s3 bucket' });
            }
        }
    }
    
    if (photos_data.photos) {
        const photosUrl = [];
        for (const photo of photos_data.photos) {
            photosUrl.push(photo.location)
        }
        payload.photos = photosUrl;
    }
    }
    const result = await apartmentController.update(id, payload)
    return res.status(201).send(result)
})

apartmentRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await apartmentController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})
  

export default apartmentRouter 