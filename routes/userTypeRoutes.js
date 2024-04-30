import express from 'express'
import { getUTs, getUT, createUT, updateUT, deleteUT } from '../controllers/userTypeController.js';

const router = express.Router()

router.route("/").get(getUTs).post(createUT)
router.route("/:id").get(getUT).put(updateUT).delete(deleteUT)

export default router