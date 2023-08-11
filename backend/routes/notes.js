const express = require("express");
const router = express.Router();
const fetchdata = require("../middleware/fetchdata");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1: GET ALL NOTES / login required
router.get("/getnotes", fetchdata, async (req, res) => {
    const userId = req.user.id;
    const notes = await Notes.find({ user: userId });
    res.json(notes);
})

//ROUTE 1.5 : GET ONE NOTE/ login required
router.get("/getnote/:id", fetchdata, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).json({ error: "not found" }) }
    if (note.user.toString() !== req.user.id) { return res.status(400).json({ error: "not authorized" }) }
    note = await Notes.findOne({_id:req.params.id})
    res.json(note);
})

// ROUTE 2: CREATE NOTE/ login required
router.post("/createnote", [
    body("title").exists(),
    body("description").exists()
], fetchdata, async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    const userId = req.user.id;
    const notes = await Notes.find({ user: userId });
    const newNote = await Notes.create({
        user: userId,
        data: req.body
    })

    res.json({ msg: "successful" });
})

//ROUTE 3: UPDATING THE USER
router.put("/update/:id", fetchdata, async (req, res) => {
    const { title, description, tag } = req.body;
    let newNote = {
        data: {}
    };

    let ourNote = await Notes.findById(req.params.id);
    if (!ourNote) { return res.status(404).send("not found") }
    if (ourNote.user.toString() !== req.user.id) {
        return res.status(400).json({ error: "not authorized" });
    }

    if (title) { newNote.data.title = title }
    else {
        newNote.data.title = ourNote.data.title;
    };
    if (description) { newNote.data.description = description }
    else {
        newNote.data.description = ourNote.data.description
    };
    if (tag) { newNote.data.tag = tag }
    else {
        newNote.data.tag = ourNote.data.tag;
    };;

    ourNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ ourNote });

})

// ROUTE 4: DELETING NOTE:
router.delete("/delete/:id", fetchdata, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).json({ error: "not found" }) }
    if (note.user.toString() !== req.user.id) { return res.status(400).json({ error: "not authorized" }) }
    note = await Notes.findByIdAndDelete(req.params.id, { new: true })
    res.json({ msg: "deleted" })
})

module.exports = router;