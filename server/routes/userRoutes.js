const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getProfile
} = require('../controllers/userController')

router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/profile', [auth], getProfile)

module.exports = router;