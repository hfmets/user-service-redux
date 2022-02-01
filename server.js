require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./models/index");
const cors = require("cors");

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    domain: "vandelay-user.fun",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
  },
  store: new SequelizeStore({
    db: sequelize,
    table: "Sessions",
    checkExpirationInterval: 15 * 60 * 1000,
  }),
};

// if (process.env.NODE_ENV === "production") {
//   sessionConfig.cookie.secure = "true";
//   sessionConfig.cookie.sameSite = "none";
// }

app.use(session(sessionConfig));

const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});
