const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  host: process.env.HOST,
  database: process.env.DB,
  username: process.env.USER,
  password: process.env.PASSWORD,
  dialect: process.env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(`Unable to connect: ${err}`);
  });

const db = {};

db.sequelize = sequelize;

db.Users = require("./userModel")(sequelize, DataTypes);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB synced with Sequelize!");
  })
  .catch((err) => {
    console.log(`Unable to sync with Sequelize: ${err}`);
  });

module.exports = db;
