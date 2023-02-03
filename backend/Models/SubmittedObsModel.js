import mongoose from 'mongoose'

const SubmittedobsModel = mongoose.Schema({
    Product: {
        type: String,
        required: true
    },

    ProcessStage: {
        type: String,
        required: true
    },

    Problem: {
        type: String,
        required: true
    },

    Issue: {
        type: String,
        required: true
    },

    Rootcause: {
        type: String,
        required: true
    },

    PartNo: {
        type: String,
        required: true
    },

    ReworkHrs: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const SubmitObservation = mongoose.model("submitted_observation", SubmittedobsModel);


export default SubmitObservation