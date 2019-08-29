const { check, validationResult } = require('express-validator/check');

module.exports = {
  listChecks: [
    //Text - string
    //Validation
    check('text')
      .exists()
      .isLength({ min: 2, max: 20 })

      //Santization
      .trim()
      .escape()
      .withMessage('Item must be between 2 and 20 characters.')
  ],
  errorFormatter: ({ msg, value, param }) => {
    return {
      param: param,
      value: value,
      message: msg
    };
  }
};
