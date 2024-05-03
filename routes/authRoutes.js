import express from 'express'
// import { getAuthUsers } from "../models/authModel.js"
import { getAuths, createAu, fetchAu, authenticateToken } from "../controllers/authController.js";

const router = express.Router()
router.use(express.json())

router.route('/').get(authenticateToken, getAuths).post(createAu)
router.route('/login').post(fetchAu)
router.route('/logout').get((req, res) => { // get back to homepage to login
    res.redirect('/')
})
// router.route('/:username').get(authenticateToken, getUser)

export default router