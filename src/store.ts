import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './stores/movie/movieSlice'
import genreReducer from './stores/movie/genreSlice'

export const store = configureStore({
    reducer: {
        movie: moviesReducer,
        genreMovie: genreReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch