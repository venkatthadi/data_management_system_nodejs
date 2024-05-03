import express from 'express'
import { check } from 'express-validator'
import { getUs, getU, createU, updateU, deleteU } from '../controllers/userController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getUs).post(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    createU)
router.route("/:id").get(authenticateToken, getU).put(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    updateU).delete(authenticateToken, deleteU)

export default router