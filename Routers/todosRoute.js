// routes/todoRoutes.js
import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../Controllers/todoConreoller.js';
import authMiddleware from '../middlewares/authMidd.js';

const router = express.Router();

router.post('/create-todo',authMiddleware, createTodo);
router.get('/get-todos',authMiddleware, getTodos);
router.put('/update-todo/:id',authMiddleware, updateTodo);
router.delete('/delete-todo/:id',authMiddleware, deleteTodo);

export default router;
