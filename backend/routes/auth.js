require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const User = require("../models/User");
const fetchdata = require("../middleware/fetchdata")

//ROUTE 1: CREATING A NEW USER
router.post("/createuser", [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email
        });

        const data = await {
            user: {
                id: user._id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        return res.json({ authtoken });

    } catch (error) {
        res.status(500).json({ error: "internal error occured" })
    }
})


//ROUTE 2 : VERIFYING AND LOGIN A USER
router.post("/login", [
    body("email").isEmail(),
    body("password").exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ error: "user does not exist" });
        }

        const compared = await bcrypt.compare(req.body.password, user.password);
        if (!compared) {
            return res.status(400).json({ error: "password does not match" })
        }
        const data = await {
            user: {
                id: user._id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        return res.json({ authtoken });

    } catch (error) {
        res.status(500).json({ error: "internal error occured" })
    }
})


//ROUTE 3 : GETTING USER INFO / LOGIN REQUIRED
router.post("/getuserinfo", fetchdata, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findOne({ _id: userid }).select("-password");
        res.send(user);

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }

})

module.exports = router;