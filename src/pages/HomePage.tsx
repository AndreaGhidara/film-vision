import { getMovies } from "@/lib/api";
import { useEffect, useState } from "react";
import CardFilm from "@/components/custom/CardFilm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFilms } from "@/stores/movie/movieSlice";
import Loader from "@/components/custom/Loader";

export default function HomePage() {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movie.movies)

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const response = await getMovies();
            dispatch(addFilms(response.results));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [movies]);

    // Utilizza useCallback per memoizzare la funzione fetchMovies
    // const fetchMovies = useCallback(async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await getMovies();
    //         dispatch(addFilms(response.results));
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setError(true);
    //         setIsLoading(false);
    //     }
    // }, [dispatch]); // Il dispatch è una dipendenza stabile e non cambia, quindi va bene includerlo.

    // useEffect(() => {
    //     fetchMovies();
    // }, [fetchMovies]); // Usa fetchMovies come dipendenza qui.

    if (error) {
        return <div>Error fetching movies. Please try again later.</div>;
    }

    if (isLoading) {
        return <h1><Loader /></h1>;
    }

    return (
        <>
            <div className="flex">
                <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {movies && movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <div key={index}>
                                <CardFilm key={index} id={movie.id} title={movie.title} release_date={movie.release_date} overview={movie.overview} vote_average={movie.vote_average} poster_path={movie.poster_path} adult={false} backdrop_path={null} genre_ids={[]} original_language={""} original_title={""} popularity={0} video={false} vote_count={0} />
                            </div>
                        ))
                    ) : (
                        <p>No movies available</p>
                    )}
                </section>
            </div>
        </>
    );
}