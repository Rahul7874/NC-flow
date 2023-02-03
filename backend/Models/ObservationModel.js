import mongoose from 'mongoose'

const obsModel = mongoose.Schema({
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

const Observation = mongoose.model("observation", obsModel);


export default Observation