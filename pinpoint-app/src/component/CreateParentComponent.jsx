import React, { Component } from 'react';
import Studentservice from '../service/PinPointService'


class CreateParentComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            parent_name: '',
            email: '',
            password: '',
            role: 'parent'

        }
        this.changeParentNameHandler = this.changeParentNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        //this.changeRoleHandler = this.changeRoleHandler.bind(this);
    }


    changeParentNameHandler = (event) => {
        this.setState({parent_name: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    saveParentHandler = (e) => {
        e.preventDefault();
        let parent = {parent_name : this.state.parent_name ,
                        email : this.state.email,
                        password : this.state.password,
                        role:   this.state.role}  

                        console.log('parent => ' + JSON.stringify(parent));

                        Studentservice.createParent(parent).then(res => {
                            this.props.history.push('/parent');
                        })
    }
    cancelHandler = (event) => {
        this.props.history.push('/parent'); 
    }


    render() {
        return (
            <div className = 'container' >
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'>Add Parent</h3>
                        <div className='card-body ' >
                            <form className='d-grid gap-3'>
                                <div className= "form-group">
                                    <label> Parent Name: </label>
                                    <input placeholder='Enter Parent Name' name='parent_name' className='form-control'
                                        value={this.state.parent_name} onChange={this.changeParentNameHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Parent Email: </label>
                                    <input placeholder='Enter Parent Email' name='email' className='form-control'
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                </div>
                                <div className= "form-group">
                                    <label> Password: </label>
                                    <input placeholder='Enter your Password' name='password' className='form-control'
                                        value={this.state.password} onChange={this.changePasswordHandler}/>
                                </div>
            
                                <div className='button '>
                                    
                                    <button type="submit" className="btn btn-primary " onClick={this.saveParentHandler}>Submit</button>
                                    
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

export default CreateParentComponent;
