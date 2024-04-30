import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getSchools() {
    const [rows] = await pool.query("SELECT * FROM schools")
    return rows
}

export async function getSchool(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM schools
    WHERE id = ? 
    `, [id])
    return rows
}

export async function createSchool(name, network_id){
    const [result] = await pool.query(`
    INSERT INTO schools (name, network_id)
    VALUES (?, ?)
    `, [name, network_id])
    const id = result.insertId
    return getSchool(id)
}

export async function updateSchool(id, name, network_id){
    await pool.query(`
    UPDATE schools
    SET name = ?, network_id = ?
    WHERE id = ?
    `, [name, network_id, id])
    return getSchool(id)
}

// const acc = await updateAccount("4", "Account4")
// console.log(acc)

export async function deleteSchool(id){
    await pool.query(`
    DELETE FROM schools
    WHERE id = ?
    `, [id])
}