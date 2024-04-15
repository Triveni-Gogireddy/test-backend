import express from 'express'
import { customergetUsers } from '../Controllers/customerControllers.js'

export const customerRouter = express.Router()

customerRouter.get("/users",customergetUsers)
