const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/", userController.registerUser);

router.post("/login", userController.login);

router.get("/:id", userController.getUserById);

module.exports = router;
