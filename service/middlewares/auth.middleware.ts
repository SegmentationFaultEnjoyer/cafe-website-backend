import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config, logger } from 'server'

import { getErrorResponse, UnauthorizedError } from '@/helpers'

export function isAuthorized(req: Request, resp: Response, next: NextFunction) {
  try {
    if (!req.cookies.token) throw new UnauthorizedError()

    const decoded = jwt.verify(req.cookies.token, config.auth.secret)

    if (!decoded) throw new UnauthorizedError()

    next()
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status).send(getErrorResponse(error))
  }
}
