// all crud operations for contact will be here

const express = require("express");

const router = express.Router();
const Contact = require("../models/Contact");

// post data - Create Functionality
router.post("/", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact
            .save()
            .then((savedContact) => {
                console.log(savedContact);
                res.status(201).json({ msg: "success", data: savedContact });
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 11000 && error.keyPattern.emailAddress) {
                    return res.status(500).json({
                        msg: `Email address ${req.body.emailAddress} already exists`,
                    });
                } else {
                    res.status(500).json({ msg: "Unable to save the contact" });
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to create contact" });
    }
});

// Read Functionality
// Getting all the data
router.get("/", async (req, res) => {
    try {
        // we can use the schema to get all the data
        await Contact.find()
            .then((contacts) => {
                res.status(200).json({ data: contacts });
            })
            .catch((error) => {
                res.status(500).json({ msg: "unable to get results" });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to get the data" });
    }
});

// Getting single contact 
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        await Contact.findById(id)
        .then(contact => {
            res.status(200).json({data: contact})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({msg: "error ocured"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Unable to find the contact"})
    }
})

module.exports = router;
