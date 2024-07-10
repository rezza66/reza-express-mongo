import express from "express";
import {ensureAdmin, ensureAuthenticated} from "../config/auth.js"
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", ensureAuthenticated, getUsers);
router.get("/user/:id", ensureAdmin, getUserById);
router.post("/users", ensureAdmin, createUser);
router.patch("/user/:id", ensureAdmin, updateUser);
router.delete("/user/:id", ensureAdmin, deleteUser);

export default router;
