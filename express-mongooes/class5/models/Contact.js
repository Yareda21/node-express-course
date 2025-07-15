const mongoose = require("mongoose")



const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegx = /^[a-zA-Z\s]*$/;
                return nameRegx.test(value);
            },
            message: "First name should contain only alphanumberic charactors",
        },
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate: {
            validator: function (value) {
                const nameRegx = /^[a-zA-Z\s]*$/;
                return nameRegx.test(value);
            },
            message: "Last name should contain only alphanumberic charactors",
        },
    },
    emailAddress: {
        type: String,
        required: [true, "Email should be provided"],
        unique: true
    },
    age : {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("Contact", contactSchema)