import expressAsyncHandler from "express-async-handler";
import roleData from "../Models/UserRoleModel.js";

// post user role  data
export const UserRoleControllerCreate = expressAsyncHandler(async (req, res) => {
    const { username,name, usertype } = req.body.data
    try {
        const data = await new roleData({ username,name,usertype})
        
        if (data) {
            await data.save((error, response) => {
                if (error) {
                    return res.status(400).json({message:"Error to create",error})
                }
                if (response) {
                    return res.status(201).json({message:"Role Data Created Successfully",data})
                }
            })
        }
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }

})

// delete controller

export const UserRoleControllerDelete = expressAsyncHandler(async (req, res) => {
    try {
        const deleteid = await req.body.id
        console.log(req.body)
        const deletedata = await roleData.findByIdAndDelete(deleteid)

        if (deletedata) {
            return res.status(200).json({message:"Role data deleted successfully",data:deletedata})
        }
        else {
            return   res.status(400).json({message:"data id not found to delete"})
            }

    } catch (error) {
        return res.status(500).json({message:"internal server error",error})
    }
})

// read roles

export const getRole = expressAsyncHandler(async (req, res) => {
    try {
        const data = await roleData.find({ $or: [{ username: { '$regex': req.query.searchQ } }] })
        if (data) {
            return res.status(200).json({message:true,data})
        }
    } catch (error) {
      return res.status(404).json({message:"No found"})
    }
  })

  // get all RO

export const getAllRo = expressAsyncHandler(async (req, res) => {
    try {
        const data = await roleData.find({ $or: [{ usertype: { '$regex': req.query.searchQ}}]})
        if (data) {
            res.status(200).send({
                message: "Get All ro successfully",
                resolutionowner: data,
            });
        }
    } catch (error) {
      return res.status(404).json({message:"No found"})
    }
  })

  // get all Validaor

export const getAllValidator = expressAsyncHandler(async (req, res) => {
    try {
        const data = await roleData.find({ $or: [{ usertype: { '$regex': req.query.searchQ}}]})
        if (data) {
            res.status(200).send({
                message: "Validator data found",
                validator: data,
            });
        }
    } catch (error) {
      return res.status(404).json({message:"No found"})
    }
  })

  // get all Validaor

export const getAllApprover = expressAsyncHandler(async (req, res) => {
    try {
        const data = await roleData.find({ $or: [{ usertype: { '$regex': req.query.searchQ}}]})
        if (data) {
            res.status(200).send({
                message: "Approver data found",
                approver: data,
            });
        }
    } catch (error) {
      return res.status(404).json({message:"No found"})
    }
  })
