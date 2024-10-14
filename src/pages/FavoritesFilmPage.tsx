import { RootState } from "@/store";
import { useSelector } from "react-redux"

export default function FavoritesFilmPage() {

    const favoriteMovie = useSelector((state: RootState) => state.movie.favoriteMovies);

    return (
        <>
            <div>
                {favoriteMovie.length > 0 ? favoriteMovie.map((movie) => <p key={movie.id}>{movie.title}</p>) : <p>No favorites yet</p>}
            </div>
        </>
    )
}
