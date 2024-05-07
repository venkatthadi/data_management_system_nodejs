import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import dotenv from 'dotenv'
dotenv.config()

const Users = sequelize.define("users", {
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
    // console.log('Networks table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Users