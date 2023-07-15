import * as joi from 'joi'

import { Config } from './config'

const logFileRE = /[a-zA-Z1-9_.]\.log/

export const validationSchema = joi.object<Config>({
  app: {
    name: joi.string().required(),
    host: joi.string().allow('').required(),
    port: joi.number().default(3000).required(),
    globalPrefix: joi.string().default('v1'),
  },
  mongodb: {
    connectionString: joi.string().required(),
  },
  auth: {
    secret: joi.string().required(),
  },
  bot: {
    accessToken: joi.string().required(),
    start: joi.boolean().equal(true, false).default(false),
  },
  wayforpay: {
    secret: joi.string().required(),
  },
  log: {
    errorFile: joi.string().optional().allow('').pattern(logFileRE),
    combinedFile: joi.string().optional().pattern(logFileRE),
    level: joi.string().equal('debug', 'info').default('info'),
    inJson: joi.boolean().equal(true, false).default(false),
  },
})
