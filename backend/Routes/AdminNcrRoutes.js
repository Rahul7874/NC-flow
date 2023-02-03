import express from 'express'
import { optionsforNCR,getALLncrOption,getALLncrOption2 } from '../Controller/AdminNcrController.js'

const NCRoptions = express.Router()


//post request for creation of ncr options
NCRoptions.post("/createncroption",optionsforNCR)

NCRoptions.get("/getncroption",getALLncrOption)

NCRoptions.get("/getncroption2",getALLncrOption2)

export default NCRoptions
