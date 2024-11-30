const express = require("express");
const cors = require("cors");

const app = express();
// env
require("dotenv").config();
// mongoDB Connection
const config =require("./config.json")
const mongoose = require("mongoose");
mongoose
    .connect(config.connectionString)
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err));
// import router
const note=require("./routes/notes")

// Configure CORS middleware to allow all origins
app.use(
    cors({
        origin:"*",
    })
);
// inbuild middleware
app.use(express.json());
// middleware
app.use("/api/notes",note);

const port=8000;
app.listen(port,()=>{
    console.log(`server is listening at Port ${port}`);
})