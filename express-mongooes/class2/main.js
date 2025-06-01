const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//  connection from mongoose to MongoDB

const connectDB = async () => {
    try {
        await mongoose.connect('')
    } catch (error) {
        console.log(error)
    }
}


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
