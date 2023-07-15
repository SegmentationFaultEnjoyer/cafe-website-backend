import { Request, Response } from 'express'

import { sendMessage } from '@/bot'
import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { RedirectOrderRequest } from '@/requests'
import { logger } from '@/server'

export async function redirectOrder(req: Request, resp: Response) {
  try {
    const request = new RedirectOrderRequest(req)

    await validateRequest(request)

    await sendMessage(request)

    resp.sendStatus(HTTP_STATUS_CODES.OK)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
