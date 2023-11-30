import express from "express";
import { loginUserController, userRegistrationController } from "../controllers/userController.js";

const router = express.Router();

// user registration routes
router.post("/user-registration", userRegistrationController);

// login routes
router.post("/login-user", loginUserController)

router.get("/test-api", (req, res) => {
  return res.send({
    success: true,
  });
});
export default router
