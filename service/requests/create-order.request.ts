import { IsArray, IsNumber, IsObject } from 'class-validator'
import { Request } from 'express'

import { CustomerInfo, OrderedItems } from '@/types'

export class CreateOrderRequest {
  @IsArray()
  contains: OrderedItems[]

  @IsNumber()
  payment: number

  @IsNumber()
  totalPrice: number

  @IsObject()
  customerInfo: CustomerInfo

  constructor(req: Request) {
    this.contains = req.body.contains
    this.payment = req.body.payment
    this.totalPrice = req.body.totalPrice
    this.customerInfo = req.body.customerInfo
  }
}
