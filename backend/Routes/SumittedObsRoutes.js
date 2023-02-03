import express from 'express'


import { submitedobs,getSubmiitedobservation } from '../Controller/SubmittedObsController.js'

const SubmittedObs = express.Router()

//post request for final sumited observation
SubmittedObs.post("/finalobs",submitedobs)


// GET request for final sumited observation
SubmittedObs.get("/getsubmittedobs",getSubmiitedobservation)

export default SubmittedObs

