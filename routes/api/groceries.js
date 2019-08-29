const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load input validation
const { check, validationResult } = require('express-validator/check');

const groceryValidation = require('../../validation/grocery');

//Load groceries model
const Grocery = require('../../models/Grocery');

/*
 *api            POST api/groceries
 *purpose        Create / Add Single Item
 *permission     Private
 */

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),

  groceryValidation.groceryChecks,

  (req, res) => {
    const errorsFromGrocery = validationResult(req).formatWith(
      groceryValidation.errorFormatter
    );

    const errorsArrayFromValidator = errorsFromGrocery.array();

    let errors = {};

    errorsArrayFromValidator.map(error => {
      errors[error.param] = error.message;
    });

    const isValid = errorsFromGrocery.isEmpty();

    //Check validation
    if (!isValid) {
      //If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newItem = new Grocery({
      user: req.user.id,
      text: req.body.text,
      amount: req.body.amount,
      unit: req.body.unit,
      lists: req.body.listId
    });
    newItem.save().then(item => res.json(item));
  }
);

/*
 *api            GET api/groceries
 *purpose        Get groceries for specific list
 *permission     Private
 */

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Grocery.find({ lists: req.params.id })
      .sort({ date: -1 })
      .then(groceries => res.json(groceries))
      .catch(err =>
        res.status(404).json({
          noitemsfound: 'No grocery items found'
        })
      );
  }
);

/*
 *api            GET api/groceries
 *purpose        Get groceries for "What am I out of " list (all items that = (datenow - last bought time) > avg time btwn buys)
 *permission     Private
 */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Grocery.find({
      user: req.user.id,
      $where: () => {
        return (
          Date.now() / 1000 -
            this.timePeriodTracker[timePeriodTracker.length - 1] >
          this.avgTimePeriod
        );
      }
    })

      .then(groceries => {
        res.json(groceries);
      })

      .catch(err =>
        res.status(404).json({
          noitemsfound: 'No grocery items found'
        })
      );
  }
);

/*
 *api            UPDATE api/groceries/reset
 *purpose        Reset Bought Checkbox to false for all items on call of componentWillUnmount
 *permission     Private
 */

router.post(
  '/reset/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Grocery.find({
      lists: req.params.id
    }).then(groceries => {
      groceries.forEach(groceryItem => {
        groceryItem.bought = false;
        groceryItem.save();
      });

      res.json({
        success: true
      });
    });
  }
);

/*
 *api            DELETE api/groceries/:id
 *purpose        Delete Single Item
 *permission     Private
 */

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Grocery.findById(req.params.id)
      .then(item => {
        //Check for item owner
        if (item.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        //Delete item
        item.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({
          itemnotfound: 'No item found'
        })
      );
  }
);

/*
 *api            UPDATE api/groceries/:id
 *purpose        Toggle Checkbox to true/false for Single Item
 *permission     Private
 */

router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Grocery.findById(req.params.id)
      .then(item => {
        //Check for item owner
        if (item.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }

        //Update item
        item.bought = !item.bought;

        if (item.bought) {
          item.boughtCounter++;

          //Add timestamp
          item.timePeriodTracker.push(Math.floor(Date.now() / 1000)); //Converting to seconds

          //Add string version of dates
          item.stringTimePerTracker.push(new Date().toLocaleString());

          //Calculate avg
          const arr = item.timePeriodTracker;

          let sumOfTimeBetweenBuys = 0;

          if (arr.length < 2) {
            sumOfTimeBetweenBuys = item.avgTimePeriod; //If arr< 2, keep as default value (defined in Model as 1 week in seconds)
          } else {
            for (i = 1; i < arr.length; i++) {
              let diff = arr[i] - arr[i - 1];
              sumOfTimeBetweenBuys += diff;
            }
          }

          let avg = sumOfTimeBetweenBuys / arr.length - 1;

          item.avgTimePeriod = avg;
        }

        item.save().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({
          itemnotfound: 'No item found'
        })
      );
  }
);

module.exports = router;
