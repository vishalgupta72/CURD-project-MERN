// user model
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true
    },
    city: String,
    age: Number,
    salary: Number
})

module.exports = mongoose.model("User", userSchema);