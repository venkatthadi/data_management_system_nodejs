import { getUsers, getUser, createUser, updateUser, deleteUser, searchUsers, filterUsers } from '../models/userModel.js';

export const getUs = async (req, res) => {
    const { search, school_filter, usertype_filter } = req.body
    let us
    if(school_filter || usertype_filter) {
        us = await filterUsers(search, school_filter, usertype_filter)
    } else if(search) {
        us = await searchUsers(search)
    } else {
        us = await getUsers()
    }
    res.status(200).send(us)
}

export const getU = async (req, res) => {
    const u = await getUser(req.params.id)
    res.status(200).send(u)
}

export const createU = async (req, res) => {
    const { name, school_id, usertype_id } = req.body
    const User = await createUser(name, school_id, usertype_id)
    res.status(201).send(User)
}

export const updateU = async (req, res) => {
    const id = req.params.id
    const { name, school_id, usertype_id } = req.body
    const User = await updateUser(id, name, school_id, usertype_id)
    res.status(200).send(User)
}

export const deleteU = async (req, res) => {
    const id = req.params.id
    await deleteUser(id)
    res.status(204).send({ message: "User deleted successfully" })
}