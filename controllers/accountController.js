import { validationResult } from 'express-validator'
import { sequelize } from '../database.js'
import { Op } from 'sequelize'
import { Accounts } from '../models/index.js'

export const searchAccs = async (req, res) => {
    try {
        const search = req.params.search
        sequelize.sync().then(() => {
            Accounts.findAll({
                where: { 
                    name: { [Op.like]: `%${search}%` } 
                }
            }).then(result => {
                // console.log(result)
                res.status(200).json({
                    "response" : result,
                    "message" : "success",
                    "flag" : true
                })
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "cannot fetch accounts"
        })
    }
}

export const getAccs = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Accounts.findAll().then(result => {
                console.log(result)
                // res.status(200).json({
                //     "response" : result,
                //     "message" : "success",
                //     "flag" : true
                // })
                // {
                //     "Access-Control-Allow-Headers" : "Content-Type",
                //     "Access-Control-Allow-Origin": "*",
                //     "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                // }
                res.status(200).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET").json(result);
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "cannot fetch accounts"
        })
    }
}

export const getAcc = async (req, res) => {
    try {
        // const acc = await getAccount(req.params.id)
        // if(acc) { // if database returns a record
        //     res.status(200).json({
        //         "response" : acc,
        //         "message" : "success",
        //         "flag" : true
        //     })
        // } else {
        //     res.status(400).json({
        //         "message" : "cannot find account"
        //     })
        // }

        sequelize.sync().then(() => {
            Accounts.findOne({
                where: {
                    id : req.params.id
                }
            }).then(result => {
                console.log(result)
                res.status(200).json({
                    "response" : result,
                    "message" : "success",
                    "flag" : true
                })
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "account not available"
        })
    }
}

export const createAcc = async (req, res) => {
    try {    
        const { name } = req.body
        console.log(name)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({
                "response" : errors 
            })
        } else {
            // const account = await createAccount(name)
            // if(account) { // if new account is created
            //     res.status(201).json({
            //         "response" : account,
            //         "message" : "Account created successfully",
            //         "flag" : true
            //     })
            // } else {
            //     res.status(400).json({
            //         "response" : "cannot create account"
            //     })
            // }

            sequelize.sync().then(() => {
                // console.log('Book table created successfully!');
                Accounts.create({
                    name: name
                }).then(result => {
                    console.log(result)
                    res.status(201).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET").json(result);                
                }).catch((error) => {
                    console.error('Failed to create a new record : ', error);
                });
             
            }).catch((error) => {
                console.error('Unable to create table : ', error);
            });
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
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({
                "response" : errors 
            })
        } else {
            const { name } = req.body
            // const account = await updateAccount(id, name)
            // if(!account) { // if there is no account on that id
            //     res.status(406).json({
            //         "message" : "cannot update account"
            //     })
            // } else {
            //     res.status(200).json({
            //         "response" : account,
            //         "message" : "update successful"
            //     })
            // }

            Accounts.update(
                { name: name },
                { where: { id: id }}
            ).then(result => {
                res.status(200).json({
                    "response" : result,
                    "message" : "update successful"
                })
            }).catch(err => {
                res.status(406).json({
                    "response" : err, 
                    "message" : "cannot update account"
                })
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
        // const id = req.params.id
        // await deleteAccount(id)
        // res.status(204).json({
        //     "message" : "Account deleted successfully"
        // })

        Accounts.destroy({
            where: {
              id: req.params.id
            }
        }).then(() => {
            // console.log("Successfully deleted record.")
            res.status(204).json({
                "message" : "Account deleted successfully"
            })
        }).catch((error) => {
            console.error('Failed to delete record : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}