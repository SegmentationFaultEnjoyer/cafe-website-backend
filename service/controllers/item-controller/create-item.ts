import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { CreateItemRequest } from '@/requests'

export async function createItem(req: Request, resp: Response) {
  try {
    const request = new CreateItemRequest(req)

    await validateRequest(request)

    const id = await dataBase.addOne(request)

    if (id === 1) throw new Error('Failed to add item to database')

    resp.status(HTTP_STATUS_CODES.CREATED).json({ id })
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
