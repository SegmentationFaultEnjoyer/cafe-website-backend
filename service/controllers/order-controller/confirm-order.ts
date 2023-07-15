import { createHmac } from 'crypto'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { sendMessage } from '@/bot'
import { HTTP_STATUS_CODES } from '@/enums'
import { getErrorResponse, NotFoundError } from '@/helpers'
import { dataBase, logger } from '@/server'
import { config } from '@/server'

type WayForPayResponse = {
  merchantAccount: string
  orderReference: string
  merchantSignature: string
  amount: number
  currency: string
  authCode: string
  email: string
  phone: string
  createdDate: number
  processingDate: number
  cardPan: string
  cardType: string
  issuerBankCountry: string
  issuerBankName: string
  recToken: string
  transactionStatus: string
  reason: string
  reasonCode: number
  fee: number
  paymentSystem: string
  acquirerBankName: string
  cardProduct: string
  clientName: string
}

type OrderInfo = Parameters<typeof sendMessage>[0]

export async function confirmOrder(req: Request, resp: Response) {
  try {
    const wayforpayResp: WayForPayResponse = JSON.parse(Object.keys(req.body)[0])

    const orderId = new ObjectId(wayforpayResp.orderReference)

    const orderInfo = (await dataBase.getOne(
      { _id: orderId },
      {},
      'orders',
    )) as unknown as OrderInfo

    if (!orderInfo) throw new NotFoundError('Order doesnt exist')

    await sendMessage({
      contains: orderInfo.contains,
      payment: orderInfo.payment,
      totalPrice: orderInfo.totalPrice,
      customerInfo: orderInfo.customerInfo,
      order_id: wayforpayResp.orderReference,
    })

    const orderConfirmTime = Date.now()
    const signature = createHmac('md5', config.wayforpay.secret)
      .update(`${wayforpayResp.orderReference};accept;${orderConfirmTime}`)
      .digest('hex')

    resp.json({
      orderReference: wayforpayResp.orderReference,
      status: 'accept',
      time: orderConfirmTime,
      signature,
    })

    resp.sendStatus(HTTP_STATUS_CODES.OK)
  } catch (error) {
    logger.error(error.message)
    resp.status(error.status ?? HTTP_STATUS_CODES.INTERNAL_ERROR).send(getErrorResponse(error))
  }
}
