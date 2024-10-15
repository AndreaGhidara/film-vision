import CardMovie from "@/components/custom/CardMovie";
import { RootState } from "@/store";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function FavoritesFilmPage() {

    const favoriteMovie = useSelector((state: RootState) => state.movie.favoriteMovies);

    return (
        <>
            <div className="min_screen dark_bg">
                {favoriteMovie.length > 0 ?
                    (
                        <>
                            <div className="w-full p-5 grid grid-cols-2 lg:grid-cols-6 gap-5">
                                {favoriteMovie.map((movie) =>
                                (
                                    <Link to={`/film/${movie.id}`} key={movie.id}>
                                        <CardMovie lastPartOfPath={movie?.poster_path || ""} />
                                    </Link>
                                )
                                )}
                            </div>
                        </>
                    )
                    :
                    (
                        <p>No favorites movie</p>
                    )
                }
            </div>
        </>
    )
}
