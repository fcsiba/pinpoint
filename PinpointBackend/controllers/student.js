const Student = require('../models/student');
const Parent = require('../models/parent');
const Driver = require('../models/driver');

exports.create = (req, res, next) => {
  let { role_no, student_name, class_name, driver_id, parent_id } = req.body;
  let errors = [];
  if (!role_no) {
    errors.push({ role_no: "required" });
  }
  if (!student_name) {
    errors.push({ student_name: "required" });
  }
  if (!class_name) {
    errors.push({ class_name: "required" });
  }
  if (!driver_id) {
    errors.push({ driver_id: "required" });
  }
  if (!parent_id) {
    errors.push({ parent_id: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  else {
    let student = new Student({
      role_no: role_no,
      student_name: student_name,
      class_name: class_name,
      driver_id: driver_id,
      parent_id: parent_id,
    })
    student.save().then(response => {
      res.status(200).json({
        success: true,
        result: response
      })
    }).catch(err => {
      res.status(500).json({
        errors: [{ error: err }]
      });
    });
    // res.send('property added successfully')
  }
}

exports.getStudents = (req, res) => {
  const studentArray = [];
  Student.find()
    .then(students => {
      // console.log(students);
      // students.map(student => {
      //   Parent.findById(student?.parent_id).then(parent => {
      //     console.log('parent', parent)
      //     student.parent_name = parent.parent_name;
      //   }).catch(err => { console.log(err) });
      //   Driver.findById(student?.driver_id).then(driver => {
      //     console.log('driver', driver)
      //     student.driver_name = driver.driver_name
      //     console.log('After driver', student)
      //   }).catch(err => { console.log(err) });
      //   setTimeout(function () {
      //     console.log('before map student', student)
      //   }, 1000)
      //   studentArray.push(student)
      // })
      // console.log(studentArray)
      res.send(students);
    }).catch(err => {
      res.status(500).send
      message: err.message || "Some error occured while retrieving students."
    })
}

exports.getStudentsByID = (req, res) => {
  var student_id = req.params.student_id;
  console.log(typeof student_id)
  let students_byid = [];
  var flag = 0;

  Student.find({}, (err, students) => {
    console.log(students)
    students.map(student => {
      if (student.id === student_id) {
        students_byid.push(student)
        flag = flag + 1;
      }
    })
    if (flag === 0) {
      return res.status(404).send({
        message: "students not found with associated id"
      })
    }
    res.send(students_byid)
  })
}


exports.getStudentsByDriverID = (req, res) => {
  const driver_id = req.params.driver_id;
  console.log(driver_id)
  let students_byid = [];
  var flag = 0;

  Student.find({}, (err, students) => {
    console.log(students)
    students.map(student => {
      if (student.driver_id === driver_id) {
        students_byid.push(student)
        flag = flag + 1;
      }
    })
    if (flag === 0) {
      return res.status(404).send({
        message: "students not found with associated driver id"
      })
    }
    res.send(students_byid)
  })

}

exports.getStudentsByParentID = (req, res) => {
  const parent_id = req.params.parent_id;
  console.log(parent_id)
  let students_byid = [];
  var flag = 0;

  Student.find({}, (err, students) => {
    console.log(students)
    students.map(student => {
      if (student.parent_id === parent_id) {
        students_byid.push(student)
        flag = flag + 1;
      }
    })
    if (flag === 0) {
      return res.status(404).send({
        message: "students not found with associated parent id"
      })
    }
    res.send(students_byid)
  })

}


exports.updateStudentHomeLocation = (req, res, next) => {
  var student_id = req.params.student_id;

  Student.findByIdAndUpdate(student_id, req.body, (err, std) => {
    if (err) {
      return res.status(500).send({ error: "Problem with Updating the student recored " })
    };
    console.log('updated student',std);
    res.send({ success: "Updation successfull" });
  })
}

exports.updateStudentDriverLocation = (req, res, next) => {
  var student_id = req.params.student_id;

  Student.findByIdAndUpdate(student_id, req.body, (err, std) => {
    if (err) {
      return res.status(500).send({ error: "Problem with Updating the student recored " })
    };
    console.log('updated student',std);
    res.send({ success: "Updation successfull" });
  })
}