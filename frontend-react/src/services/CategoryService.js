import axios from "axios";

const CATEGORIES_REST_API_URL = 'http://localhost:8081/api/categories';

class CategoryService {
    getCategories() {
        return axios.get(CATEGORIES_REST_API_URL);
    }
}

export default new CategoryService();