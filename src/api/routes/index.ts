import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'
import addressRouter from './address'
import apartmentRouter from './apartment'
import utilsRouter from '../controllers/utils/emailSender'


const router = Router()

router.use('/', authRouter)
router.use('/user', userRouter)
router.use('/address', addressRouter)
router.use('/apartment', apartmentRouter)
router.use('/utils', utilsRouter)

export default router