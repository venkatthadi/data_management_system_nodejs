import express from 'express'
import { check } from 'express-validator'
import { getSchs, getSch, createSch, updateSch, deleteSch } from '../controllers/schoolController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getSchs).post(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    createSch)
router.route("/:id").get(authenticateToken, getSch).put(
    authenticateToken,
    check('name', "invalid name").notEmpty(),
    updateSch).delete(authenticateToken, deleteSch)

export default router