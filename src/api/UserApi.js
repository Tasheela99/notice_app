import { callAPI } from "../config/axiosInstance.js";

const userEndpoints = {
    Profile: "/users/profile",
    UserList: "/users/login",
    UserUpdate: "/users/signup",
    FindUserBuId:"/users/send-mail-to-verify",
    UserDelete:"/users/verify-mail",
};


const userApi = {
    profile: async (params) => await callAPI("get", userEndpoints.Profile,params),
    //UserList: async (params) => await callAPI("post", userEndpoints.SignIn, params),
};

export default userApi;
