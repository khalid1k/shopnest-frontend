import axios from 'axios';

const backendBaseUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`;
console.log("backend base url is ", backendBaseUrl)
export const apiClient = axios.create({
  baseURL: backendBaseUrl,
  withCredentials: true,
});
