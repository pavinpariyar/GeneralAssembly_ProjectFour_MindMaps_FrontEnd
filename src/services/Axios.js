import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../utils/constant";

const axiosService = axios.create({
  baseURL: BaseUrl,
});

axiosService.interceptors.request.use(
  (config) => {

    let token = JSON.parse(localStorage.getItem("data"))
    token = token?.accessToken || "";

    config.headers["authorization"] = 'Bearer ' + token;
    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getApi = async (endpoint) => {
  try {
    const response = await axiosService.get(endpoint);

    return response.data;
  } catch (error) {
    catchError(error);
    return error.message;
  }
};

export const postApi = async (endpoint, data) => {
  try {
    const response = await axiosService.post(endpoint, data);
    return response.data;
  } catch (error) {
    catchError(error);
    return error.message;
  }
};

export const putApi = async (endpoint, data) => {
  try {
    const response = await axiosService.put(endpoint, data);
    return response.data;
  } catch (error) {
    catchError(error);
    return error.message;
  }
};

export const deleteApi = async (endpoint) => {
  try {
    const response = await axiosService.delete(endpoint);
    return response.data;
  } catch (error) {
    catchError(error);
    return error.message;
  }
};


const catchError = (error) => {
  toast.error(error?.response?.data?.msg);
}
