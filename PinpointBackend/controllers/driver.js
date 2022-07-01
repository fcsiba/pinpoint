const Driver = require('../models/driver');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const {
  createJWT,
} = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


exports.create = (req, res, next) => {
  let { email, password, role, driver_name, vehicle_no, vehicle_name } = req.body;
  console.log('im here')
  let errors = [];
  if (!driver_name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "Invalid email entered" });
  }
  if (!vehicle_no) {
    errors.push({ vehicle_no: "required" });
  }
  if (!vehicle_name) {
    errors.push({ vehicle_name: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  Driver.findOne({ email: email })
    .then(driver => {
      if (driver) {
        return res.status(422).json(
          {
            errors: [
              {
                driver: "Driver with this email already exists"
              }
            ]
          }
        );
      } else {
        let driver = new Driver({
          driver_name: driver_name,
          vehicle_no: vehicle_no,
          email: email,
          password: password,
          role: role.toLowerCase(),
          vehicle_name, vehicle_name
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err)
              throw err;
            driver.password = hash;
            driver.save()
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

exports.getDrivers = (req, res) => {
  Driver.find()
    .then(drivers => {
      res.send(drivers);
    }).catch(err => {
      res.status(500).send
      message: err.message || "Som error occured while retrieving drivers."
    })
}

exports.getDriversByID = (req, res) => {
  var driver_id = req.params.driver_id;
  console.log(typeof driver_id)
  let drivers_byid = [];
  var flag = 0;

  Driver.find({}, (err, drivers) => {

    console.log(drivers)
    drivers.map(driver => {
      if (driver.id === driver_id) {
        drivers_byid.push(driver)
        flag = flag + 1;
      }
    })
    if (flag === 0) {
      return res.status(404).send({
        message: "Drivers not found with associated id"
      })
    }
    res.send(drivers_byid)
  })
}

exports.driverLogin = (req, res) => {
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

  Driver.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "Driver not found" }],
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