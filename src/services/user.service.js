import { postApi } from "./Axios";

const END_POINT = 'users/'

const AddUserAPI = (data) => {
    const response = postApi(END_POINT + "add-user", data);
    return response;
};

const LoginApi = (data) => {
    const response = postApi(`${END_POINT}login`,data);
    return response
};

export {
    AddUserAPI,
    LoginApi
};
