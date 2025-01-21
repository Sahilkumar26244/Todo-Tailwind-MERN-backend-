const express = require('express');

const connectDB = require('./conn')
require('dotenv').config()
const cors = require('cors');
const userRoutes = require("./routes/user.js")

const app = express();

connectDB()
app.use(cors())
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello")
})

app.use("/user" , userRoutes)



const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log("server is running!")
})