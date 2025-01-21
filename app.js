const express = require('express');
const app = express();
const connectDB = require('./conn')
require('dotenv').config()
const cors = require('cors');
const UserAPI = require("./routes/user")

connectDB()
app.use(cors())


app.use("/", (req,res) => {
    res.send("Hello")
})

app.use("/api/v1" , UserAPI)

const PORT = process.env.PORT || 8080
app.listen(PORT , () => {
    console.log("server is running!")
})