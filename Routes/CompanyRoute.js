const express = require("express");
const router = express.Router();

const {
  GetAllCompanies,
  addController,
  deleteController,
} = require("../Controller/CompanyController");
const {isAuth}=require("../Controller/AuthController");


router.get("/GetAllCompanies",isAuth,GetAllCompanies);
router.post("/add",addController);
router.delete("/delete/:id",deleteController);

module.exports=router;