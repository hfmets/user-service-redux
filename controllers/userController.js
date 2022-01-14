const Users = require("../models/index").Users;

const registerUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
  };

  await Users.create(user)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(`Something went wrong: ${err}`);
      res.status(500).send("Server error");
    });
};

const getUserById = async (req, res) => {
  await Users.findOne({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).send(user || "No user found");
    })
    .catch((err) => {
      console.log(`Something went wrong: ${err}`);
      res.status(500).send("Server error");
    });
};

module.exports = {
  registerUser,
  getUserById,
};
