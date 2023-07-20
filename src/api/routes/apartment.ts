import { Router, Request, Response } from 'express'
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto'
import * as apartmentController from '../controllers/apartment'
import * as addressController from '../controllers/address'
import { checkCache } from '../../lib/check-cache'
import multer from 'multer'
import multerS3 from 'multer-s3';
import { s3Client } from '../../db/config'
import { CreateAddressDTO } from '../dto/address.dto'
import getUser from '../controllers/auth/getUser'
import { underscoredIf } from 'sequelize/types/utils'

const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: 'trustmets',
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      }
    })
  });

const apartmentRouter = Router()

apartmentRouter.get('/rec', checkCache, async (req: Request, res: Response) => {
    const results = await apartmentController.recommendApartment()
    return res.status(200).send(results)
  })

apartmentRouter.post('/', upload.fields([{ name: 'data' }, { name: 'photos' }]),  async (req: Request, res: Response) => {
    
    let landlordId: number = 1;
    console.log(req.headers.token)
    let authorizationHeader = req.headers.token || "";
    landlordId = await getUser(authorizationHeader)
    const payload: CreateApartmentDTO = JSON.parse(req.body.data)
    payload.landlordId = landlordId
    console.log(payload)
    const addressData: CreateAddressDTO = payload.address
    const address = await addressController.create(addressData)
    payload.addressId = address.id
    const photos_data = req.files;
    const photosUrl = [];
    if (photos_data.photos) {
        for (const photo of photos_data.photos) {
            photosUrl.push(photo.location)
        }
    }
    payload.photos = photosUrl;
    const result = await apartmentController.create(payload)
    return res.status(200).send(result)
})

apartmentRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const page: number = parseInt(req.query.page as string) || 1
    const limit: number = parseInt(req.query.limit as string) || 155
    const results = await apartmentController.getAllPagination(page, limit)
    return res.status(200).send(results)
})

apartmentRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await apartmentController.getById(id)
    return res.status(200).send(result)
})

apartmentRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const payload:UpdateApartmentDTO = req.body
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