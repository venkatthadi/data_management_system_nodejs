import express from 'express'
import { getSchs, getSch, createSch, updateSch, deleteSch } from '../controllers/schoolController.js';

const router = express.Router()

router.route("/").get(getSchs).post(createSch)
router.route("/:id").get(getSch).put(updateSch).delete(deleteSch)

export default router