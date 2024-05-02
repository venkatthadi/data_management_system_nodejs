import { getNetworks, getNetwork, createNetwork, updateNetwork, deleteNetwork, filterNetworks } from '../models/networkModel.js';

export const getNets = async (req, res) => {
    try {
        const { search, account_filter } = req.body
        let nets
        if(search || account_filter) {
            nets = await filterNetworks(search, account_filter)
        } else {
            nets = await getNetworks()
        }
        res.status(200).json({
            "response" : nets,
            "message" : "success",
            "flag" : true
        })
    } catch {
        res.status(500).json({
            "message" : "cannot fetch networks"
        })
    }
}

export const getNet = async (req, res) => {
    try {
        const net = await getNetwork(req.params.id)
        if(net){    
            res.status(200).json({
                "response" : net,
                "message" : "success",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot find network"
            })
        }
    } catch {
        res.status(500).json({
            "message" : "network not available"
        })
    }
}

export const createNet = async (req, res) => {
    try {    
        const { name, account_id } = req.body
        const network = await createNetwork(name, account_id)
        if(network){
            res.status(201).json({
                "response" : network,
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

export const updateNet = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, account_id } = req.body
        const network = await updateNetwork(id, name, account_id)
        if(!network){
            res.status(406).json({
                "message" : "cannot update network"
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

export const deleteNet = async (req, res) => {
    try {    
        const id = req.params.id
        await deleteNetwork(id)
        res.status(204).json({
            "message" : "Network deleted successfully"
        })
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}