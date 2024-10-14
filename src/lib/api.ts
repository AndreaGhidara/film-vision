import API from "@/config/apiClient";
import { GenreResponse, ResponseMovies } from "@/types";


export const getPopularMovies = async () => {
    const response: ResponseMovies = await API.get("/movie/popular");
    return response;
}

export const getNowPlayingMovies = async () => {
    const response: ResponseMovies = await API.get("/movie/now_playing");
    return response;
}

export const getTopRatedMovies = async () => {
    const response: ResponseMovies = await API.get("/movie/top_rated");
    return response;
}

export const getUpcomingMovies = async () => {
    const response: ResponseMovies = await API.get("/movie/upcoming");
    return response;
}


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