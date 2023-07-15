import { Router } from 'express'

import { authRouter } from '@/routes/auth-router'
import { itemsRouter } from '@/routes/items-router'
import { ordersRouter } from '@/routes/orders-router'

const router = Router()

router.use('/api/items', itemsRouter)
router.use('/api/orders', ordersRouter)
router.use('/api/auth', authRouter)

export { router }
