import express from 'express'
import { check } from 'express-validator'
import { getNets, getNet, createNet, updateNet, deleteNet, searchNets, filterNets } from '../controllers/networkController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router()

router.route("/").get(authenticateToken, getNets).post(
    authenticateToken,
    check('name', "invalid name").notEmpty(), 
    createNet)
router.route("/:id").get(authenticateToken, getNet).put(
    authenticateToken,
    check('name', "invalid name").notEmpty(), 
    updateNet).delete(authenticateToken, deleteNet)
router.route("/search/:search").get(authenticateToken, searchNets)
router.route("/filter/:filter").get(authenticateToken, filterNets)

export default router