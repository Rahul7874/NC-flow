import mongoose from 'mongoose'


const AdimncrModel = mongoose.Schema({

    Type: { type: String, required: true },

    Problem: { type: String, required: true },

    PartNo: { type: String, required: true },

    ProcessStage: { type: String, required: true },

    Ftype: { type: String, required: true },

    created: {
        type: Date,
        default: Date.now
    }
})

const ADCNCR = mongoose.model("admin_NCR", AdimncrModel);


export default ADCNCR;