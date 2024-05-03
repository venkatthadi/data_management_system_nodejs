import express from 'express'
import { check } from 'express-validator';
import { getUTs, getUT, createUT, updateUT, deleteUT } from '../controllers/userTypeController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getUTs).post(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    createUT)
router.route("/:id").get(authenticateToken, getUT).put(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    updateUT).delete(authenticateToken, deleteUT)

export default router