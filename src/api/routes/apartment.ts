import { Router, Request, Response } from 'express'
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto'
import * as apartmentController from '../controllers/apartment'
import * as apartmentPhotoController from '../controllers/apartmentPhotos'
import * as addressController from '../controllers/address'
import { checkCache } from '../../lib/check-cache'
import { CreateAddressDTO } from '../dto/address.dto'
import { deleteS3Object, upload } from '../../../s3'
import Address from '../../db/models/address'
import { Op } from 'sequelize'
import Apartment from '../../db/models/apartment'
import { tokenRequired } from '../../middlewares/jwtMiddleware'
import { CreateApartmentPhotoDTO } from '../dto/photos.dto'
import ApartmentPhoto from '../../db/models/apartment_photos'



const apartmentRouter = Router()

apartmentRouter.get('/rec', checkCache, async (req: Request, res: Response) => {
    const results = await apartmentController.recommendApartment()
    return res.status(200).send(results)
  })

apartmentRouter.post('/', tokenRequired, upload.fields([{ name: 'data' }]),  async (req: Request, res: Response) => {
    
    const payload: CreateApartmentDTO = JSON.parse(req.body.data)
    try {
        payload.landlordId = req.user.id
    }
    catch (error) {
        return res.status(401).json({ message: 'Not valid token' });
    }
    const addressData: CreateAddressDTO = payload.addressId as any
    const address = await addressController.create(addressData)
    payload.addressId = address.id;
    const result = await apartmentController.create(payload)
    return res.status(200).send(result)
})

apartmentRouter.post('/:apartmentId/photos', upload.fields([{ name: 'photos' }]), async (req: Request, res: Response) => {
  const { apartmentId } = req.params;
  const photos_data: any = req.files;
  const results = [];
    
    if (photos_data) {
        if (photos_data.photos) {
            for (const photo of photos_data.photos) {
              const url = photo.location;
              const payload: CreateApartmentPhotoDTO = { url, apartmentId }
              const result = await apartmentPhotoController.create(payload)
              results.push(result)
            }
        }
    }
  return res.status(201).send(results)
})

apartmentRouter.get('/:id/photos', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await apartmentPhotoController.getByApartmentId(id)
  return res.status(200).send(result)
})

apartmentRouter.delete('/photo/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const photo = await ApartmentPhoto.findByPk(id)
  if (photo) {
    await deleteS3Object(photo.url)
  }
  const result = await apartmentPhotoController.deleteById(id)
  return res.status(204).send({
      success: result
  })
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
      const addresses = await Address.findAll({
        where: {
          city: {
            [Op.like]: `%${location}%`,
          },
        },
        attributes: ["id"],
      });
      const addressIds = addresses.map((address) => address.id);
      const apartmentFilter = {
        addressId: addressIds,
        room_count: rooms || { [Op.gt]: 0 },
        floor: floor || { [Op.gt]: 0 },
        cost: {
          [Op.between]: [minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER],
        },
      };
      const totalApartmentsCount = await Apartment.count({
        where: apartmentFilter,
      });
      const apartments = await apartmentController.getAllPagination(pageParse, limitParse, apartmentFilter)
      const result = [apartments, totalApartmentsCount]
    return res.status(200).send(result)
    } catch (error) {
      console.error("Error while searching for apartments:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

apartmentRouter.get('/', tokenRequired, async (req: Request, res: Response) => {
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
    const payload: UpdateApartmentDTO = JSON.parse(req.body.data)
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