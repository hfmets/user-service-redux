const Users = require("../models/index").Users;
const Sessions = require("../models/index").Sessions;
const { registerSchema, loginSchema } = require("../validation/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await Users.findOne({ where: { email: req.body.email } });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    const savedUser = await Users.create(user);
    const sess = req.session;
    req.session.userId = savedUser.id;
    res.send({ savedUser: savedUser.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Users.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const sess = req.session;
  req.session.userId = user.id;
  sess.userId = user.id;
  res.send("logged in");
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await Users.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    });
    res.send(foundUser || "No user found");
  } catch (err) {
    res.status(400).send(err);
  }
};

const verify = async (req, res) => {
  const sess = req.body.sessionId;

  console.log(sess);

  try {
    const validSession = await Sessions.findOne({ where: { sid: sess } });
    if (validSession) return res.send(validSession.data);
    else return res.status(400).send("invalid session");
  } catch (err) {
    console.log(err);
    res.status(400).send("invalid session");
  }
};

module.exports = {
  registerUser,
  login,
  getUserById,
  verify,
};
