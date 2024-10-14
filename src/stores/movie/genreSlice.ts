import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GenreMovieState {
    genre: string
}

const initialState: GenreMovieState = {
    genre: "",
}

export const genreSlice = createSlice({
    name: 'moviesGenre',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<string>) => {
            state.genre = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setGenre } = genreSlice.actions

export default genreSlice.reducer