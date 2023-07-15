import { Request, Response } from 'express'
import { dataBase, logger } from 'server'

import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse } from '@/helpers'

export async function getItemsList(req: Request, res: Response) {
  try {
    const itemsList = await dataBase.getProducts()

    res.json({ data: itemsList })
  } catch (error) {
    logger.error(error.message)
    res.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
