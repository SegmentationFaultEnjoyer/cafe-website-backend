import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { IdRequest } from '@/requests'

export async function deleteItem(req: Request, resp: Response) {
  try {
    const request = new IdRequest(req)

    await validateRequest(request)

    const error = await dataBase.deleteOne(request.id)

    // TODO delete file
    if (!error) {
      logger.info('detete file')
    }

    resp.sendStatus(HTTP_STATUS_CODES.NO_CONTENT)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
