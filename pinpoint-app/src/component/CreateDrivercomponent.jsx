import React, { Component } from 'react';
import Studentservice from '../service/PinPointService'


class CreateDrivercomponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            driver_name: '',
            vehicle_no: '',
            vehicle_name: '',
            email : '',
            password : '',
            role: 'Driver'

        }
        this.changeDriverNameHandler = this.changeDriverNameHandler.bind(this);
        this.changeVhecileNoHandler = this.changeVhecileNoHandler.bind(this);
        this.changeVhecileNameHandler = this.changeVhecileNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordNameHandler = this.changePasswordNameHandler.bind(this);
        // this.changeRoleHandler = this.changeRoleHandler.bind(this);
    }


    changeDriverNameHandler = (event) => {
        this.setState({driver_name: event.target.value});
    }

    changeVhecileNoHandler = (event) => {
        this.setState({vehicle_no: event.target.value});
    }

    changeVhecileNameHandler = (event) => {
        this.setState({vehicle_name: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordNameHandler = (event) => {
        this.setState({password: event.target.value});
    }

    // changeRoleHandler = (event) => {
    //     this.setState({role: event.target.value});
    // }





    saveDriverHandler = (e) => {
        e.preventDefault();
        let driver = {driver_name : this.state.driver_name ,
                        vehicle_no : this.state.vehicle_no,
                        vehicle_name : this.state.vehicle_name,
                        email : this.state.email,
                        password : this.state.password,
                        role:   this.state.role}  

                        console.log('Driver => ' + JSON.stringify(driver));

                        Studentservice.createDriver(driver).then(res => {
                            this.props.history.push('/driver');
                        })
    }
    cancelHandler = (event) => {
        this.props.history.push('/driver'); 
    }


    render() {
        return (
            <div className = 'container' >
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Add Students</h3>
                        <div className='card-body ' >
                            <form className='d-grid gap-3'>
                                <div className= "form-group">
                                    <label> Driver Name: </label>
                                    <input placeholder='Enter Driver Name' name='driver_name' className='form-control'
                                        value={this.state.driver_name} onChange={this.changeDriverNameHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Vehcile Number: </label>
                                    <input placeholder='Enter Vhecile Number' name='vehicle_no' className='form-control'
                                        value={this.state.vehicle_no} onChange={this.changeVhecileNoHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Vhecile Name: </label>
                                    <input placeholder='Enter your Vhecile Name' name='vehicle_name' className='form-control'
                                        value={this.state.vehicle_name} onChange={this.changeVhecileNameHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Driver Email: </label>
                                    <input placeholder='Enter your Driver Email' name='email' className='form-control'
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Password: </label>
                                    <input placeholder='Enter password for Driver application' name='password' className='form-control'
                                        value={this.state.password} onChange={this.changePasswordNameHandler}/>
                                </div>
                                {/* <div className= "form-group">
                                    <label> Role: </label>
                                    <input placeholder='Enter your Vhecile Name' name='role' className='form-control'
                                        value={this.state.role} onChange={this.changeRoleHandler}/>
                                </div> */}
                                <div className='button '>
                                    
                                    <button type="submit" className="btn btn-primary " onClick={this.saveDriverHandler}>Submit</button>
                                    
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

export default CreateDrivercomponent;