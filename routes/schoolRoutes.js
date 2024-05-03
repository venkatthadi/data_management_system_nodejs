import express from 'express'
import { getSchs, getSch, createSch, updateSch, deleteSch } from '../controllers/schoolController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getSchs).post(authenticateToken, createSch)
router.route("/:id").get(authenticateToken, getSch).put(authenticateToken, updateSch).delete(authenticateToken, deleteSch)

export default router