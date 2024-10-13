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
            switch (error.response.status) {
                case 404:
                    console.error("Risorsa non trovata");
                    break;
                case 500:
                    console.error("Errore del server");
                    break;
                default:
                    console.error("Errore:", error.response.status);
            }
        }
        return Promise.reject(error);
    }
);

export default API  