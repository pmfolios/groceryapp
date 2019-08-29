const { check, validationResult } = require('express-validator/check');

module.exports = {
  registerChecks: [
    //Name - string
    //Validation
    check('name')
      .exists()
      .isLength({ min: 2, max: 20 })

      //Santization
      .trim()
      .escape()
      .withMessage('Name must be between 2 and 20 characters.'),

    //Email - string
    //Validation
    check('email')
      .isEmail()
      .normalizeEmail()

      //Santization
      .trim()
      .escape()
      .withMessage('Email must be a valid email address.'),

    //Password - string
    //Validation
    check('password')
      .isLength({ min: 8, max: 20 })

      //Santization
      .trim()
      .escape()
      .withMessage('Name must be between 8 and 20 characters.'),

    //Password2 - string
    //Validation
    check(
      'password2',
      'Confirmation of password is a required field and must match password field.'
    )
      .not()
      .isEmpty()

      //Santization
      .trim()
      .escape()
      .custom((value, { req }) => value === req.body.password)
  ],
  errorFormatter: ({ msg, value, param }) => {
    return {
      param: param,
      value: value,
      message: msg
    };
  }
};
