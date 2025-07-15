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

// Search Functionality
router.get("/search", async (req, res) => {
    try {
        const { searchTerm } = req.query;

        const searchRegExp = new RegExp(searchTerm, "i"); // makes it case insensetive

        const matchingContacts = await Contact.find({
            $or: [
                { firstName: searchRegExp },
                { lastName: searchRegExp },
                { emailAddress: searchRegExp },
            ],
        })
            .then((contacts) => {
                res.status(200).json({ data: contacts });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ msg: "unable to find a contact" });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to find a contact" });
    }
});

// Getting single contact
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findById(id)
            .then((contact) => {
                res.status(200).json({ data: contact });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ msg: "error ocured" });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to find the contact" });
    }
});

// Update functionality
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = req.body;

        await Contact.findOneAndUpdate({ _id: id }, updatedContact, {
            new: true,
        })
            .then((updatedcontact) => {
                console.log(updatedcontact);
                res.status(200).json({ msg: "Contact updated successfuly!" });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    msg: "Updating the contact is failed!",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to edit the contact" });
    }
});

// Apply soft delete here
router.delete("/soft/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(
            id,
            { deleted: true },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ msg: "Contact not found" });
        }
        res.status(200).json({ msg: "Contact soft deleted", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to soft delete the contact" });
    }
});

// Apply hard delete here
router.delete("/hard/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ msg: "Contact not found" });
        }
        res.status(200).json({ msg: "Contact hard deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to hard delete the contact" });
    }
});

module.exports = router;
