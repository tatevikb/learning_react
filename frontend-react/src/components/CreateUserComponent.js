import React from 'react'
import ReactDOM from 'react-dom'
import UserService from '../services/UserService';
import UserComponent from "./UserComponent";

class CreateUserComponent extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            mode: this.props.mode,
            // step 2
            id: this.props.userId,
            firstName: '',
            lastName: '',
            email: '',
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    //step 3
    componentDidMount() {
        //step 4
        if(this.state.mode === "add") {
            return;
        }
        else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({firstName: user.firstName, 
                    lastName: user.lastName, 
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
        if(this.state.mode === "add") {
            UserService.createUser(user).then(res => {
                ReactDOM.render(<UserComponent/>, document.querySelector("#list-view"))
            });
        }
        else {
            UserService.updateUser(user, this.state.id).then( res => {
                ReactDOM.render(<UserComponent/>, document.querySelector("#list-view"))
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
        if(this.state.mode === "add") {
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
            </div>
        )
    }
}

export default CreateUserComponent