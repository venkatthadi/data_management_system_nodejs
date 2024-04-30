import { getUserTypes, getUserType, createUserType, updateUserType, deleteUserType } from '../models/userTypeModel.js';

export const getUTs = async (req, res) => {
    const uts = await getUserTypes()
    res.status(200).send(uts)
}

export const getUT = async (req, res) => {
    const ut = await getUserType(req.params.id)
    res.status(200).send(ut)
}

export const createUT = async (req, res) => {
    const { name } = req.body
    const UserType = await createUserType(name)
    res.status(201).send(UserType)
}

export const updateUT = async (req, res) => {
    const id = req.params.id
    const { name } = req.body
    const UserType = await updateUserType(id, name)
    res.status(200).send(UserType)
}

export const deleteUT = async (req, res) => {
    const id = req.params.id
    await deleteUserType(id)
    res.status(204).send({ message: "UserType deleted successfully" })
}