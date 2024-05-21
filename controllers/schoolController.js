import { validationResult } from 'express-validator';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';
import { Schools } from '../models/index.js';

export const searchSchs = async (req, res) => {
    try {
        const search = req.params.search

        sequelize.sync().then(() => {
            Schools.findAll({
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
            "message" : "cannot fetch Schools"
        })
    }
}

export const filterSchs = async (req, res) => {
    try {
        const filter = req.params.filter

        sequelize.sync().then(() => {
            Schools.findAll({
                where: { 
                    networkId: filter 
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
            "message" : "cannot fetch Schools"
        })
    }
}

export const getSchs = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Schools.findAll().then(result => {
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
            "message" : "cannot fetch schools"
        })
    }
}

export const getSch = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Schools.findOne({
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
            "message" : "school not available"
        })
    }
}

export const createSch = async (req, res) => {
    try {    
        const { name, networkId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            sequelize.sync().then(() => {
                // console.log('Book table created successfully!');
                Schools.create({
                    name: name,
                    networkId: networkId
                }).then(result => {
                    console.log(result)
                    // res.status(201).json({
                    //     "response" : result,
                    //     "message" : "School created successfully",
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

export const updateSch = async (req, res) => {
    try {    
        const id = req.params.id
        const { name, networkId } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            res.json({
                "response" : errors
            })
        } else {
            Schools.update(
                { name: name, networkId: networkId },
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

export const deleteSch = async (req, res) => {
    try {    
        Schools.destroy({
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