import { Router } from 'express'

import { ItemController } from '@/controllers'
import { isAuthorized } from '@/middlewares'

const itemsRouter = Router()

itemsRouter.get('/', ItemController.getItemsList)

itemsRouter
  .route('/:id')
  .all(isAuthorized)
  .delete(ItemController.deleteItem)
  .patch(ItemController.updateItem)

itemsRouter.post('/', isAuthorized, ItemController.createItem)

export { itemsRouter }
