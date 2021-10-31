import axios from "axios";

const CATEGORIES_REST_API_URL = 'http://localhost:8081/api/categories';

class CategoryService {
    getCategories() {
        return axios.get(CATEGORIES_REST_API_URL);
    }

    createCategory(category) {
        return axios.post(CATEGORIES_REST_API_URL, category);
    }

    getCategoryById(categoryId) {
        return axios.get(CATEGORIES_REST_API_URL + '/' + categoryId);
    }

    updateCategory(category, categoryId){
        return axios.put(CATEGORIES_REST_API_URL + '/' + categoryId, category);
    }

    deleteCategory(categoryId){
        return axios.delete(CATEGORIES_REST_API_URL + '/' + categoryId);
    }
}

export default new CategoryService();