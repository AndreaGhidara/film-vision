import { MovieDetails, MovieInterface } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesState {
    moviesSpecificGenre: MovieInterface[],
    popularMovies: MovieInterface[],
    topRatedMovies: MovieInterface[],
    upcomingMovies: MovieInterface[],
    nowPlayingMovies: MovieInterface[],
    favoriteMovies: MovieDetails[],
}

const initialState: MoviesState = {
    moviesSpecificGenre: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    favoriteMovies: [],
}

interface AddFilmsPayload {
    typeOfMovie: Exclude<keyof MoviesState, 'favoriteMovies'>; // Exclude 'favoriteMovies'
    movies: MovieInterface[];
}

interface AddFavoriteMoviePayload {
    movie: MovieDetails;
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFilms: (state, action: PayloadAction<AddFilmsPayload>) => {
            const { typeOfMovie, movies } = action.payload;
            state[typeOfMovie] = movies;
        },
        addFavoriteMovie: (state, action: PayloadAction<AddFavoriteMoviePayload>) => {
            const movieExists = state.favoriteMovies.some(movie => movie.id === action.payload.movie.id);

            if (!movieExists) {
                state.favoriteMovies.push(action.payload.movie);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addFilms, addFavoriteMovie } = moviesSlice.actions

export default moviesSlice.reducer