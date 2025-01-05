import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "userReducer",
    initialState : {
        username : "",
        password : "",
        token : "",
        role : ""
    },
    reducers : {
        setUserName : (state, action) => {
            state.username = action.payload;
        },
        setPassword : (state, action) => {
            state.password = action.payload;
        },
        setToken : ( state, action ) => {
            state.token = action.payload;
        },
        setRole : ( state, action ) => {
            state.role = action.payload;
        },
        removeUser : (state) => {
            state.password = "",
            state.role = "",
            state.token = "",
            state.username = ""
        }
    }
});

export const {setUserName, setPassword, setRole, setToken, removeUser} = userSlice.actions;
export default userSlice.reducer;