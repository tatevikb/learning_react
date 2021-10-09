import React from "react";
import ReactDOM from 'react-dom'
import UserService from "../services/UserService";
import CreateUserComponent from "./CreateUserComponent";

class UserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users:[]
        }

        this.addUser = this.addUser.bind(this);
    }
    
    editUser(id) {
        this.props.history.push('/add-user/1');
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({users: response.data})
        });
    }

    addUser() {
        //this.props.history.push('/add-user/_add');
        var rootPlace = document.querySelector("#root")
        ReactDOM.render(
            <CreateUserComponent/>,
            rootPlace
        )
    }

    render() {
        var buttonStyle = {
            width: 100
        }

        return (
            <div>
                <h1 className = "text-center"> Users List</h1>
                <div className = "row">
                    <button className="btn btn-primary" style={buttonStyle} onClick={this.addUser}>Add User</button>
                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> User Id</td>
                            <td> User First Name</td>
                            <td> User Last Name</td>
                            <td> User Email</td>
                            <td> Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.firstName}</td>
                                    <td> {user.lastName}</td>
                                    <td> {user.email}</td>
                                    <td>
                                        <button onClick = { () => this.editUser(user.id)} className = "btn btn-info"> Update </button>
                                    </td>
                                    <td>
                                        <button onClick = { () => this.deleteUser(user.id)} className = "btn btn-danger"> Delete </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserComponent
