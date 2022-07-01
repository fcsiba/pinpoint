const express = require('express');
const router = express.Router();

const {getStudentsByID, getStudents,create,getStudentsByDriverID,updateStudentHomeLocation,updateStudentDriverLocation,getStudentsByParentID} = require('../controllers/student');

router.post('/student/create', create);
router.get('/student/get', getStudents);
router.get('/student/getById/:student_id',getStudentsByID);
router.get('/student/getByDriverId/:driver_id',getStudentsByDriverID);
router.get('/student/getByParentId/:parent_id',getStudentsByParentID);
router.patch('/student/updateStudentHomeLocation/:student_id',updateStudentHomeLocation)
router.patch('/student/updateStudentDriverLocation/:student_id',updateStudentDriverLocation)

module.exports = router;