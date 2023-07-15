import { validate } from 'class-validator'

import { BadRequestError } from '@/helpers'

export async function validateRequest(classToValidate: object) {
  const errors = await validate(classToValidate)

  if (!errors.length) return

  throw new BadRequestError('failed to parse upload file request: ' + errors[0].toString())
}
