import expressAsyncHandler from "express-async-handler";
import SubmitObservation from "../Models/SubmittedObsModel.js";

//posting the submitted observation
export const submitedobs = expressAsyncHandler(async (req, res) => {
    const { Product, ProcessStage, Problem, Issue, Rootcause, PartNo, ReworkHrs, created } = req.body.dataf;
    try {
        await SubmitObservation.create({ Product, ProcessStage, Problem, Issue, Rootcause, PartNo, ReworkHrs, created });

        return res.status(201).json({ message: "Observation created Successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

//get request for the submitted observation
export const getSubmiitedobservation = expressAsyncHandler(async (req, res) => {
    const obs = await SubmitObservation.find();
    try {
        res.status(200).send({
            message: "successfully got all Submitted observation",
            observations: obs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


})



