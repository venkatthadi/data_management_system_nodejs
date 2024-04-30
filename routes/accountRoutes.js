import express from 'express'
import { getAccs, getAcc, createAcc, updateAcc, deleteAcc } from '../controllers/accountController.js';

const router = express.Router()

router.route("/").get(getAccs).post(createAcc)
router.route("/:id").get(getAcc).put(updateAcc).delete(deleteAcc)

export default router