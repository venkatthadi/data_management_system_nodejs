import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from './database.js'
import dotenv from 'dotenv'
dotenv.config()

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE,
//     process.env.MYSQL_USER,
//     process.env.MYSQL_PASS,
//     {
//         host: process.env.HOST,
//         dialect: 'mysql'
//     }
// )

// sequelize.authenticate().then(() => {
//     // console.log('Connection has been established successfully.');
// }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
// });

const Accounts = sequelize.define("accounts", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    // console.log('Accounts table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Accounts