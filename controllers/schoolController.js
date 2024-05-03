import { validationResult } from 'express-validator';
import { getSchools, getSchool, createSchool, updateSchool, deleteSchool, filterSchools } from '../models/schoolModel.js';

export const getSchs = async (req, res) => {
    try {
        const { search, network_filter } = req.body
        let schs
        if(search || network_filter) {
            schs = await filterSchools(search, network_filter)
        } else {
            schs = await getSchools()
        }
        res.status(200).json({
            "response" : schs,
            "message" : "success",
            "flag" : true
        })
    } catch {
        res.status(500).json({
            "message" : "cannot fetch schools"
        })
    }
}

export const getSch = async (req, res) => {
    try {
        const sch = await getSchool(req.params.id)
        if(sch){    
            res.status(200).json({
                "response" : sch,
                "message" : "success",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot find school"
            })
        }
    } catch {
        res.status(500).json({
            "message" : "school not available"
        })
    }
}

export const createSch = async (req, res) => {
    try {    
        const { name, network_id } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            const school = await createSchool(name, network_id)
            if(school){
                res.status(201).json({
                    "response" : school,
                    "message" : "School created successfully",
                    "flag" : true
                })
            } else {
                res.status(400).json({
                    "response" : "cannot create school"
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const updateSch = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, network_id } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            const school = await updateSchool(id, name, network_id)
            if(!school){
                res.status(406).json({
                    "message" : "cannot update school"
                })
            } else {
                res.status(200).json({
                    "response" : school,
                    "message" : "update successful"
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const deleteSch = async (req, res) => {
    try {    
        const id = req.params.id
        await deleteSchool(id)
        res.status(204).json({
            "message" : "School deleted successfully"
        })
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}