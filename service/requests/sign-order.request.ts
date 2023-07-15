import { IsString } from 'class-validator'
import { Request } from 'express'

export class SignOrderRequest {
  @IsString()
  message: string

  constructor(req: Request) {
    this.message = req.body.message
  }
}
