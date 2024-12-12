import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
console.log(cookies.get("access_token"));

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies.get("access_token")}`,
  },
});
