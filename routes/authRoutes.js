import express from 'express'
import { check } from 'express-validator' 
import { getAuths, createAu, fetchAu, authenticateToken } from "../controllers/authController.js";

const router = express.Router()
router.use(express.json())

router.route('/').get(authenticateToken, getAuths).post(
    check('username', "invalid username").notEmpty(), 
    check('password', "invalid password (length - min 4 characters)").isLength({min: 4}), 
    createAu)
router.route('/login').post(fetchAu)
// router.route('/:username').get(authenticateToken, getUser)

export default router