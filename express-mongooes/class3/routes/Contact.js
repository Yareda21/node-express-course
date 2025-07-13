// all crud operations for contact will be here

const express = require("express")

const router = express.Router()
const Contact = require("../models/Contact")



router.post("/", async (req, res) => {
    try {
        const newContact = new Contact(req.body)
        await newContact.save()
        .then((savedContact) => {
            console.log(savedContact)
            res.status(201).json({msg: "success", data:savedContact})
        })
        .catch (error => {
            console.log(error)
            res.status(500).json({msg: "Unable to save the contact"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Unable to create contact"})
    }
})

module.exports = router