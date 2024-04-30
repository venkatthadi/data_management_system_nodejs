import { getSchools, getSchool, createSchool, updateSchool, deleteSchool } from '../models/schoolModel.js';

export const getSchs = async (req, res) => {
    const schs = await getSchools()
    res.status(200).send(schs)
}

export const getSch = async (req, res) => {
    const sch = await getSchool(req.params.id)
    res.status(200).send(sch)
}

export const createSch = async (req, res) => {
    const { name, network_id } = req.body
    const school = await createSchool(name, network_id)
    res.status(201).send(school)
}

export const updateSch = async (req, res) => {
    const id = req.params.id
    const { name, network_id } = req.body
    const school = await updateSchool(id, name, network_id)
    res.status(200).send(school)
}

export const deleteSch = async (req, res) => {
    const id = req.params.id
    await deleteSchool(id)
    res.status(204).send({ message: "School deleted successfully" })
}