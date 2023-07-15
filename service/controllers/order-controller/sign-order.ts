import { createHmac } from 'crypto'
import { Request, Response } from 'express'
import { config, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { SignOrderRequest } from '@/requests'

export async function signOrder(req: Request, resp: Response) {
  try {
    const request = new SignOrderRequest(req)

    await validateRequest(request)

    const signedHash = createHmac('md5', config.wayforpay.secret)
      .update(request.message)
      .digest('hex')

    resp.status(HTTP_STATUS_CODES.OK).json({ hash: signedHash })
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
