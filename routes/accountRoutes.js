import express from 'express'
import { getAccs, getAcc, createAcc, updateAcc, deleteAcc } from '../controllers/accountController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getAccs).post(authenticateToken, createAcc)
router.route("/:id").get(authenticateToken, getAcc).put(authenticateToken, updateAcc).delete(authenticateToken, deleteAcc)

export default router