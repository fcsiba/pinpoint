import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import PinPointService from '../service/PinPointService';

class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: []
        }
        this.addStudent = this.addStudent.bind(this);
    }

    componentDidMount() {

        PinPointService.getStudent().then((res) => {
            console.log("mydata", res.data);

            let drivers = res.data;
            console.log("Drivers", drivers);
            for (let i = 0; i < drivers.length; i++) {
                console.log("hassan", drivers[i]);
                PinPointService.getDriversbyId(drivers[i].driver_id).then((res) => {
                    drivers[i].driver_names = res.data[0].driver_name;
                })
            }
            for (let i = 0; i < drivers.length; i++) {
                console.log("hassan", drivers[i]);
                PinPointService.getParentbyId(drivers[i].parent_id).then((res) => {
                    drivers[i].parent_names = res.data[0].parent_name;
                })
            }

            // console.log("mydate", drivers);
            setTimeout(() => {
                this.setState({ students: drivers });
            }, 1000);
            
        });

    }

    addStudent() {
        this.props.history.push('/add-student');
    }



    render() {
        return (
            <div className="d-grid gap-3" >
                <h2 className='text-center'>Students List</h2>
                <div className='col-xs-3' >
                    <button className='btn btn-primary ' onClick={this.addStudent}>Add Student</button>

                </div>

                <div className='row d-grid gap-3'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Student Roll Number</th>
                                <th>Student Name</th>
                                <th>Class Name</th>
                                <th>Driver Name</th>
                                <th>Parent Id</th>
                            </tr>
                        </thead>
                        {/* {console.log("Student Data" , this.state.students)} */}
                        <tbody>
                            {
                                this.state.students.map(
                                    student => 
                                    //{ console.log("checking", { student, driver: student.driver_names }) }

                                    <tr key={student._id}>
                                        <td> {student.role_no}</td>
                                        <td> {student.student_name}</td>
                                        <td> {student.class_name}</td>
                                        <td> {student.driver_names}</td>
                                        <td> {student.parent_names}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

export default ListStudentComponent;