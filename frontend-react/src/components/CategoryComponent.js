import React from "react";
import ReactDOM from 'react-dom'
import CategoryService from "../services/CategoryService";
import CreateCategoryComponent from "./CreateCategoryComponent";

class CategoryComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            categories:[]
        }

        this.addCategory = this.addCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount() {
        CategoryService.getCategories().then((response) => {
            this.setState({categories: response.data})
        });
    }
    
    deleteCategory(id) {
        CategoryService.deleteCategory(id).then( res => {
            this.setState({categories: this.state.categories.filter(category => category.id !== id)});
        });
    }

    editCategory(id) {
        var rootPlace = document.querySelector("#list-view")
        ReactDOM.render(
            <CreateCategoryComponent mode="edit" categoryId={id}/>,
            rootPlace
        )
    }

    addCategory() {
        var rootPlace = document.querySelector("#list-view")
        ReactDOM.render(
            <CreateCategoryComponent mode="add" categoryId="-1"/>,
            rootPlace
        )
    }

    render() {

        var buttonStyle = {
            width: 100
        }

        return (
            <div>
                <h1 className = "text-center"> Categories List</h1>
                <div className = "row">
                    <button className="btn btn-primary" style={buttonStyle} onClick={this.addCategory}>Add Category</button>
                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Category Id</td>
                            <td> Category Name</td>
                            <td> Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map(
                                category =>
                                <tr key = {category.id}>
                                    <td> {category.id}</td>
                                    <td> {category.categoryName}</td>
                                    <td>
                                    <button onClick={() => this.editCategory(category.id)} className="btn btn-info">Update</button>
                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCategory(category.id)} className="btn btn-danger">Delete</button>
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

export default CategoryComponent