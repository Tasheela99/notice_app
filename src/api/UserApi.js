import { callAPI } from "../config/axiosInstance.js";

const userEndpoints = {
    Profile: "/users/profile",
    UserList: "/users/login",
    UserUpdate: "/users/profile/update",
    FindUserBuId:"/users/send-mail-to-verify",
    UserDelete:"/users/verify-mail",
};


const userApi = {
    profile: async (params) => await callAPI("get", userEndpoints.Profile,params),
    update: async (params) => await callAPI("post", userEndpoints.UserUpdate, params),    //UserList: async (params) => await callAPI("post", userEndpoints.SignIn, params),
};

export default userApi;
