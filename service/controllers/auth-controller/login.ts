import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { HTTP_STATUS_CODES } from '@/enums'
import { BadRequestError, getErrorResponse, isHashMatch, validateRequest } from '@/helpers'
import { LoginRequest } from '@/requests'
import { config, dataBase, logger } from '@/server'

const cookieKey = 'token'

export async function loginToAdminPanel(req: Request, resp: Response) {
  try {
    const request = new LoginRequest(req)

    await validateRequest(request)

    const data = (await dataBase.getAdmin()) as unknown as typeof request

    if (!data) throw new Error('Failed to get auth credentials from db')

    const isPasswordMatch = await isHashMatch(request.password, data.password)

    if (request.login !== data.login || !isPasswordMatch) {
      throw new BadRequestError('Login or password are incorrect')
    }

    const accessToken = jwt.sign({ login: data.login, password: data.password }, config.auth.secret)

    resp.cookie(cookieKey, accessToken).sendStatus(HTTP_STATUS_CODES.OK)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
