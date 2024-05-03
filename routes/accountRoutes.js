import express from 'express'
import { check } from 'express-validator';
import { getAccs, getAcc, createAcc, updateAcc, deleteAcc } from '../controllers/accountController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getAccs).post(
    authenticateToken, 
    check('name', "invalid name (not empty)").notEmpty(),
    createAcc)
router.route("/:id").get(authenticateToken, getAcc).put(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    updateAcc
    ).delete(authenticateToken, deleteAcc)

export default router