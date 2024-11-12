import { callAPI } from "../config/axiosInstance.js";

const authEndpoints = {
    SignIn: "/auth/login",
    SignUp: "/auth/signup",
    SendMailToVerify:"/auth/send-mail-to-verify",
    VerifyMail:"/auth/verify-mail",
    ForgotPassword:"/auth/password-forgot"
};


const authApi = {
    signIn: async (params) => await callAPI("post", authEndpoints.SignIn, params),
    signUp: async (params) => await callAPI("post", authEndpoints.SignUp, params),
    sendMailToVerify: async (params) => await callAPI("post", authEndpoints.SendMailToVerify, params),
    verifyMail: async (params) => await callAPI("post", authEndpoints.VerifyMail, params),
    forgotPassword: async (params) => await callAPI("post", authEndpoints.ForgotPassword, params),
};

export default authApi;
