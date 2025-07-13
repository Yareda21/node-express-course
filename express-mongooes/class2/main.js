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
        await mongoose.connect(
            "mongodb+srv://yared:1234@cluster0.qykqvda.mongodb.net/",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Mongodb is connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
