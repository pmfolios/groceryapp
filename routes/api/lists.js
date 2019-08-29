const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load input validation
const { check, validationResult } = require('express-validator/check');

const listValidation = require('../../validation/list');

//Load lists model
const List = require('../../models/List');

/*
 *api            POST api/lists
 *purpose        Create / Add a List
 *permission     Private
 */

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  listValidation.listChecks,

  (req, res) => {
    const errorsFromList = validationResult(req).formatWith(
      listValidation.errorFormatter
    );

    const errorsArrayFromValidator = errorsFromList.array();

    let errors = {};

    errorsArrayFromValidator.map(error => {
      errors[error.param] = error.message;
    });

    const isValid = errorsFromList.isEmpty();

    //Check validation
    if (!isValid) {
      //If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newList = new List({
      text: req.body.text,
      user: req.user.id
    });
    newList.save().then(list => res.json(list));
  }
);

/*
 *api            GET api/lists
 *purpose        Get ALL lists
 *permission     Private
 */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    List.find({ user: req.user.id })
      .sort({ date: -1 })
      .then(lists => res.json(lists))
      .catch(err =>
        res.status(404).json({
          nolistsfound: 'No lists found'
        })
      );
  }
);

/*
 *api            GET api/lists
 *purpose        Get name of specific list
 *permission     Private
 */

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    List.findOne({ _id: req.params.id })
      .then(list => res.json(list))
      .catch(err =>
        res.status(404).json({
          noitemsfound: 'No lists found'
        })
      );
  }
);

module.exports = router;
