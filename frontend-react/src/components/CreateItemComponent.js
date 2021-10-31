import React from 'react'
import ReactDOM from 'react-dom'
import ItemService from '../services/ItemService';
import ItemComponent from "./ItemComponent";

class CreateItemComponent extends React.Component {
    constructor(props) {
        super(props)   
        this.state = {
            mode: this.props.mode,
            id: this.props.itemId,
            itemName: '',
            categories: [],
            code: '',
            cost: 0,
        }

        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.changeItemCategoryHandler = this.changeItemCategoryHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentDidMount() {
        if(this.state.mode === "add") {
            fetch('http://localhost:8081/api/categories')
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    let cats = data.map(cat => cat.categoryName)
                    this.setState({ categories : cats });
                }).catch(error => {
                    console.log(error);
                })
            return;
        }
        else {
            ItemService.getItemById(this.state.id).then((res) => {
                let item = res.data;
                this.setState({itemName: item.itemName, 
                    itemCategory: item.itemCategory, 
                    code: item.code,
                    cost: item.cost
                });
            });
        }
    }

    saveItem = (e) => {
        e.preventDefault();
        let item = {itemName: this.state.itemName, itemCategory: this.state.itemCategory, code: this.state.code, cost: this.state.cost};

        if(this.state.mode === "add") {
            ItemService.createItem(item).then(res => {
                ReactDOM.render(<ItemComponent/>, document.querySelector("#list-view"))
            });
        }
        else {
            ItemService.updateItem(item, this.state.id).then( res => {
                ReactDOM.render(<ItemComponent/>, document.querySelector("#list-view"))
            });
        }
    }

    cancel() {
        this.props.history.push('/items');
    }

    changeItemNameHandler= (event) => {
        this.setState({itemName: event.target.value});
    }

    changeItemCategoryHandler= (event) => {
        this.setState({itemCategory: event.target.value});
    }

    changeCodeHandler= (event) => {
        this.setState({code: event.target.value});
    }

    changeCostHandler= (event) => {
        this.setState({cost: event.target.value});
    }

    getTitle() {
        if(this.state.mode === "add") {
            return <h3 className = "text-center">Add Item</h3>
        }
        else {
            return <h3 className = "text-center">Update Item</h3>
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
                                    <label> Item Name: </label>
                                    <input placeholder="Item Name" name="itemName" className="form-control"
                                           value={this.state.itemName} onChange= {this.changeItemNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label> Item Category: </label>
                                    <select onChange={this.changeItemCategoryHandler}>
                                        {this.state.categories.map((category) => <option value={category}>{category}</option>)}
                                    </select>
                                </div>
                                <div className = "form-group">
                                    <label> Code: </label>
                                    <input placeholder="Code" name="code" className="form-control"
                                           value={this.state.code} onChange= {this.changeCodeHandler}/>
                                </div>          
                                <div className = "form-group">
                                    <label> Cost: </label>
                                    <input placeholder="Cost" name="cost" className="form-control"
                                           value={this.state.cost} onChange={this.changeCostHandler}/>

                                    <button className="btn btn-success" onClick={this.saveItem}>Save</button> 
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "20px"}}>Cancel</button>      
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItemComponent