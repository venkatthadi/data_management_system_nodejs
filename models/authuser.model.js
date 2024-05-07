import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import dotenv from 'dotenv'
dotenv.config()

const AuthUsers = sequelize.define("authusers", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true      
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    // console.log('Networks table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default AuthUsers