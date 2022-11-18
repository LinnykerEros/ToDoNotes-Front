import axios from "axios";
import Cookies from "js-cookie";

const cookie = Cookies.get("reactauth.token");

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${cookie}`,
  },
});

export { api };
