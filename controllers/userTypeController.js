import { getUserTypes, getUserType, createUserType, updateUserType, deleteUserType, searchUserTypes } from '../models/userTypeModel.js';

export const getUTs = async (req, res) => {
    try {
        const { search } = req.body
        let uts 
        if(search){
            uts = await searchUserTypes(search)
        } else {
            uts = await getUserTypes()
        }
        res.status(200).json({
            "response" : uts,
            "message" : "success",
            "flag" : true
        })
    } catch {
        res.status(500).json({
            "message" : "cannot fetch usertypes"
        })
    }
}

export const getUT = async (req, res) => {
    try {
        const ut = await getUserType(req.params.id)
        if(ut){    
            res.status(200).json({
                "response" : ut,
                "message" : "success",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot find usertype"
            })
        }
    } catch {
        res.status(500).json({
            "message" : "usertype not available"
        })
    }
}

export const createUT = async (req, res) => {
    try {    
        const { name } = req.body
        const UserType = await createUserType(name)
        if(UserType){
            res.status(201).json({
                "response" : UserType,
                "message" : "Network created successfully",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "response" : "cannot create network"
            })
        }
        
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const updateUT = async (req, res) => {
    try {    
        const id = req.params.id
        const { name } = req.body
        const UserType = await updateUserType(id, name)
        if(!UserType){
            res.status(406).json({
                "message" : "cannot update usertype"
            })
        } else {
            res.status(200).json({
                "response" : UserType,
                "message" : "update successful"
            })
        }
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const deleteUT = async (req, res) => {
    try {    
        const id = req.params.id
        await deleteUserType(id)
        res.status(204).json({
            "message" : "Usertype deleted successfully"
        })
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}