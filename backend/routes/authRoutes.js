const express = require('express');
const { registerUser, loginUser, registerStudent } = require('../controllers/userController');
const { validateUser, validateLogin, validateResults } = require('../utils/inputValidation');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', validateUser, validateResults, registerUser); // Admin can register users
router.post('/login', validateLogin, validateResults, loginUser); //User login
router.post('/register-student', protect, authorize(['admin']), validateUser, validateResults, registerStudent) //Admin registers a user

module.exports = router;