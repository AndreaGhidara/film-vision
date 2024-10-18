import axios from "axios";

const options = {
    baseURL: import.meta.env.VITE_MOVIE_URL,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_KEY_TMDB}`,
    },
};

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            return error.response;
        }
        return error;
    }
);

export default API  