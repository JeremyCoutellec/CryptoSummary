const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getTokenFromBearer } = require('../utils/auth');

// Register
router.post('/', async (req, res) => {
    try{
        const {password, passwordVerify} = req.body;
        const email = req.body.email?.toLowerCase();

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
        
        res.json({
            token,
            user: savedUser
        }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

// Log in
router.post('/login', async(req, res) => {
    try{
        const {password} = req.body;
        const email = req.body.email?.toLowerCase();

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
        
        res.json({
            token,
            user: existingUser
        }).send();
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

router.get('/loggedIn', (req, res) => {
    try {
        const token = getTokenFromBearer(req);
        req.token = token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        
        res.send(true);
    }catch(err){
        res.json(false)
    }
})

module.exports = router;
