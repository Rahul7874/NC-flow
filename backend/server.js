import express from 'express'
import connectDatabase from './config/MongoDb.js'
import userRouter from './Routes/userRoutes.js'
import roleRoute from './Routes/userRoleRoutes.js'
import taskRoute from './Routes/taskRoutes.js'
import oBservation from './Routes/ObservationRoutes.js'
import NCR from './Routes/NcrRoutes.js'
import NCRoptions from './Routes/AdminNcrRoutes.js'
import suboBservation from './Routes/SumittedObsRoutes.js'
import SubmittedObs from './Routes/SumittedObsRoutes.js'

import cors from 'cors'
const app = express()


    app.use(cors())
app.use(express.json())

connectDatabase()


app.get('/', (req, res) => {
    res.send('NC Flow App is connected')
})

// user Data api

app.use('/api', userRouter)

// halfoption data api
app.use('/api',roleRoute)

// task data api
app.use('/api',taskRoute)

//api for the observations
app.use('/api', oBservation)

//api for the ncr
app.use("/api", NCR)

//api for submitted observation in which creator acsses is not allowed
app.use("/api",suboBservation)

//api for the ncr
app.use("/api", NCR)

//api for creation of ncr option by admin
app.use("/api",NCRoptions)

app.use("/api",SubmittedObs)




app.listen(3001,console.log('Server is running on port 3001'))