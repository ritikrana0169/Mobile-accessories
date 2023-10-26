const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    folder: Number,
    battery: Number,
    backPannel: Number,
    chargingConnector: Number,
    earphoneConnector: Number,
    dataCableType_c: Number,
    dataCableType_b: Number,
    charger: Number,
    touchGlass: Number,
    onOffButton: Number,
    speaker: Number,
    microphone: Number,
    waterDamagedRepair: Number,
    sortedDamagedRepair: Number,
    EmmcProblemRepair: Number,
    NetworkProblem: Number,
    CPUproblem: Number,
    GraphicsProblem: Number,
    SoftwareIssue: Number,
}, {
    versionKey:false
});


const itemModel = mongoose.model("items", itemSchema);


module.exports = {
    itemModel
}