import { DataTypes } from 'sequelize'
import { sequelize } from '../database.js'
import dotenv from 'dotenv'
dotenv.config()

const Schools = sequelize.define("schools", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    network_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'networks',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }

});

sequelize.sync().then(() => {
    // console.log('Networks table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

export default Schools