import 'module-alias/register'
import 'reflect-metadata'

import cookieParser from 'cookie-parser'
import express from 'express'
import http from 'http'

import { startBot } from '@/bot'
import { getConfig } from '@/config'
import { createLogger } from '@/helpers'
import { Database } from '@/mongodb'
import { router } from '@/routes'

export const logger = createLogger()
export const config = getConfig()
export const dataBase = new Database()

const MAX_SHUTDOWN_WAIT_TIME = 5000
const PORT = config.app.port
const HOST = config.app.host
const URL = `http://${HOST}:${PORT}`

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(router)

const handleShutDown = async (signal: NodeJS.Signals) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`)

  await dataBase.close()

  server.close(err => {
    if (err) {
      logger.error('Failed to close server')
      return
    }

    logger.info('Server process terminated')
    process.exit(0)
  })

  // Force close server after n seconds
  setTimeout(() => {
    logger.warning('Forcing server shutdown')

    process.exit(1)
  }, MAX_SHUTDOWN_WAIT_TIME)
}

// Listen for termination signals
process.on('SIGINT', handleShutDown)
process.on('SIGTERM', handleShutDown)

const run = async () => {
  await dataBase.connect()

  startBot()

  server.listen(PORT, HOST, () => logger.debug(URL))
}

run()
