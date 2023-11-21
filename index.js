const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })

const authRoute = require('./routes/authRoute')
const renderRoute = require('./routes/renderRoute')
const adminRoute = require('./routes/adminRoute')
const userRoute = require('./routes/userRoute')

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRoute)
app.use(renderRoute)
app.use(adminRoute)
app.use(userRoute)
const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database is connected")
            })
            .catch((error) => console.log(error.message))
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT = ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
