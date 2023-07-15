// import 'module-alias/register' // UNCOMMENT FOR BUILD

import { logger, run } from '@/server'

const main = () => {
  try {
    run()
  } catch (error) {
    logger.error(error.message)
  }
}

main()
