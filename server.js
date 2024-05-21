import express from 'express'
import cors from 'cors'
import accountRoutes from './routes/accountRoutes.js'
import networkRoutes from './routes/networkRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import userTypeRoutes from './routes/userTypeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { sequelize } from './database.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("Home page")
})

app.use("/accounts", accountRoutes)
app.use("/networks", networkRoutes)
app.use("/schools", schoolRoutes)
app.use("/users", userRoutes)
app.use("/usertypes", userTypeRoutes)
app.use("/auth", authRoutes)

sequelize.authenticate().then(() => {
    // console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
