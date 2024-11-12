import { callAPI } from "../config/axiosInstance.js";

const authEndpoints = {
    SignIn: "/auth/login",
    SignUp: "/auth/signup",
    SendMailToVerify:"/auth/send-mail-to-verify",
    VerifyMail:"/auth/verify-mail"
};


const authApi = {
    signIn: async (params) => await callAPI("post", authEndpoints.SignIn, params),
    signUp: async (params) => await callAPI("post", authEndpoints.SignUp, params),
    sendMailToVerify: async (params) => await callAPI("post", authEndpoints.SendMailToVerify, params),
    verifyMail: async (params) => await callAPI("post", authEndpoints.VerifyMail, params),
};

export default authApi;
