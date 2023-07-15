import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, validateRequest } from '@/helpers'
import { CreateOrderRequest } from '@/requests'

const MONTH = 30 * 24 * 60 * 60 * 1000

// TODO: normal responses

export async function createOrder(req: Request, resp: Response) {
  try {
    const request = new CreateOrderRequest(req)

    await validateRequest(request)

    const expireDate = new Date(Date.now() + 3 * MONTH)

    const id = await dataBase.addOne({ ...request, expireAt: expireDate }, 'orders')

    if (id === 1) throw new Error('Error creating order')

    resp.status(HTTP_STATUS_CODES.CREATED).json({ id })
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
