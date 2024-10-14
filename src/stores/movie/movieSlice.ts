import { MovieInterface } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesState {
    movies: MovieInterface[]
    popularMovies: MovieInterface[],
    topRatedMovies: MovieInterface[],
    upcomingMovies: MovieInterface[],
    nowPlayingMovies: MovieInterface[],
}

const initialState: MoviesState = {
    movies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
}

interface AddFilmsPayload {
    typeOfMovie: keyof MoviesState; 
    movies: MovieInterface[];
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFilms: (state, action: PayloadAction<AddFilmsPayload>) => {
            const { typeOfMovie, movies } = action.payload;
            state[typeOfMovie] = movies;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addFilms } = moviesSlice.actions

export default moviesSlice.reducer