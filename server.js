const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Now listening on port: ${port}`);
});
