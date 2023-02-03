import express from 'express'

import {
    observationcreation,
    ObsControllerDelete,
    observationUPdate,
    observationgetALL,
    observationgetByid
} from "../Controller/ObservationController.js"

const oBservation = express.Router()

//post request of observation creation
oBservation.post('/createobs', observationcreation)

//delete by id request of observation

oBservation.put('/obsdatadelete', ObsControllerDelete)

//Patch by id request of observation
oBservation.put('/patchobs',observationUPdate)

//Get ALL request of observation
oBservation.get("/getobs", observationgetALL)

//Get request by id of observation
oBservation.get("/getobs/:id", observationgetByid)

export default oBservation