const express = require('express');
const router = express.Router();

const {getParentsByID, getParents,create,parentLogin} = require('../controllers/parent');

router.post('/parent/create', create);
router.post('/parent/login', parentLogin);
router.get('/parent/get', getParents);
router.get('/parent/getById/:parent_id',getParentsByID);

module.exports = router;