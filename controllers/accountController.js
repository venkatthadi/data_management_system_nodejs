import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../models/accountModel.js';

export const getAccs = async (req, res) => {
    const accs = await getAccounts()
    res.status(200).send(accs)
}

export const getAcc = async (req, res) => {
    const acc = await getAccount(req.params.id)
    res.status(200).send(acc)
}

export const createAcc = async (req, res) => {
    const { name } = req.body
    const account = await createAccount(name)
    res.status(201).send(account)
}

export const updateAcc = async (req, res) => {
    const id = req.params.id
    const { name } = req.body
    const account = await updateAccount(id, name)
    res.status(200).send(account)
}

export const deleteAcc = async (req, res) => {
    const id = req.params.id
    await deleteAccount(id)
    res.status(204).send({ message: "Account deleted successfully" })
}