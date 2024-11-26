import { callAPI } from "../config/axiosInstance.js";

const userEndpoints = {
    Profile: "/users/profile",
    UserUpdate: "/users/profile/update",
};


const userApi = {
    profile: async (params) => await callAPI("get", userEndpoints.Profile,params),
    update: async (params) => await callAPI("post", userEndpoints.UserUpdate, params),
};

export default userApi;
