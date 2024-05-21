import { validationResult } from 'express-validator';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { Networks } from '../models/index.js';

export const searchNets = async (req, res) => {
    try {
        const search = req.params.search

        sequelize.sync().then(() => {
            Networks.findAll({
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
            "message" : "cannot fetch networks"
        })
    }
}

export const filterNets = async (req, res) => {
    try {
        const filter = req.params.filter

        sequelize.sync().then(() => {
            Networks.findAll({
                where: { 
                    accountId: filter 
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
            "message" : "cannot fetch networks"
        })
    }
}

export const getNets = async (req, res) => {
    try {
        // const { search, account_filter } = req.body
        // let nets
        // if(search || account_filter) {
        //     nets = await filterNetworks(search, account_filter)
        // } else {
        //     nets = await getNetworks()
        // }
        // res.status(200).json({
        //     "response" : nets,
        //     "message" : "success",
        //     "flag" : true
        // })

        sequelize.sync().then(() => {
            Networks.findAll().then(result => {
                // console.log(result)
                // res.status(200).json({
                //     "response" : result,
                //     "message" : "success",
                //     "flag" : true
                // })
                res.status(200).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "cannot fetch networks"
        })
    }
}

export const getNet = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Networks.findOne({
                where: {
                    id : req.params.id
                }
            }).then(result => {
                // res.status(200).json({
                //     "response" : result,
                //     "message" : "success",
                //     "flag" : true
                // })
                res.status(200).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "network not available"
        })
    }
}

export const createNet = async (req, res) => {
    try {    
        const { name, accountId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            sequelize.sync().then(() => {
                // console.log('Book table created successfully!');
                Networks.create({
                    name: name,
                    accountId: accountId
                }).then(result => {
                    // console.log(result)
                    // res.status(200).json({
                    //     "response" : result,
                    //     "message" : "Network created successfully",
                    //     "flag" : true
                    // })    
                    res.status(201).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);            
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

export const updateNet = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, accountId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            Networks.update(
                { name: name, accountId: accountId },
                { where: { id: id }}
            ).then(result => {
                // res.status(200).json({
                //     "response" : result,
                //     "message" : "update successful"
                // })
                res.status(200).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);
            }).catch(err => {
                res.status(406).json({
                    "response" : err, 
                    "message" : "cannot update network"
                })
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
        Networks.destroy({
            where: {
              id: req.params.id
            }
        }).then(() => {
            // console.log("Successfully deleted record.")
            // res.status(204).json({
            //     "message" : "Account deleted successfully"
            // })
            res.status(204).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);
        }).catch((error) => {
            console.error('Failed to delete record : ', error);
        });
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
}