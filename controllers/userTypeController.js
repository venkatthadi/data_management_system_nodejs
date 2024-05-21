import { validationResult } from 'express-validator';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { Usertypes } from '../models/index.js'

export const searchUTs = async (req, res) => {
    try {
        const search = req.params.search

        sequelize.sync().then(() => {
            Usertypes.findAll({
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
                res.status(400).json({
                    "response": error
                })
            });
        
        }).catch((error) => {
            res.status(400).json({
                "response": error
            })
        });
    } catch {
        res.status(500).json({
            "message" : "cannot fetch usertypes"
        })
    }
}

export const getUTs = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Usertypes.findAll().then(result => {
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
            "message" : "cannot fetch usertypes"
        })
    }
}

export const getUT = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Usertypes.findOne({
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
            "message" : "usertype not available"
        })
    }
}

export const createUT = async (req, res) => {
    try {    
        const { name } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            sequelize.sync().then(() => {
                // console.log('Book table created successfully!');
                Usertypes.create({
                    name: name
                }).then(result => {
                    console.log(result)
                    // res.status(200).json({
                    //     "response" : result,
                    //     "message" : "Usertype created successfully",
                    //     "flag" : true
                    // }) 
                    res.status(201).setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Origin", "*").setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE").json(result);               
                }).catch((error) => {
                    res.status(400).json({
                        "response": error
                    })
                });
             
            }).catch((error) => {
                res.status(400).json({
                    "response": error
                })
            });
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
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            Usertypes.update(
                { name: name },
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
                    "message" : "cannot update usertype"
                })
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
        Usertypes.destroy({
            where: {
              id: req.params.id
            }
        }).then(() => {
            // console.log("Successfully deleted record.")
            // res.status(204).json({
            //     "message" : "School deleted successfully"
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