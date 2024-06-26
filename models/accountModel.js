import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getAccounts() {
    const [rows] = await pool.query("SELECT * FROM accounts")
    return rows
}

export async function getAccount(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM accounts
    WHERE id = ? 
    `, [id])
    return rows[0]
}

export async function createAccount(name){
    const [result] = await pool.query(`
    INSERT INTO accounts (name)
    VALUES (?)
    `, [name])
    const id = result.insertId
    return getAccount(id)
}

export async function updateAccount(id, name){
    await pool.query(`
    UPDATE accounts
    SET name = ?
    WHERE id = ?
    `, [name, id])
    return getAccount(id)
}

// const acc = await updateAccount("4", "Account4")
// console.log(acc)

export async function deleteAccount(id){
    await pool.query(`
    DELETE FROM accounts
    WHERE id = ?
    `, [id])
}

export async function searchAccount(search){
    const [rows] = await pool.query(`
    SELECT *
    FROM accounts
    WHERE name like '%${search}%'
    `)
    return rows
}