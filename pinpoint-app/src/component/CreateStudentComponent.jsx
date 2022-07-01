import React, { Component } from 'react';
// import EmployeeService from '../Service/EmployeeService';
import Studentservice from '../service/PinPointService'

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            student_name: '',
            role_no: '',
            class_name: '',
            driver_id: '',
            parent_id: '',
            drivers: [],
            parents: []

        }
        // this.changeDriveridHandler = this.changeDriveridHandler.bind(this);
        this.changeStudentNameHandler = this.changeStudentNameHandler.bind(this);
        this.changeRollNoHandler = this.changeRollNoHandler.bind(this);
        this.changeClassNameHandler = this.changeClassNameHandler.bind(this);
        this.changeDriverdropdownHandler = this.changeDriverdropdownHandler.bind(this);
        this.changeParentdropdownHandler = this.changeParentdropdownHandler.bind(this);
        this.saveStudentHandler = this.saveStudentHandler.bind(this);
    }

    componentDidMount() {

        Studentservice.getDrivers().then((res) => {
            res.data.unshift({driver_name:"select"});
            this.setState({ drivers: res.data });
            
        });

        Studentservice.getParents().then((res) => {
            res.data.unshift({parent_name:"select"});
            this.setState({ parents: res.data });
        });

    }
    // changeDriveridHandler = (event) => {
    //     this.setState({driver_id: event.target.value});
    // }

    changeStudentNameHandler = (event) => {
        this.setState({ student_name: event.target.value });
    }

    changeRollNoHandler = (event) => {
        this.setState({ role_no: event.target.value });
    }

    changeClassNameHandler = (event) => {
        this.setState({ class_name: event.target.value });
    }
    changeDriverdropdownHandler = (event) => {
        this.setState({ driver_id: event.target.value });
        console.log("checking driver id" , this.state.driver_id);
    }
    changeParentdropdownHandler = (event) => {
        this.setState({ parent_id: event.target.value });
        console.log("checking parent id" , this.state.parent_id);
    }



    saveStudentHandler = (e) => {
        e.preventDefault();
        let student = {
            student_name: this.state.student_name,
            role_no: this.state.role_no,
            class_name: this.state.class_name,
            driver_id: this.state.driver_id,
            parent_id: this.state.parent_id
        }

        console.log('student => ' + JSON.stringify(student));

        Studentservice.createStudent(student).then(res => {
            console.log("checking student" , res.data )
            this.props.history.push('/students');
        })
    }
    cancelHandler = (event) => {
        this.props.history.push('/students');
    }


    render() {
        return (
            <div className='container' >
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Add Students</h3>
                        <div className='card-body ' >
                            <form className='d-grid gap-3'>
                                <div className='drop-down'>
                                    <p>Select The Driver From List</p>
                                    <select  value={this.state.driver_id} onChange={this.changeDriverdropdownHandler} >{
                                            this.state.drivers.map(driver => <option value={driver._id}> {driver.driver_name}</option>)
                                        }</select>
                                </div>
                                <div className='drop-down'>
                                    <p>Select The Parent From List</p>
                                    <select value={this.state.parent_id} onChange={this.changeParentdropdownHandler}>{
                                        this.state.parents.map(parent => <option value={parent._id}>{parent.parent_name}</option>)
                                    }</select>
                                </div>
                                <div className="form-group">
                                    <label> Student Name: </label>
                                    <input placeholder='Enter Student Name' name='student_name' className='form-control'
                                        value={this.state.student_name} onChange={this.changeStudentNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Roll number: </label>
                                    <input placeholder='Enter Student Roll no.' name='role_no' className='form-control'
                                        value={this.state.role_no} onChange={this.changeRollNoHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Class Name: </label>
                                    <input placeholder='Enter Student Class' name='class_name' className='form-control'
                                        value={this.state.class_name} onChange={this.changeClassNameHandler} />
                                </div>
                                <div className='button '>

                                    <button type="submit" className="btn btn-primary " onClick={this.saveStudentHandler}>Submit</button>

                                    <button type="cancel" className="btn btn-warning margin-left" onClick={this.cancelHandler}>cancel</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default CreateStudentComponent;