const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    getProfile,
    updateUser
} = require('../controllers/userController')

router.post('/register', registerUser)

router.post('/login', loginUser);

router.get('/profile', [auth], getProfile)

router.put('/:id', [auth], updateUser)

module.exports = router;