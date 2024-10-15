import API from "@/config/apiClient";
import { GenreResponse, MovieDetails, ResponseMovies } from "@/types";


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

export const getMovieById = async (movieId: string) => {
    console.log('movieId', movieId);

    const response: MovieDetails = await API.get(`/movie/${movieId}`);
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

export const specificPageSpecificGenres = async (page: string, genreId?: string) => {
    const response: ResponseMovies = await API.get(`/discover/movie?with_genres=${genreId}&page=${page}`);
    console.log(response);
    return response;
}

export const getMovies = async (page: string) => {
    const response: ResponseMovies = await API.get(`/discover/movie?page=${page}`);
    return response;
}
