const { check, validationResult } = require('express-validator');

const validateUser = [
    check('username').isLength({min: 3
    }).withMessage('Username must be at least 3 characters Long'),
    check('password').isLength({min: 6
    }).withMessage('Password must be at least 6 characters Long'),
];

const validateLogin = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

const validateAssignment = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('dueDate').notEmpty().withMessage('Valid due date is required')
];

const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUser,
    validateLogin,
    validateAssignment,
    validateResults,
}