import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API ="/api/v1/register";
    const data = { name, email, password };
    return axios.post(URL_API, data);
}

const loginApi = (email, password) => {
    const URL_API ="/api/v1/login";
    const data = { email, password };
    return axios.post(URL_API, data);
}

const getUsersApi = () => {
    const URL_API ="/api/v1/users";
    return axios.get(URL_API);
}

const getProductsApi = (category, page, limit) => {
    const URL_API = "/api/v1/products";
    const params = { category, page, limit };
    return axios.get(URL_API, { params });
}

export const fetchPage = async ({ category, page, limit }) => {
const URL_API = "/api/v1/products";
  const params = { category, page, limit };
  try {
    const res = await axios.get(URL_API, { params });
    console.log("Fetch products raw: ", res);
    console.log("Fetch products data: ", res.data);
    console.log("Fetch products product: ", res.product);
    return res;
  } catch (err) {
    console.error("Fetch products error: ", err);
    return { products: [] };
  }
};

export const searchProductsApi = async (criteria) => {
  try {
    const res = await axios.get("/api/v1/products/search", { params: criteria });
    console.log("Search products raw: ", res);
    console.log("Search products data: ", res.data);
    return res;
  } catch (error) {
    console.error("searchProductsApi error:", error);
    return { products: [] };
  }
};
export { createUserApi, loginApi, getUsersApi, getProductsApi};