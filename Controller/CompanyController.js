const companyModel = require("../Models/CompanyScheme");

const GetAllCompanies = async (req, res) => {
  await companyModel
    .find()
    .then((data) => res.send({ data, user: req.session.email }))
    .catch((err) => res.json(err));
};

const GetDashboardData = async (req, res) => {
  await companyModel
    .find()
    .then((data) => res.send({ data, user: req.session.email }))
    .catch((err) => res.json(err));
};

const addController = async (req, res) => {
  console.log(req.body);

  const company = new companyModel(req.body);

  await company
    .save()
    .then((company) => res.json(company))
    .catch((err) => res.json({ message: err.message }));
};

const deleteController = (req, res) => {
  const data = req.params.id;
  console.log(data);
  companyModel
    .findByIdAndDelete(data)
    .then(() => res.send({ message: "Company Deleted Successfully" }))
    .catch((err) => {
      res.send(err);
      console.log("error in api");
    });
};

module.exports = {
  GetAllCompanies,
  GetDashboardData,
  addController,
  deleteController,
};
