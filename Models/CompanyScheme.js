
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyId: String,
  locationId: String,
  isGlobal: { type: Boolean, default: false },
  values: {type:String , default:0}
});

const companyModel=mongoose.model("Companies",CompanySchema)

module.exports=companyModel;
