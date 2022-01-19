const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
let dbUrl = "";

if (process.env.ENV_MODE == "dev") {
  dbUrl = process.env.LOCAL_DB_URL;
} else {
  dbUrl = process.env.DATABASE_URL;
}

const sequelize = new Sequelize(dbUrl, {
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
