import React from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            // if id is -1 then requset is for add operation, when id is 1, then request is for update operation
            //id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }

    //step 3
    componentDidMount() {
        //step 4
        if(this.state.id === "_add") {
            return;
        }
        else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({firstName: user.firstName, 
                    lastname: user.lastName, 
                    email: user.email
                });
            });
        }
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('user => ' + JSON.stringify(user));

        //step 5
        if(this.state.id === "_add") {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            });
        }
        else {
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }

    cancel() {
        this.props.history.push('/users');
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    getTitle() {
        if(this.state.id === "_add") {
            return <h3 className = "text-center">Add User</h3>
        }
        else {
            return <h3 className = "text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        {
                            this.getTitle()
                        }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                           value={this.state.firstName} onChange= {this.changeFirstNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label> Lastst Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                           value={this.state.lastName} onChange= {this.changeLastNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label> Email: </label>
                                    <input placeholder="Email Address" name="email" className="form-control"
                                           value={this.state.email} onChange= {this.changeEmailHandler}/>

                                    <button className="btn btn-success" onClick={this.saveUser}>Save</button> 
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>      
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h3> User Form</h3>
            </div>
        )
    }
}

export default CreateUserComponent