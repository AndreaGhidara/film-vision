import { Button } from "@/components/ui/button";
import { getMovieById } from "@/lib/api";
import { addFavoriteMovie } from "@/stores/movie/movieSlice";
import { MovieDetails } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

export default function FilmPage() {
    const dispatch = useDispatch();
    const path = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null);  // Inizializza come null

    const fetchMovie = useCallback(async () => {
        try {
            const response = await getMovieById(path.id?.toString() || "");
            console.log(response);
            setMovie(response);

        } catch (error) {
            console.log(error);
        }
    }, [path]);

    const saveToFavorites = () => {
        if (movie) {
            dispatch(addFavoriteMovie({ movie: movie }));
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [fetchMovie])

    return (
        <>
            {movie && (
                <div className="w-full h-[calc(100vh-64px)] relative">
                    <div className="w-full h-full absolute bg-black z-10">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            className="w-full h-full object-cover relative z-0"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/40 z-20 flex flex-col justify-center items-start p-5 gap-3">
                            <span className="text-white text-4xl opacity-70">{movie.title}</span>
                            <span className="text-white text-sm opacity-70">{movie.release_date} | {movie.runtime} min</span>
                            <span className="text-white text-sm opacity-70 max-w-md">{movie.overview}</span>
                            <Button onClick={saveToFavorites}>Save to Favorite</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
