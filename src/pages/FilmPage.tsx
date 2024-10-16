import { Button } from "@/components/ui/button";
import { getMovieById } from "@/lib/api";
import { addFavoriteMovie } from "@/stores/movie/movieSlice";
import { MovieDetails } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function FilmPage() {
    const dispatch = useDispatch();
    const path = useParams();
    const [movie, setMovie] = useState<MovieDetails | null>(null); 
    const [saved, setSaved] = useState(false); 

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
            setSaved(true); 
            setTimeout(() => {
                setSaved(false);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [fetchMovie])

    return (
        <>
            {movie && (
                <div className="w-full h-[calc(100vh-64px)] relative overflow-hidden">
                    <div className={`w-4/5 md:w-1/3 lg:w-1/5 xl:w-1/6 absolute top-0 right-0 z-50 p-10 transform transition-transform duration-500 ease-in-out ${saved ? "translate-x-0" : "translate-x-80 lg:translate-x-[400px]"}`}>
                        <Alert>
                            <RocketIcon className="h-4 w-4" />
                            <AlertTitle>Aggiunto!</AlertTitle>
                            <AlertDescription>
                                Troverai il film nei preferiti
                            </AlertDescription>
                        </Alert>
                    </div>

                    {/* Dettagli del film */}
                    <div className="w-full h-full absolute bg-black z-10">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            className="w-full h-full object-cover relative z-0"
                            alt=""
                            loading="lazy"
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
