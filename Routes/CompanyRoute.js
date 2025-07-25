const express = require("express");
const router = express.Router();

const {
  GetAllCompanies,
  addController,
  deleteController,
  GetDashboardData,
} = require("../Controller/CompanyController");
const {isAuth,  isAdminForDashboard}=require("../Controller/AuthController");


router.get("/GetAllCompanies",isAuth,GetAllCompanies);
router.get("/GetDashboardData",isAuth,isAdminForDashboard,GetDashboardData);
router.post("/add",addController);
router.delete("/delete/:id",deleteController);

module.exports=router;