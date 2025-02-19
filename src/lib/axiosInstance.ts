import axios from "axios";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.common.Authorization = '';

const ipAxiosInstance = axios.create({
    baseURL: 'https://ipapi.co',
})
    
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        Authorization: '', // Adjust authorization headers as needed
    },
});

// Function to set the Authorization token
export const setAuthorizationToken = (token:string) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export { ipAxiosInstance,axiosInstance }

export default axios;