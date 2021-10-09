import React from "react";
import ItemService from "../services/ItemService";

class ItemComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items:[]
        }
    }

    componentDidMount() {
        ItemService.getItems().then((response) => {
            this.setState({items: response.data})
        });
    }
    render() {
        return (
            <div>
                <h1 className = "text-center"> Items List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Item Id</td>
                            <td> Item Name</td>
                            <td> Item Category</td>
                            <td> Item Code</td>
                            <td> Item Cost</td>
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
                                        <button className="btn btn-primary" onClick = "btn btn-info"> Update </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick = "btn btn-danger"> Delete </button>
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