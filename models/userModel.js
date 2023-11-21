const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    trank: {type: Number, required: true, default: 0},
    crank: {type: Number, required: true, default: 0},
    role: {type: String, enum:["admin", "user"], default: "user"}
})

module.exports = mongoose.model("User", userSchema)