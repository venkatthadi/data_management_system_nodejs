import express from 'express'
import { getUTs, getUT, createUT, updateUT, deleteUT } from '../controllers/userTypeController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getUTs).post(authenticateToken, createUT)
router.route("/:id").get(authenticateToken, getUT).put(authenticateToken, updateUT).delete(authenticateToken, deleteUT)

export default router