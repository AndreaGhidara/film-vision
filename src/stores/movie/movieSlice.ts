import { MovieInterface } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesState {
    movies: MovieInterface[]
}

const initialState: MoviesState = {
    movies: [],
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addFilms: (state, action: PayloadAction<MovieInterface[]>) => {
            state.movies = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { addFilms } = moviesSlice.actions

export default moviesSlice.reducer