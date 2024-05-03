import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUserTypes() {
    const [rows] = await pool.query("SELECT * FROM usertypes")
    return rows
}

export async function getUserType(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM usertypes
    WHERE id = ? 
    `, [id])
    return rows[0]
}

export async function createUserType(name){
    const [result] = await pool.query(`
    INSERT INTO usertypes (name)
    VALUES (?)
    `, [name])
    const id = result.insertId
    return getUserType(id)
}

export async function updateUserType(id, name){
    await pool.query(`
    UPDATE usertypes
    SET name = ?
    WHERE id = ?
    `, [name, id])
    return getUserType(id)
}

// const acc = await updateUserType("4", "UserType4")
// console.log(acc)

export async function deleteUserType(id){
    await pool.query(`
    DELETE FROM usertypes
    WHERE id = ?
    `, [id])
}

export async function searchUserTypes(search){
    const [rows] = await pool.query(`
    SELECT *
    FROM usertypes
    WHERE name like "%${search}%"
    `)
    return rows
}