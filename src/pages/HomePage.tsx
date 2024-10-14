import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFilms } from "@/stores/movie/movieSlice";
import Loader from "@/components/custom/Loader";
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/api";
import SwiperMovieHome from "@/components/custom/SwiperMovieHome";
import 'swiper/css';
import Hero from "@/components/custom/Hero";

export default function HomePage() {
    const dispatch = useDispatch();

    // Seleziona individualmente ogni array dal Redux state
    const popularMovies = useSelector((state: RootState) => state.movie.popularMovies);
    const topRatedMovies = useSelector((state: RootState) => state.movie.topRatedMovies);
    const upcomingMovies = useSelector((state: RootState) => state.movie.upcomingMovies);
    const nowPlayingMovies = useSelector((state: RootState) => state.movie.nowPlayingMovies);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = useCallback(async () => {
        setIsLoading(true);
        try {
            const [responsePopularMovies, responseTopRatedMovies, responseUpcomingMovies, responseNowPlayingMovies] = await Promise.all([
                getPopularMovies(),
                getTopRatedMovies(),
                getUpcomingMovies(),
                getNowPlayingMovies(),
            ]);

            dispatch(addFilms({
                typeOfMovie: "popularMovies",
                movies: responsePopularMovies.results,
            }));
            dispatch(addFilms({
                typeOfMovie: "topRatedMovies",
                movies: responseTopRatedMovies.results,
            }));
            dispatch(addFilms({
                typeOfMovie: "upcomingMovies",
                movies: responseUpcomingMovies.results,
            }));
            dispatch(addFilms({
                typeOfMovie: "nowPlayingMovies",
                movies: responseNowPlayingMovies.results,
            }));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    if (error) {
        return <div>Error fetching movies. Please try again later.</div>;
    }

    if (isLoading) {
        return <h1><Loader /></h1>;
    }

    return (
        <>
            <Hero />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-black/90 text-white">
                <section>
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0">
                            Popular Movies
                        </h2>
                    </div>
                    <SwiperMovieHome movies={popularMovies} />
                </section>
                <section>
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0">
                            Top Rated Movies
                        </h2>
                    </div>
                    <SwiperMovieHome movies={topRatedMovies} />
                </section>
                <section>
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0">
                            Upcoming Movies
                        </h2>
                    </div>
                    <SwiperMovieHome movies={upcomingMovies} />
                </section>
                <section>
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0">
                            Now Playing Movies
                        </h2>
                    </div>
                    <SwiperMovieHome movies={nowPlayingMovies} />
                </section>
            </div>
        </>
    );
}
