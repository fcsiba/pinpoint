import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import PinPointService from '../service/PinPointService';

class ListParentComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                parents: []
        }
        this.addParent = this.addParent.bind(this);
    }

    componentDidMount(){
        
        PinPointService.getParents().then((res) => {
            this.setState({ parents: res.data});
        });
      
    }

    addParent(){
        this.props.history.push('/add-parent'); 
    }



    render() {
        return (
            <div className ="d-grid gap-3" >
                <h2 className='text-center'>PARENT LIST</h2>
                <div  className='col-xs-3' >
                    <button  className='btn btn-primary' onClick={this.addParent}>Add Parent</button> 
                </div>
                
                <div className='row d-grid gap-3'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Parent Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                            </tr>
                            </thead>

                        <tbody>
                             {
                                 this.state.parents.map(
                                     parent =>
                                        <tr key = {parent._id}>
                                            <td> {parent.parent_name}</td>
                                            <td> {parent.email}</td>
                                            <td> {parent.password}</td>
                                            <td> {parent.role}</td>
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

export default ListParentComponent;
