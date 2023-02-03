import expressAsyncHandler from "express-async-handler";
import Observation from "../Models/ObservationModel.js";

//post request for observation
export const observationcreation = expressAsyncHandler(async (req, res) => {

    const { Product, ProcessStage, Problem, Issue, Rootcause, PartNo, ReworkHrs, created } = req.body.data;
    try {
        await Observation.create({ Product, ProcessStage, Problem, Issue, Rootcause, PartNo, ReworkHrs, created });

        return res.status(201).json({ message: "Observation created Successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// delete controller

export const ObsControllerDelete = expressAsyncHandler(async (req, res) => {
    try {
        const deleteid = await req.body.id
        console.log(req.body)
        const deletedata = await Observation.findByIdAndDelete(deleteid)

        if (deletedata) {
            return res.status(200).json({ message: "Obs data deleted successfully", data: deletedata })
        }
        else {
            return res.status(400).json({ message: "data id not found to delete" })
        }

    } catch (error) {
        return res.status(500).json({ message: "internal server error", error })
    }
})


//Update request for observation

export const observationUPdate = expressAsyncHandler(async (req, res) => {
    let { id,Product,ProcessStage,Problem,PartNo,Issue,Rootcause,ReworkHrs } = req.body.data
    try {
        if (id) {
            const data = await Observation.findByIdAndUpdate(id, { Product,ProcessStage,Problem,PartNo,Issue,Rootcause,ReworkHrs}, { new: true })
            
            if(data){
                return res.status(201).json({message:"successfully updated",data})
            }
            else {
                return res.status(400).json({message:"no data found to update"})
            }
        }
    } catch (error) {
      return  res.status(500).json({error})
    }
})

//get all request for observation
export const observationgetALL = expressAsyncHandler(async (req, res) => {
    const obs = await Observation.find();
    try {
        res.status(200).send({
            message: "Get All obs successfully",
            observations: obs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

//get request BY ID for observation
export const observationgetByid = expressAsyncHandler(async (req, res) => {
    try {
        const { id: obsId } = req.params;
        const obsr = await Observation.findById(obsId);
        if (!obsr) {
            return res.status(404).json({ message: `No obs with id: ${obsId}` });
        } else {
            res.status(200).json({
                message: `obs with id : ${obsId} found successfully`,
                obsr: obsr,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

})
