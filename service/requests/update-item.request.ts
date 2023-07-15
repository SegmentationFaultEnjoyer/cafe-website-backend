import { IsString } from 'class-validator'
import { Request } from 'express'

import { CreateItemRequest } from '@/requests/create-item.request'

export class UpdateItemRequest extends CreateItemRequest {
  @IsString()
  id: string

  constructor(req: Request) {
    super(req)
    this.id = req.params.id
  }
}
