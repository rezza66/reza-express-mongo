import express from 'express';
import { loginController, logoutController, registerController } from '../controllers/AuthController.js';
import { ensureAuthenticated } from '../config/auth.js';

const router = express.Router()

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', ensureAuthenticated, logoutController);

export default router;