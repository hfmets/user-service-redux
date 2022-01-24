const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/", userController.registerUser);

router.post("/login", userController.login);

router.post("/verify", userController.verify);

router.get("/:id", userController.getUserById);

module.exports = router;
