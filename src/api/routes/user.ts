import { Router, Request, Response } from 'express'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import * as userController from '../controllers/user'
import { checkCache } from '../../lib/check-cache'

const userRouter = Router()

userRouter.get('/tenants', checkCache, async (req: Request, res: Response) => {
    const results = await userController.getAllTenants()
    return res.status(200).send(results)
})

userRouter.get('/landlords', checkCache, async (req: Request, res: Response) => {
    const results = await userController.getAllLandlords()
    return res.status(200).send(results)
})

userRouter.get('/tenants/:id', checkCache, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        const results = await userController.getTenantById(id)
        return res.status(200).send(results)
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid id or role' });
    }
})

userRouter.get('/landlords/:id', checkCache, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        const results = await userController.getLandlordById(id)
        return res.status(200).send(results)
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid id or role' });
    }
})

userRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const resultsTenants = await userController.getAllTenants()
    const resultsLandlords = await userController.getAllLandlords()
    const results = resultsTenants.concat(resultsLandlords)
    return res.status(200).send(results)
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