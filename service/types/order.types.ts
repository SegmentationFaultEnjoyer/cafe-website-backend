export type OrderedItems = {
  name: string
  price: number
  amount: number
  extras: Array<Extras>
  option: Array<Option>
  totalPrice: number
}

export type Option = {
  name: string
  pickedOption: string
}

export type Extras = {
  name: string
  amount: number
  price: number
}

export type CustomerInfo = {
  name: string
  phoneNumber: string
  addres: string
}
