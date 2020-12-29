// https://github.com/validatorjs/validator.js#sanitizers
const { check } = require('express-validator');

/**
 * All schemas are being validated before the data is passed to the controller.
 */
const schemas = {
    user: {
        signup: [
            check('name', 'Name is invalid').escape(),
            check('email', 'E-mail is invalid').isEmail().normalizeEmail(),
            check('password', 'Password is not the correct format').isStrongPassword(),
        ],
        login: [
            check('email', 'E-mail is invalid').isEmail().normalizeEmail(),
            check('password', 'Password is not the correct format').isStrongPassword(),
        ],
    },
};

module.exports = schemas;