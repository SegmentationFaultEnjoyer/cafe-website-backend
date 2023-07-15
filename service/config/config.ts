enum LogLevel {
  Error = 'Error',
  Warn = 'Warn',
  Info = 'Info',
  Http = 'Http',
  Verbose = 'Verbose',
  Debug = 'Debug',
  Silly = 'Silly',
}

export type Config = {
  app: {
    name: string
    host: string
    port: number
    globalPrefix: string
  }
  mongodb: {
    accessKey: string
  },
  auth: {
    secret: string
  },
  bot: {
    accessToken: string
    start: boolean
  },
  wayforpay: {
    secret: string
  },
  log: {
    errorFile: string
    combinedFile: string
    level: LogLevel
    inJson: boolean
  }
}
