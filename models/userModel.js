import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE id = ? 
    `, [id])
    return rows
}

export async function createUser(name, school_id, usertype_id){
    const [result] = await pool.query(`
    INSERT INTO users (name, school_id, usertype_id)
    VALUES (?, ?, ?)
    `, [name, school_id, usertype_id])
    const id = result.insertId
    return getUser(id)
}

export async function updateUser(id, name, school_id, usertype_id){
    await pool.query(`
    UPDATE users
    SET name = ?, school_id = ?, usertype_id = ?
    WHERE id = ?
    `, [name, school_id, usertype_id, id])
    return getUser(id)
}

export async function deleteUser(id){
    await pool.query(`
    DELETE FROM users
    WHERE id = ?
    `, [id])
}