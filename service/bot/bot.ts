import fs from 'fs'
import { join } from 'path'
import { Telegraf } from 'telegraf'

import { getConfig } from '@/config'
import { createLogger } from '@/helpers'
import { CustomerInfo, OrderedItems } from '@/types'

type MessagePayload = {
  contains: OrderedItems[]
  payment: number
  totalPrice: number
  order_id: string
  customerInfo: CustomerInfo
}

const config = getConfig()
const logger = createLogger()

const bot = new Telegraf(config.bot.accessToken)

const buildMessage = (payload: MessagePayload): string => {
  let str = ''
  let count = 1

  str += `<b>Замовлення</b> ${payload.order_id}\n\n`

  for (const i of payload.contains) {
    str += `${count}. <u>${i.name}</u> - <i>${i.amount} шт.</i> \n`
    str += `Ціна: <i> ${i.price} грн</i>  \n`

    if (i.extras != null) {
      str += 'Додатки: \n'
      for (const extraItem of i.extras) {
        str += `\t\t•<i>${extraItem.name} ${extraItem.amount} шт. 💴 ${extraItem.price} грн </i>\n`
      }
    }

    if (i.option != null && i.option.length != 0) {
      let tmpstr = ''
      for (const opt of i.option) {
        tmpstr += `\t\t•<i>${opt.name}: ${opt.pickedOption}</i>\n`
      }
      str += `Опції:\n${tmpstr}`
    }

    str += `Вартість: <i>${i.totalPrice}</i> грн\n`
    str += '=========================' + '\n'

    count++
  }

  const orderPayMethod = payload.payment ? 'переказ на картку' : 'здійснена на сайті'

  str += `Спосіб оплати: <b>${orderPayMethod}</b> \n`
  str += `Загальна вартість: <b>${payload.totalPrice} грн </b> 💰 \n\n`

  str += '<b>Інформація про замовника</b>\n'
  str += "Ім'я: " + payload.customerInfo.name + '\n'
  str += 'Номер телефону: ' + payload.customerInfo.phoneNumber + '\n'
  str += 'Адреса: ' + payload.customerInfo.addres

  return str
}

const getUsersList = (): number[] => {
  const rawData = fs.readFileSync(join(__dirname, 'persons.json'))
  const jsonObj = JSON.parse(rawData as unknown as string)

  if (!jsonObj.users) return []

  return jsonObj.users
}

export const startBot = () => {
  if (!config.bot.start) return

  bot.start(ctx => {
    ctx.reply('З поверненням')
  })
  bot.launch()

  logger.info('Bot started')
}

export const sendMessage = async (payload: MessagePayload) => {
  const message = buildMessage(payload)

  const users = getUsersList()

  for (const user of users) {
    await bot.telegram.sendMessage(user, message, { parse_mode: 'HTML' })
  }
}

// const handleBotStart = (ctx: StartContext) => {
//   const users = getUsersList()

//   if (!users.length || !users.includes(ctx.update.message.chat.id)) {
//     ctx.reply('Ласкаво просимо до команди')
//     return
//   }

//   ctx.reply('З поверненням')
// }

// function checkPersons(ctx: Context) {
//   if (jsonObj.users.length === 0 || !jsonObj.users.includes(ctx.update.message.chat.id)) {
//     jsonObj.users.push(ctx.update.message.chat.id)
//     fs.writeFileSync(join(__dirname, 'persons.json'), JSON.stringify(jsonObj))
//     ctx.reply('Ласкаво просимо до команди')
//     return
//   }
//   ctx.reply('З поверненням')
// }
