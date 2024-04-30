import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../database.js';

export const getAccs = async (req, res) => {
    const accs = await getAccounts()
    res.send(accs)
}

export const getAcc = async (req, res) => {
    const acc = await getAccount(req.params.id)
    res.send(acc)
}

export const createAcc = async (req, res) => {
    const { name } = req.body
    const account = await createAccount(name)
    res.send(account)
}

export const updateAcc = async (req, res) => {
    const id = req.params.id
    const { name } = req.body
    const account = await updateAccount(id, name)
    res.send(account)
}

export const deleteAcc = async (req, res) => {
    const id = req.params.id
    await deleteAccount(id)
    res.send({ message: "Account deleted successfully" })
}