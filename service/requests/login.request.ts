import { IsString } from 'class-validator'
import { Request } from 'express'

export class LoginRequest {
  @IsString()
  login: string

  @IsString()
  password: string

  constructor(req: Request) {
    this.login = req.body.login
    this.password = req.body.password
  }
}
