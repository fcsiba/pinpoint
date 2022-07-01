const Parent = require('../models/parent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


exports.create = (req, res, next) => {
  let { email, password, role, parent_name } = req.body;
  let errors = [];
  if (!parent_name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "Invalid email entered" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  Parent.findOne({ email: email })
    .then(parent => {
      if (parent) {
        return res.status(422).json(
          {
            errors: [
              {
                parent: "Parent with this email already exists"
              }
            ]
          }
        );
      } else {
        let parent = new Parent({
          parent_name: parent_name,
          email: email,
          password: password,
          role: role.toLowerCase(),
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err)
              throw err;
            parent.password = hash;
            parent.save()
              .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
              })
              .catch(err => {
                res.status(500).json({
                  errors: [{ error: err }]
                });
              });
          });
        });
      }
    }).catch((err) => {
      console.log(err)
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
    })
}

exports.getParents = (req, res) => {
  Parent.find()
    .then(parents => {
      res.send(parents);
    }).catch(err => {
      res.status(500).send
      message: err.message || "Som error occured while retrieving parents."
    })
}

exports.getParentsByID = (req, res) => {
  var parent_id = req.params.parent_id;
  console.log(typeof parent_id)
  let parents_byid = [];
  var flag = 0;

  Parent.find({}, (err, parents) => {
    console.log(parents)
    parents.map(parent => {
      if (parent.id === parent_id) {
        parents_byid.push(parent)
        flag = flag + 1;
      }
    })
    if (flag === 0) {
      return res.status(404).send({
        message: "Parents not found with associated id"
      })
    }
    res.send(parents_byid)
  })
}

exports.parentLogin = (req, res) => {
  let { email, password } = req.body;

  let errors = [];
  if (!email)
    errors.push({ email: "Email field is required" });

  if (!emailRegexp.test(email))
    errors.push({ email: "Invalid Email" });

  if (!password)
    errors.push({ password: "Password field is required" });

  if (errors.length > 0)
    return res.status(422).json({ errors: errors });

  Parent.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "Parent not found" }],
        });
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({
              errors: [{
                password:
                  "Incorrect password entered"
              }]
            });
          }
          return res.status(200).json({
            success: true,
            message: user
          });
        }).catch(err => {
          res.status(500).json({ errors: err });
        });
      }
    }).catch(err => {
      res.status(500).json({ errors: err });
    }
    );
}