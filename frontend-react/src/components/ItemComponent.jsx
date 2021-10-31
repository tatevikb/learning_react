import React from "react";
import ReactDOM from 'react-dom'
import ItemService from "../services/ItemService";
import CreateItemComponent from "./CreateItemComponent";

class ItemComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items:[]
        }

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        ItemService.getItems().then((response) => {
            this.setState({items: response.data})
        });
    }

    deleteItem(id) {
        ItemService.deleteItem(id).then( res => {
            this.setState({items: this.state.items.filter(items => items.id !== id)});
        });
    }

    editItem(id) {
        var rootPlace = document.querySelector("#list-view")
        ReactDOM.render(
            <CreateItemComponent mode="edit" itemId={id}/>,
            rootPlace
        )
    }

    addItem() {
        var rootPlace = document.querySelector("#list-view")
        ReactDOM.render(
            <CreateItemComponent mode="add" itemId="-1"/>,
            rootPlace
        )
    }
  
    render() {

        var buttonStyle = {
            width: 100
        }
        
        return (
            <div>
                <h1 className = "text-center"> Items List</h1>
                <div className = "row">
                    <button className="btn btn-primary" style={buttonStyle} onClick={this.addItem}>Add Item</button>
                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Item Id</td>
                            <td> Item Name</td>
                            <td> Item Category</td>
                            <td> Item Code</td>
                            <td> Item Cost</td>
                            <td> Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(
                                item =>
                                <tr key = {item.id}>
                                    <td> {item.id}</td>
                                    <td> {item.itemName}</td>
                                    <td> {item.itemCategory}</td>
                                    <td> {item.code}</td>
                                    <td> {item.cost}</td>
                                    <td>
                                        <button onClick = { () => this.editItem(item.id)} className = "btn btn-info"> Update </button>
                                        <button style={{marginLeft: "10px"}} onClick = { () => this.deleteItem(item.id)} className = "btn btn-danger"> Delete </button>
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

export default ItemComponent