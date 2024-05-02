import { getUsers, getUser, createUser, updateUser, deleteUser, searchUsers, filterUsers } from '../models/userModel.js';

export const getUs = async (req, res) => {
    try {
        const { search, school_filter, usertype_filter } = req.body
        let us
        if(school_filter || usertype_filter) {
            us = await filterUsers(search, school_filter, usertype_filter)
        } else if(search) {
            us = await searchUsers(search)
        } else {
            us = await getUsers()
        }
        res.status(200).json({
            "response" : us,
            "message" : "success",
            "flag" : true
        })
    } catch {
        res.status(500).json({
            "message" : "cannot fetch users"
        })
    }
}

export const getU = async (req, res) => {
    try {
        const u = await getUser(req.params.id)
        if(u){    
            res.status(200).json({
                "response" : u,
                "message" : "success",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot find user"
            })
        }
    } catch {
        res.status(500).json({
            "message" : "user not available"
        })
    }
}

export const createU = async (req, res) => {
    try {    
        const { name, school_id, usertype_id } = req.body
        const User = await createUser(name, school_id, usertype_id)
        if(User){
            res.status(201).json({
                "response" : User,
                "message" : "User created successfully",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "response" : "cannot create user"
            })
        }
        
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const updateU = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, school_id, usertype_id } = req.body
        const User = await updateUser(id, name, school_id, usertype_id)
        if(!User){
            res.status(406).json({
                "message" : "cannot update user"
            })
        } else {
            res.status(200).json({
                "response" : network,
                "message" : "update successful"
            })
        }
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const deleteU = async (req, res) => {
    try {    
        const id = req.params.id
        await deleteUser(id)
        res.status(204).json({
            "message" : "Network deleted successfully"
        })
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}