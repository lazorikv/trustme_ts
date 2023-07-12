import { Router, Request, Response } from 'express'
import { CreateAddressDTO, UpdateAddressDTO } from '../dto/address.dto'
import * as addressController from '../controllers/address'
import { checkCache } from '../../lib/check-cache'

const addressRouter = Router()

addressRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateAddressDTO = req.body
    const result = await addressController.create(payload)
    return res.status(200).send(result)
})

addressRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const results = await addressController.getAll()
    return res.status(200).send(results)
})

addressRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await addressController.getById(id)
    return res.status(200).send(result)
})

addressRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const payload:UpdateAddressDTO = req.body
    const result = await addressController.update(id, payload)
    return res.status(201).send(result)
})

addressRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await addressController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

export default addressRouter