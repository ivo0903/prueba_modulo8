import { Router } from "express";
import userRouter from './user.routes.js'
import bootcampRouter from './bootcamp.routes.js'
import mailRouter from './email.routes.js'
import authRouter from './auth.routes.js'




const router = Router()

router.use('/user', userRouter);
router.use('/bootcamp',bootcampRouter)
router.use('/mail', mailRouter);
router.use('/', authRouter);


export default router