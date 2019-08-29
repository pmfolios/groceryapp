const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation

const { check, validationResult } = require('express-validator/check');

const registerValidation = require('../../validation/register');

const loginValidation = require('../../validation/login');

//Load user model
const User = require('../../models/User');

/*
 *api            POST api/users/register
 *purpose        Register user
 *permission     Public
 */

router.post(
  '/register',

  registerValidation.registerChecks,

  (req, res) => {
    const errorsFromRegister = validationResult(req).formatWith(
      registerValidation.errorFormatter
    );

    const errorsArrayFromValidator = errorsFromRegister.array();

    let errors = {};

    errorsArrayFromValidator.map(error => {
      errors[error.param] = error.message;
    });

    const isValid = errorsFromRegister.isEmpty();

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

/*
 *api            POST api/users/login
 *purpose        Login user & Returning JWT (token)
 *permission     Public
 */

router.post(
  '/login',

  loginValidation.loginChecks,

  (req, res) => {
    const errorsFromLogin = validationResult(req).formatWith(
      loginValidation.errorFormatter
    );

    const errorsArrayFromValidator = errorsFromLogin.array();

    let errors = {};

    errorsArrayFromValidator.map(error => {
      errors[error.param] = error.message;
    });

    const isValid = errorsFromLogin.isEmpty();

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const emailFromReq = req.body.email;
    const passwordFromReq = req.body.password;

    //Find user by email
    User.findOne({ email: emailFromReq }).then(user => {
      //Check for user
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      //Check password
      bcrypt.compare(passwordFromReq, user.password).then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = {
            id: user.id,
            name: user.name
          }; //Create JWT payload

          //Sign the token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    });
  }
);

/*
 *api            GET api/users/current
 *purpose        Return current user
 *permission     Private
 */

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
