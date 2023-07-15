import { IsString } from 'class-validator'
import { Request } from 'express'

export class IdRequest {
  @IsString()
  id: string

  constructor(req: Request) {
    this.id = req.params.id
  }
}
