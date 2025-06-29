const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const Contact = require("./routes/Contact")

//  connection from mongoose to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mydatabase", {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("Mongodb is connected")
    } catch (error) { 
        console.log(error)
        process.exit(1)
    }
}


// Definations of routes 
app.use("/api/contact/", Contact)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
