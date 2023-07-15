import { Router } from 'express'

import { OrderController } from '@/controllers'

const ordersRouter = Router()

ordersRouter.post('/', OrderController.createOrder)
ordersRouter.delete('/:id', OrderController.deleteOrder)
ordersRouter.post('/confirm', OrderController.confirmOrder)
ordersRouter.post('/bot', OrderController.redirectOrder)
ordersRouter.post('/sign', OrderController.signOrder)

export { ordersRouter }
