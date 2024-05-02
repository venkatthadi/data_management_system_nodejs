import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount, searchAccount } from '../models/accountModel.js';

export const getAccs = async (req, res) => {
    try {
        const { search } = req.body
        let accs
        if(search) {
            accs = await searchAccount(search)
        } else {
            accs = await getAccounts()
        }
        res.status(200).json({
            "response" : accs,
            "message" : "success",
            "flag" : true
        })
    } catch {
        res.status(500).json({
            "message" : "cannot fetch accounts"
        })
    }
}

export const getAcc = async (req, res) => {
    try {
        const acc = await getAccount(req.params.id)
        if(acc){    
            res.status(200).json({
                "response" : acc,
                "message" : "success",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot find account"
            })
        }
    } catch {
        res.status(500).json({
            "message" : "account not available"
        })
    }
}

export const createAcc = async (req, res) => {
    try {    
        const { name } = req.body
        const account = await createAccount(name)
        if(account){
            res.status(201).json({
                "response" : account,
                "message" : "Account created successfully",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "response" : "cannot create account"
            })
        }
        
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const updateAcc = async (req, res) => {
    try {    
        const id = req.params.id
        const { name } = req.body
        const account = await updateAccount(id, name)
        if(!account){
            res.status(406).json({
                "message" : "cannot update account"
            })
        } else {
            res.status(200).json({
                "response" : account,
                "message" : "update successful"
            })
        }
    } catch(err) {
        res.status(500).json({
            "message" : err.message
        })
    }
}

export const deleteAcc = async (req, res) => {
    try {    
        const id = req.params.id
        await deleteAccount(id)
        res.status(204).json({
            "message" : "Account deleted successfully"
        })
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}