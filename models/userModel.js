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
    return rows[0]
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

/*

req.body - 
{
    "search" : "test",
    "school_filter" : 1,
    "usertype_filter" : 1
}

*/

export async function searchUsers(search){
    const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE name like "%${search}%"
    `)
    return rows
}

export async function filterUsers(search, school_filter, usertype_filter){
    let query = "SELECT * FROM users WHERE "
    let x = 0
    if(search){
        query += `name like "%${search}%" AND `
        x++
    }
    if(school_filter){
        query += `school_id = '${school_filter}' AND `
        x++
    }
    if(usertype_filter){
        query += `usertype_id = '${usertype_filter}' AND `
        x++
    }
    if(x > 0){
        query = query.slice(0, -4)
    } else {
        query = query.slice(0, -5)
    }
    const [rows] = await pool.query(query)
    return rows
}