import express from 'express'
// import dotnet from 'dotent'
import accountRoutes from './routes/accountRoutes.js'
import networkRoutes from './routes/networkRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import userTypeRoutes from './routes/userTypeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(express.json())

// const users = [{ name: "Hello" }]

// app.get('/auth', (req, res) => {
//     res.json(users)
// })

app.get("/", (req, res) => {
    res.status(200).send("Home page")
})

app.use("/accounts", accountRoutes)
app.use("/networks", networkRoutes)
app.use("/schools", schoolRoutes)
app.use("/users", userRoutes)
app.use("/usertypes", userTypeRoutes)
app.use("/auth", authRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
