const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async (req, res) => {
    try{
        const { firstName, lastName,  email, password } = req.body;
        let toasts = [];

        if(!firstName) toasts.push({message: 'First name is required', type: 'error'});
        if(!lastName) toasts.push({message: 'Last name is required', type: 'error'});

        if(!password) toasts.push({message: 'A valid Password is required', type: 'error'});
        if(password && (password.length < 8 || password.length > 12 )) toasts.push({message: 'Password must be at least 6 - 12 characters long', type: 'error'});

        if(!email || !validatedEmail(email)) toasts.push({message: 'A valid Email is required', type: 'error'});

        if(toasts.length > 0) return res.status(400).json(toasts);

        let newUser = await User.findOne({email});

        if(newUser) return res.status(400).json([{message: 'User already exists', type: 'error'}]);

        newUser = new User(req.body);

        // Hash password before saving in database
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();


        const payload = {
            user: {
                id: newUser._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 28800
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        })


    }catch(err){
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
const loginUser = async (req, res) => {
    try {
        res.send('Login a user');
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
        
    
}

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
    
    try {
        res.send('Get user profile');
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

function validatedEmail(email){
    const regex =/\S+@\S+\.\S+/;

    //validemail@mail.com returns true whereas validemail.mail.com returns false
    return regex.test(email);
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}