import { Router, Request, Response } from 'express'
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto'
import * as apartmentController from '../controllers/apartment'
import { checkCache } from '../../lib/check-cache'

const apartmentRouter = Router()

apartmentRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateApartmentDTO = req.body
    const result = await apartmentController.create(payload)
    return res.status(200).send(result)
})

apartmentRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const results = await apartmentController.getAll()
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