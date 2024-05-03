import express from 'express'
import { getUs, getU, createU, updateU, deleteU } from '../controllers/userController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getUs).post(authenticateToken, createU)
router.route("/:id").get(authenticateToken, getU).put(authenticateToken, updateU).delete(authenticateToken, deleteU)

export default router