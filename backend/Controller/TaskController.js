import expressAsyncHandler from "express-async-handler";
import taskData from "../Models/TaskModel.js";

// read roles

export const getTask = expressAsyncHandler(async (req, res) => {
    try {
        const data = await taskData.find({ $or: [{ resolutionownerid: { '$regex': req.query.searchQ } },{ validatorid: { '$regex': req.query.searchQ } },{ approverid: { '$regex': req.query.searchQ } }] })
        if (data) {
            return res.status(200).json({message:true,data})
        }
    } catch (error) {
      return res.status(404).json({message:"No found"})
    }
  })

  // single user Data

export const taskSingle = expressAsyncHandler(async (req, res) => {
  const singleid = req.params.id
console.log(singleid)
  try {
      const data = await taskData.findById(singleid)
      if (data) {
        return  res.status(200).json({message:"successfully found single task",data})
      }
      return   res.status(400).json({message:"No id found"})
         
  }
  catch (error) {
      res.status(500).json({error})
  }
})
