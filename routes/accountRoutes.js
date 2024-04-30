import express from 'express'
import { getAccs, getAcc, createAcc, updateAcc, deleteAcc } from '../controllers/accountController.js';

const router = express.Router()

router.route("/").get(getAccs)
router.route("/").get(getAcc)
router.route("/").post(createAcc)
router.route("/").put(updateAcc)
router.route("/").delete(deleteAcc)

export default router