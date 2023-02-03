import mongoose from 'mongoose'

const RoleSchema = mongoose.Schema({
    username: { type: String,require:true},
    name: { type: String ,require:true},
    usertype: { type: String ,require:true},
})

const roleData = mongoose.model("roledatas", RoleSchema)

export default roleData