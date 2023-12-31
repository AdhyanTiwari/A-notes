require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require("cors")

mongoose.connect('mongodb://127.0.0.1:27017/A_notesDB');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(5000, () => {
    console.log("Started listening at port 5000");
})