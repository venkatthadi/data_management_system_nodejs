import express from 'express'
// import dotnet from 'dotent'
import accountRoutes from './routes/accountRoutes.js'
import networkRoutes from './routes/networkRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'

const app = express()

app.use(express.json())

app.use("/accounts", accountRoutes)
app.use("/networks", networkRoutes)
app.use("/schools", schoolRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
})
