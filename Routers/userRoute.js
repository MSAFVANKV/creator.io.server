import express from 'express';
import { registerUser, loginUser, checkAuth, logout } from '../Controllers/userController.js';
const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/check', checkAuth);
router.post('/logout', logout);


export default router;
