import express from 'express'
import { getUs, getU, createU, updateU, deleteU } from '../controllers/userController.js';

const router = express.Router()

router.route("/").get(getUs).post(createU)
router.route("/:id").get(getU).put(updateU).delete(deleteU)

export default router