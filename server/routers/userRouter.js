const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/', async (req, res) => {
    try{
        const {email, password, passwordVerify} = req.body;

        // Validation 
        if(!email || !password || !passwordVerify)
            return res.status(400).json({
                errorMessage: "Please enter all required fields."
            });

        if(password.length < 6)
            return res.status(400).json({
                errorMessage: "Please enter a password of at least 6 characters."
            });

        if(password !== passwordVerify)
            return res.status(400).json({
                errorMessage: "Please enter the same password twice."
            });

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({
                errorMessage: "An account with this email already exists."
            })
        
        // hash the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // save a new user account to the db
        const newUser = new User({
            email, passwordHash
        });
        const savedUser = await newUser.save();

        // log the user in
        const token = jwt.sign({
            user: savedUser?._id
        }, process.env.JWT_SECRET);
        
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

// Log in
router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;

        // Validation 
        if(!email || !password)
            return res.status(400).json({
                errorMessage: "Please enter all required fields."
            });

        const existingUser = await User.findOne({email});
        if(!existingUser)
            return res.status(401).json({
                errorMessage: "Wrong email or password."
            });
        
        const passwordCorrect = await bcrypt.compare(
            password, 
            existingUser?.passwordHash
            );
        if(!passwordCorrect)
            return res.status(401).json({
                errorMessage: "Wrong email or password."
            });

        // log the user in
        const token = jwt.sign({
            user: existingUser?._id
        }, process.env.JWT_SECRET);
        
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;
