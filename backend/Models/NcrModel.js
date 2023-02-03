import mongoose from 'mongoose'


const NcrModel = mongoose.Schema({
    Type: { type: String, required: true },

    Problem: { type: String, required: true },

    ProcessStage: { type: String, required: true },

    PartNo: { type: String, required: true },

    ReworkHrs: { type: Number, required: true },

    Issue: { type: String, required: true },

    FailureType: { type: String, required: true },

    RCA: {
        type: String,
        enum: ['Yes', 'No'],
        required: true

    },
    Resolutionowner: {
        type: String,
        required: true
    },
    RCAValidator: {
        type: String,
        required: true
    },
    Finalapprover: {
        type: String,
        required: true
    },
    Creator: {
        type: String,
        required: true
    },
    CreatorId: {
        type: String,
        required: true
    },
    source: {
        file: { type: Buffer },
        filename: { type: String },
        mimetype: { type: String }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Ncr = mongoose.model("ncrs", NcrModel);


export default Ncr;