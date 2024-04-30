import express from 'express'
import { getAccounts, getAccount, createAccount } from '../database.js';

const router = express.Router()


router.get("/", async (req, res) => {
    const accs = await getAccounts()
    res.send(accs)
})

router.get("/:id", async (req, res) => {
    const acc = await getAccount(req.params.id)
    res.send(acc)
})

router.post("/", async (req, res) => {
    const { name } = req.body
    const account = await createAccount(name)
    res.send(account)
})

export default router