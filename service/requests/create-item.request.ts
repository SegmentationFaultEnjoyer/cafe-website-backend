import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator'
import { Request } from 'express'

type Extras = {
  name: string
  price: number
}

type Options = {
  name: string
  contains: string[]
}

export class CreateItemRequest {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsString()
  img: string

  @IsBoolean()
  isPopular: boolean

  @IsNumber()
  price: number

  @IsNumber()
  type: number

  @IsArray()
  extras?: Array<Extras>

  @IsArray()
  options?: Array<Options>

  constructor(req: Request) {
    this.name = req.body.name
    this.description = req.body.description
    this.img = req.body.img
    this.isPopular = req.body.isPopular
    this.price = req.body.price
    this.type = req.body.type
    this.extras = req.body.extras
    this.options = req.body.options
  }
}
