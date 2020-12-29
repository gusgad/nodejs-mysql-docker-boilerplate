/* PACKAGES */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../../seeder');
const { validationResult } = require('express-validator');



/* HELPER FUNCTIONS */
function checkValidationErrors(req) {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    return validationErrors;
  }

  return false;
}



exports.user_signup = (req, res) => {
  const validationCheck = checkValidationErrors(req, res);
  if (validationCheck) {
    return res.status(400).json(validationCheck);
  }

  database.where({ email: req.body.email }).select('name', 'email', 'password').from('user')
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User exists.',
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        database('user').insert({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: 'User created',
            });
          })
          .catch((insertErr) => {
            console.log(insertErr);
            res.status(500).json({
              error: insertErr,
            });
          });
      });
    });
};

exports.user_login = (req, res, next) => {
  const validationCheck = checkValidationErrors(req, res, next);
  if (validationCheck) {
    return res.status(400).json(validationCheck);
  }

  database.where({ email: req.body.email }).select('name', 'email', 'password').from('user')
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: 42,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token,
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  const validationCheck = checkValidationErrors(req, res, next);
  if (validationCheck) {
    return res.status(400).json(validationCheck);
  }

  database('user').where({ id: req.params.userId }).del()
    .then(() => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
