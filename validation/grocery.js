const { check, validationResult } = require('express-validator/check');

module.exports = {
  groceryChecks: [
    //Text - string
    //Validation
    check('text')
      .exists()
      .isLength({ min: 2, max: 20 })

      //Santization
      .trim()
      .escape()
      .withMessage('Item must be between 2 and 20 characters.'),

    //Amount - number
    //Validation
    check('amount')
      .exists()
      .isInt()

      //Santization
      .trim()
      .escape()
      .withMessage('Amount is a required field.'),

    //Unit - string
    //Validation
    check('unit')
      .exists()

      //Santization
      .trim()
      .escape()
      .withMessage('Unit is a required field.'),

    //listId - array of strings
    check('listId')
      .exists()

      //Santization
      .trim()
      .escape()
      .withMessage('listId is a required field.')
  ],
  errorFormatter: ({ msg, value, param }) => {
    return {
      param: param,
      value: value,
      message: msg
    };
  }
};
