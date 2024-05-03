import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { getAuthUsers, createAuth, fetchAuth } from "../models/authModel.js"

const app = express()
app.use(express.json())

export const getAuths = async (req, res) => {
    try {
        const auths = await getAuthUsers(req.username)
        res.status(200).json({
            "response" : auths,
            "message" : "success",
            "flag" : true
        })
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
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const user = createAuth(username, hashedPassword)
        if(user) {
            res.status(201).json({
                "response" : user,
                "message" : "create successful",
                "flag" : true
            })
        } else {
            res.status(400).json({
                "message" : "cannot create user"
            })
        }
        
    } catch {
        res.status(500).json({
            "message" : "internal server error"
        })
    }
    
}

export const fetchAu = async (req, res) => {
    const { username, password } = req.body
    const user = await fetchAuth(username)
    if(user == null) {
        return res.status(400).json({
            "message" : "user not found"
        })
    }
    try {
        if(await bcrypt.compare(password, user.password)) {
            // res.send('success')
            const u = { username: username }

            const accessToken = jwt.sign(u, process.env.ACCESS_TOKEN)
            res.status(200).json({
                "accessToken" : accessToken,
                "message" : "authorized" 
            })
        } else {
            res.status(400).json({
                "message" : "incorrect password"
            })
        }
    } catch {
        res.status(500).send('2')
    }

}

export async function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) {
        return res.status(401).json({
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