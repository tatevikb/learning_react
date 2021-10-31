import React from 'react'
import ReactDOM from 'react-dom'
import CategoryService from '../services/CategoryService';
import CategoryComponent from "./CategoryComponent";

class CreateCategoryComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mode: this.props.mode,
            id: this.props.categoryId,
            categoryName: '',
        }

        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.saveCategory= this.saveCategory.bind(this);
    }

    componentDidMount() {
        if(this.state.mode === "add") {
            return;
        }
        else {
            console.log(JSON.stringify(this.state))
            CategoryService.getCategoryById(this.state.id)
                .then((res) => {
                    this.setState({ categoryName: res.data.category.categoryName });
                });
        }
    }

    saveCategory = (e) => {
        e.preventDefault();
        let category = {categoryName: this.state.categoryName};
        console.log(this.state)
        if(this.state.mode === "add") {
            CategoryService.createCategory(category).then(res => {
                ReactDOM.render(<CategoryComponent/>, document.querySelector("#list-view"))
            });
        }
        else {
            CategoryService.updateCategory(category, this.state.id)
                .then( res => {
                    ReactDOM.render(<CategoryComponent/>, document.querySelector("#list-view"))
                });
        }
    }

    cancel() {
        this.props.history.push('/categorys');
    }

    changeCategoryNameHandler= (event) => {
        this.setState({categoryName: event.target.value});
    }


    getTitle() {
        if(this.state.mode === "add") {
            return <h3 className = "text-center">Add Category</h3>
        }
        else {
            return <h3 className = "text-center">Update Category</h3>
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
                                    <label> Category Name: </label>
                                    <input placeholder="Category Name" name="categoryName" className="form-control"
                                           value={this.state.categoryName} onChange= {this.changeCategoryNameHandler}/>

                                    <button className="btn btn-success" onClick={this.saveCategory}>Save</button> 
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

export default CreateCategoryComponent