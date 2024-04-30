import { getNetworks, getNetwork, createNetwork, updateNetwork, deleteNetwork } from '../models/networkModel.js';

export const getNets = async (req, res) => {
    const accs = await getNetworks()
    res.status(200).send(accs)
}

export const getNet = async (req, res) => {
    const acc = await getNetwork(req.params.id)
    res.status(200).send(acc)
}

export const createNet = async (req, res) => {
    const { name, account_id } = req.body
    const network = await createNetwork(name, account_id)
    res.status(201).send(network)
}

export const updateNet = async (req, res) => {
    const id = req.params.id
    const { name, account_id } = req.body
    const network = await updateNetwork(id, name, account_id)
    res.status(200).send(network)
}

export const deleteNet = async (req, res) => {
    const id = req.params.id
    await deleteNetwork(id)
    res.status(204).send({ message: "Network deleted successfully" })
}