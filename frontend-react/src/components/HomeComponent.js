import React from "react";
import styled from "styled-components";
import ReactDOM from 'react-dom'
import UserComponent from "./UserComponent";
import ItemComponent from "./ItemComponent";
import CategoryComponent from "./CategoryComponent";

const theme = {
    blue: {
        default: '#3f51b5',
        hover: '#283593'
    },
    pink: {
        default: '#e91e63',
        hover: '#ad1457'
    },
    green: {
        default: '#43a047',
        hover: '#388e3c'
    }
}

const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 5px 0px;
    width: 120pt;
    cursor: pointer;
    box-shadow 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: ${props => theme[props.theme].hover};
    }
`
Button.defaultProps = {
    theme: 'blue'
}

class HomeComponent extends React.Component {
    showUsers() {
        var listView = document.querySelector("#list-view")

        ReactDOM.render(
            <UserComponent/>,
            listView
        )
    }

    showItems() {
        var listView = document.querySelector("#list-view")
        ReactDOM.render(
            <ItemComponent/>,
            listView
        )
    }

    showCategories() {
        var listView = document.querySelector("#list-view")
        ReactDOM.render(
            <CategoryComponent/>,
            listView
        )
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Button className="btn btn-primary" onClick={this.showUsers}>Users</Button><br/>
                            <Button theme="pink" className="btn btn-primary" onClick={this.showItems}>Items</Button><br/>
                            <Button theme ="green" className="btn btn-primary" onClick={this.showCategories}>Categories</Button>
                        </td>
                        <td>
                            <div id="list-view"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default HomeComponent
