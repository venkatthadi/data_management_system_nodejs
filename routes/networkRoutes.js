import express from 'express'
import { getNets, getNet, createNet, updateNet, deleteNet } from '../controllers/networkController.js';

const router = express.Router()

router.route("/").get(getNets).post(createNet)
router.route("/:id").get(getNet).put(updateNet).delete(deleteNet)

export default router