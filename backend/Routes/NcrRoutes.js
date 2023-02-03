import express from 'express'

import { Ncrcreation,getALLncr,DeleteNcrbyid,PatchBYidncr } from '../Controller/NcrController.js'

const NCR = express.Router()

//post request of Ncr creation
NCR.post("/createncr",Ncrcreation)

//Route for Get all ncr
NCR.get("/getncr",getALLncr)


//Route for Delete ncr by id
NCR.put('/ncrdatadelete', DeleteNcrbyid)


//Route for Patch ncr or update ncr
NCR.put("/updatencr",PatchBYidncr)

export default NCR
