import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNetworks() {
    const [rows] = await pool.query("SELECT * FROM networks")
    return rows
}

export async function getNetwork(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM networks
    WHERE id = ? 
    `, [id])
    return rows
}

export async function createNetwork(name, account_id){
    const [result] = await pool.query(`
    INSERT INTO networks (name, account_id)
    VALUES (?, ?)
    `, [name, account_id])
    const id = result.insertId
    return getNetwork(id)
}

export async function updateNetwork(id, name, account_id){
    await pool.query(`
    UPDATE networks
    SET name = ?, account_id = ?
    WHERE id = ?
    `, [name, account_id, id])
    return getNetwork(id)
}

// const acc = await updateAccount("4", "Account4")
// console.log(acc)

export async function deleteNetwork(id){
    await pool.query(`
    DELETE FROM networks
    WHERE id = ?
    `, [id])
}

export async function filterNetworks(search, account_filter){
    let query = "SELECT * FROM networks WHERE "
    let x = 0
    if(search) {
        query += `name like "%${search}%" AND `
        x++
    }
    if(account_filter) {
        query += `account_id = '${account_filter}' AND `
        x++
    }
    if(x > 0) {
        query = query.slice(0, -4)
    } else {
        query = query.slice(0, -5)
    }
    const [rows] = await pool.query(query)
    return rows
}