const { check, validationResult } = require('express-validator/check');

module.exports = {
  loginChecks: [
    //Email - string
    //Validation
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is a required field.'),

    //Password - string
    //Validation
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is a required field.')
  ],
  errorFormatter: ({ msg, param }) => {
    return {
      param: param,
      message: msg
    };
  }
};
