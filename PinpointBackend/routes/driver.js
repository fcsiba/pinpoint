const express = require('express');
const router = express.Router();

const {getDriversByID, getDrivers,create,driverLogin} = require('../controllers/driver');

router.post('/driver/create', create);
router.post('/driver/login', driverLogin);
router.get('/driver/get', getDrivers);
router.get('/driver/getById/:driver_id',getDriversByID);

module.exports = router;