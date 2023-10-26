const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
     name: String,
     email: String,
     password: String,
     mobile: Number
}, {
    versionKey:false
})


const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
    adminModel
}