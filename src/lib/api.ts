import API from "@/config/apiClient";
import { GenreResponse, ResponseMovies } from "@/types";



export const getMovies = async () => {
    const response: ResponseMovies = await API.get("/discover/movie");
    return response;
}

export const getMovieGenres = async () => {
    const response: GenreResponse = await API.get("/genre/movie/list");
    return response;
}

export const getMovieSpecificGenres = async (genreId: string) => {
    const response: ResponseMovies = await API.get(`/discover/movie?with_genres=${genreId}`);
    return response;
}