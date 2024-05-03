import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAuthUsers(username) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM authusers
    WHERE username = ?
    `, [username])
    return rows[0]
}

// export async function getAuthUser(username){
//     const [result] = await pool.query(`
//     SELECT *
//     FROM authusers
//     WHERE username = ?
//     `, [username])
//     return result
// }

export async function createAuth(username, password){
    const [result] = await pool.query(`
    INSERT INTO authusers (username, password)
    VALUES (?, ?)
    `, [username, password])
    return result
}

export async function fetchAuth(username){
    const [result] = await pool.query(`
    SELECT *
    FROM authusers
    WHERE username = ?
    `, [username])
    return result[0]
}

