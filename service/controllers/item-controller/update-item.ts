import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { UpdateItemRequest } from '@/requests'

export async function updateItem(req: Request, resp: Response) {
  try {
    const request = new UpdateItemRequest(req)

    await validateRequest(request)

    const id = request.id

    delete request.id

    const error = await dataBase.updateOne(id, request)

    if (error) throw new Error('Failed to update item')

    resp.sendStatus(HTTP_STATUS_CODES.OK)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
