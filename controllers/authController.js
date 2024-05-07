import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { validationResult } from 'express-validator'
import { sequelize } from '../database.js'
import AuthUsers from '../models/authuser.model.js'

const app = express()
app.use(express.json())

export const getAuths = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            AuthUsers.findAll().then(result => {
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
            "message" : "internal server error"
        })
    }
}

// export const getUser = async (req, res) => {
//     const username = req.params.username
//     const user = await getAuthUser(username)
//     res.status(200).send(user)
// }

export const createAu = async (req, res) => {
    try {
        const { username, password } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({
                "response" : errors
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            sequelize.sync().then(() => {
                AuthUsers.create({
                    username: username,
                    password: hashedPassword
                }).then(result => {
                    console.log(result)
                    res.status(201).json({
                        "response" : result,
                        "message" : "Auth created successfully",
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
        }
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
    
}

export const fetchAu = async (req, res) => {
    const { username, password } = req.body
    try{
        sequelize.sync().then(async () => {
            const result = await AuthUsers.findOne({
                where: { 
                    username: username 
                }
            })
            console.log(result)
            if(result!=null){
                if(await bcrypt.compare(password, result.dataValues.password)) {
                    // res.send('success')
                    const u = { username: username }
        
                    const accessToken = jwt.sign(u, process.env.ACCESS_TOKEN, {
                        expiresIn: '5h'
                    })
                    res.status(200).json({
                        "accessToken" : accessToken,
                        "message" : "authorized" 
                    })
                } else {
                    res.status(400).json({
                        "message" : "incorrect password"
                    })
                }
            } else {
                res.status(400).json({
                    "response": "user does not exist"
                })
            }
        }).catch((error) => {
            res.status(400).json({
                "response": error
            })
        });
    } catch(err) {
        res.status(400).json({
            "response": err
        })
    }
}

export async function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) {
        return res.status(401).json({ // go back to login page
            "message" : "Not authorized"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, username) => {
        if(err) return res.status(403).json({
            "message" : err.message
        })
        req.username = username.username
        // console.log(req.username)
        next()
    })
}