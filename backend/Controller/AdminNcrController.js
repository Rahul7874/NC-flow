import expressAsyncHandler from "express-async-handler";


import ADCNCR from "../Models/AdminNcrModel.js";



//post request for the options for creating ncr
export const optionsforNCR = expressAsyncHandler(async (req, res) => {
    const newNcr = new ADCNCR(req.body);
    newNcr.save((err) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(201).json({
                message: "Created new NCR options for useres successfuly",
            });
        }
    });

})


//Get all request for ncr Options
export const getALLncrOption = expressAsyncHandler(async (req, res) => {

    const ncr = await ADCNCR.find();
    try {
        res.status(200).send({
            message: "GOt All Ncr options successfully",
            ncr: ncr,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const getALLncrOption2 = expressAsyncHandler(async (req, res) => {

    const ncr = await ADCNCR.find();
    try {
        res.status(200).send({
            message: "GOt All Ncr options successfully",
            ncr: ncr,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

