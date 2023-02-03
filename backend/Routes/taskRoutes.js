import express from 'express'
import {getTask,taskSingle} from '../Controller/TaskController.js'


const taskRoute = express.Router()

// read router
taskRoute.get('/getalltask',getTask)

taskRoute.get('/task/:id',taskSingle)

export default taskRoute