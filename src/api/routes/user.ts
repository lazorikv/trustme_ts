import { Router, Request, Response } from 'express'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import * as userController from '../controllers/user'
import { checkCache } from '../../lib/check-cache'

const userRouter = Router()

userRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const results = await userController.getAll()
    return res.status(200).send(results)
})

userRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await userController.getById(id)
    return res.status(200).send(result)
})

userRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const payload:UpdateUserDTO = req.body
    const result = await userController.update(id, payload)
    return res.status(201).send(result)
})

userRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await userController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

export default userRouter