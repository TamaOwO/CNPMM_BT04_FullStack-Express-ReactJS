import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API ="/v1/api/register";
    const data = { name, email, password };
    return axios.post(URL_API, data);
}

const loginApi = (email, password) => {
    const URL_API ="/v1/api/login";
    const data = { email, password };
    return axios.post(URL_API, data);
}

const getUsersApi = () => {
    const URL_API ="/v1/api/users";
    return axios.get(URL_API);
}

const getProductsApi = (category, page, limit) => {
    const URL_API = "/v1/api/products";
    const params = { category, page, limit };
    return axios.get(URL_API, { params });
}

export { createUserApi, loginApi, getUsersApi };