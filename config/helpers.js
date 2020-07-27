const { check } = require('express-validator');

const validate =[
//username must be atleat three letters
check('username').isLength({min:2}).withMessage('username must be atleast two letters'),
check('email').isEmail().withMessage('must be valid email'),
check('password').isLength({min:8}).withMessage('password must be atleast 8 chars')
]

module.exports = validate