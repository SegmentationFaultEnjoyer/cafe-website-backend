import { Router } from 'express'

import { AuthController } from '@/controllers'

const authRouter = Router()

authRouter.post('/login', AuthController.loginToAdminPanel)

export { authRouter }
