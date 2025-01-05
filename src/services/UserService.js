import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "../components/userSlice";

//const REST_API_BASE_URL = "http://localhost:8080/auth/";
const REST_API_BASE_URL = "https://goods-mng.onrender.com/auth/";
export const register_user = (credentials) => {
    console.log(credentials);
    return axios.post(REST_API_BASE_URL+"register", credentials);
}

export const login_user = async (credentials) => {
    console.log(credentials);
    const token = await axios.post(REST_API_BASE_URL+"login", credentials);
    console.log(token.data);
    const userInfo = await axios.get(REST_API_BASE_URL+"protectedData",{
        'headers' : {
            'Authorization' : `Bearer ${token.data}`
        }
    });
    console.log(userInfo);
    return userInfo;
}


