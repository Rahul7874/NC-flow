import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    objectid: { type: String,require:true},
    type: { type: String ,require:true},
    location: { type: String ,require:true},
    processstage: { type: String ,require:true},
    partno: { type: String ,require:true},
    rework: { type: String ,require:true},
    description: { type: String ,require:true},
    failuretype: { type: String ,require:true},
    attachments: { type: String ,require:true},
    rcarequired: { type: String ,require:true},
    creator: { type: String ,require:true},
    creatorid: { type: String ,require:true},
    resolutionowner: { type: String ,require:true},
    resolutionownerid: { type: String ,require:true},
    validator: { type: String ,require:true},
    validatorid: { type: String ,require:true},
    approver: { type: String ,require:true},
    approverid: { type: String ,require:true},
    containmentaction: { type: String ,require:true},
    causes: { type: String ,require:true},
    rootcause: { type: String ,require:true},
    verifiedcause: { type: String ,require:true},
    issuecatogorization: { type: String ,require:true},
    roattachments: { type: String ,require:true},
    solutionidentified: { type: String ,require:true},
    rostatus: { type: String ,require:true},
    validatorstatus: { type: String ,require:true},
    approverstatus: { type: String ,require:true},
})

const taskData = mongoose.model("taskdatas", TaskSchema)

export default taskData