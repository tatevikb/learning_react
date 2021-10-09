import React from "react";
import CategoryService from "../services/CategoryService";

class CategoryComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            categories:[]
        }
    }

    componentDidMount() {
        CategoryService.getCategories().then((response) => {
            this.setState({categories: response.data})
        });
    }
    render() {
        return (
            <div>
                <h1 className = "text-center"> Categories List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Category Id</td>
                            <td> Category Name</td>
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

export default CategoryComponent