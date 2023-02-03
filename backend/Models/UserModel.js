import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    eid: { type: String, required: true,unique: true },
    email:{type:String,required:true,unique:true},
    mobno: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    isAdmin:{type:Boolean,default:false},
})

const userData = mongoose.model('userdatas', UserSchema)

export default userData