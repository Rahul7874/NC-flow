import express from 'express'
import { UserRoleControllerCreate,getAllApprover,getAllValidator, UserRoleControllerDelete,getRole,getAllRo} from '../Controller/UserRoleController.js'


const roleRoute = express.Router()


// create half option route data

roleRoute.post('/roledata',UserRoleControllerCreate)

// delete half option data

roleRoute.put('/roledatadelete', UserRoleControllerDelete)

// read router
roleRoute.get('/role',getRole)

//get ro
roleRoute.get('/role/getallro',getAllRo)

//get validator
roleRoute.get('/role/getallva',getAllValidator)

//get approver
roleRoute.get('/role/getallap',getAllApprover)



export default roleRoute