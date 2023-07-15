import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { IdRequest } from '@/requests'

// TODO: normal responses

export async function deleteOrder(req: Request, resp: Response) {
  try {
    const request = new IdRequest(req)

    await validateRequest(request)

    await dataBase.deleteOne(request.id, 'orders')

    resp.sendStatus(HTTP_STATUS_CODES.NO_CONTENT)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
