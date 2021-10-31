import axios from "axios";

const ITEMS_REST_API_URL = 'http://localhost:8081/api/items';

class ItemService {
    getItems() {
        return axios.get(ITEMS_REST_API_URL);
    }

    createItem(item) {
        return axios.post(ITEMS_REST_API_URL, item);
    }

    getItemById(itemId) {
        return axios.get(ITEMS_REST_API_URL + '/' + itemId);
    }

    updateItem(item, itemId){
        return axios.put(ITEMS_REST_API_URL + '/' + itemId, item);
    }

    deleteItem(itemId){
        return axios.delete(ITEMS_REST_API_URL + '/' + itemId);
    }
}

export default new ItemService();