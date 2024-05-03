import express from 'express'
import { getNets, getNet, createNet, updateNet, deleteNet } from '../controllers/networkController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getNets).post(authenticateToken, createNet)
router.route("/:id").get(authenticateToken, getNet).put(authenticateToken, updateNet).delete(authenticateToken, deleteNet)

export default router