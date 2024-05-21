import { validationResult } from 'express-validator';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { Users } from '../models/index.js';

export const searchUs = async (req, res) => {
    try {
        const search = req.params.search

        sequelize.sync().then(() => {
            Users.findAll({
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
            "message" : "cannot fetch users"
        })
    }
}

export const filterUs = async (req, res) => {
    try {
        const filter1 = req.params.filter1
        const filter2 = req.params.filter2

        sequelize.sync().then(() => {
            Users.findAll({
                where: { 
                    schoolId: filter1,
                    usertypeId: filter2
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
            "message" : "cannot fetch users"
        })
    }
}

export const getUs = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Users.findAll().then(result => {
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
            "message" : "cannot fetch users"
        })
    }
}

export const getU = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Users.findOne({
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
            "message" : "user not available"
        })
    }
}

export const createU = async (req, res) => {
    try {    
        const { name, schoolId, usertypeId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            sequelize.sync().then(() => {
                Users.create({
                    name: name,
                    schoolId: schoolId,
                    usertypeId: usertypeId
                }).then(result => {
                    // console.log(result)
                    // res.status(200).json({
                    //     "response" : result,
                    //     "message" : "User created successfully",
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

export const updateU = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, schoolId, usertypeId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            Users.update(
                { name: name, schoolId: schoolId, usertypeId: usertypeId },
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
                    "message" : "cannot update school"
                })
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
        Users.destroy({
            where: {
              id: req.params.id
            }
        }).then(() => {
            console.log("Successfully deleted record.", result);
            // res.status(204).json({
            //     "message" : "User deleted successfully"
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