import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import PinPointService from '../service/PinPointService';

class ListDriverComponents extends Component {
    constructor(props){
        super(props)

        this.state = {
                drivers: []
        }
        this.addDriver = this.addDriver.bind(this);
    }

    componentDidMount(){
        
        PinPointService.getDrivers().then((res) => {
            this.setState({ drivers: res.data});
        });
      
    }

    addDriver(){
        this.props.history.push('/add-driver'); 
    }



    render() {
        return (
            <div className ="d-grid gap-3" >
                <h2 className='text-center'>Driver Lists</h2>
                <div  className='col-xs-3' >
                    <button  className='btn btn-primary' onClick={this.addDriver}>Add Driver</button> 
                </div>
                
                <div className='row d-grid gap-3'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Driver Name</th>
                                <th>vehicle Number</th>
                                <th>vehicle Name</th>
                                <th>Role</th>
                            </tr>
                            </thead>

                        <tbody>
                             {
                                 this.state.drivers.map(
                                     driver =>
                                        <tr key = {driver._id}>
                                            <td> {driver.email}</td>
                                            <td> {driver.password}</td>
                                            <td> {driver.driver_name}</td>
                                            <td> {driver.vehicle_no}</td>
                                            <td> {driver.vehicle_name}</td>
                                            <td> {driver.role}</td>
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

export default ListDriverComponents;