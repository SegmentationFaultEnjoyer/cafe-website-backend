import { IsString } from 'class-validator'
import { Request } from 'express'

import { CreateOrderRequest } from '@/requests'

export class RedirectOrderRequest extends CreateOrderRequest {
  @IsString()
  order_id: string

  constructor(req: Request) {
    super(req)
    this.order_id = req.body.order_id
  }
}
