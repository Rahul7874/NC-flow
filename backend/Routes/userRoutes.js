import express from 'express'
import { getSearch,GetAllUsers,getSearch2, LoginController, UpdateUserData, userDelete, userRegisterController, UserSingle } from '../Controller/userController.js'

const userRouter = express.Router()

// register router

userRouter.post('/register', userRegisterController)

// login router

userRouter.post('/login', LoginController)

// read user data

userRouter.get('/user', GetAllUsers)


userRouter.get('/user/:id',UserSingle)

// update track table data

userRouter.put('/user',UpdateUserData)

//  delete tracktable data

userRouter.put('/user/delete',userDelete)

// search router

userRouter.get('/mearch',getSearch)


userRouter.get('/mearch2',getSearch2)

export default userRouter