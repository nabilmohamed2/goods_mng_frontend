import axios from "axios";

//const REST_API_BASE_URL = "http://localhost:8080/api/items";
const REST_API_BASE_URL = "https://goods-mng.onrender.com/api/items"

export const list_of_items = () => axios.get(REST_API_BASE_URL);

export const add_new_item = (item) => axios.post(REST_API_BASE_URL,item);

export const get_new_item = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const update_item = (id, item) => axios.put(REST_API_BASE_URL + "/" + id, item);

export const delete_item = (id) => axios.delete(REST_API_BASE_URL + "/" + id);

//const REST_API_BASE_URL_TRACKER = "http://localhost:8080/api/itemTracker";
const REST_API_BASE_URL_TRACKER = "https://goods-mng.onrender.com/api/itemTracker";

export const add_tracker = (item) => axios.post(REST_API_BASE_URL_TRACKER, item);

// {
//     "trackerId": 1,
//     "item": {
//         "id": 18,
//         "name": "Marie gold",
//         "quantity": 50,
//         "price": 50
//     },
//     "action": "Verify",
//     "quantity": 10,
//     "timestamp": "DD-MM-YYYY"
// }

export const get_tracker = (id) => axios.get(REST_API_BASE_URL_TRACKER + "/" + id);

export const get_all_tracker = () => axios.get(REST_API_BASE_URL_TRACKER);