import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    // console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });