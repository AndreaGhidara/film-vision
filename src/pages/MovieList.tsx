import CardMovie from "@/components/custom/CardMovie";
import FilterFilm from "@/components/custom/FilterFilm";
import Loader from "@/components/custom/Loader";
import { getMovieSpecificGenres, specificPageSpecificGenres } from "@/lib/api";
import { RootState } from "@/store";
import { addFilms } from "@/stores/movie/movieSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";

export default function MovieList() {
    const dispatch = useDispatch();
    const moviesGenre = useSelector((state: RootState) => state.genreMovie.genre);
    const movies = useSelector((state: RootState) => state.movie.moviesSpecificGenre);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovieSpecificGenres = useCallback(async () => {
        try {
            setIsLoading(true);
            if (moviesGenre) {
                const response = await getMovieSpecificGenres(moviesGenre);
                setTotalPages(response.total_pages);
                setCurrentPage(1); // Resetta alla prima pagina al cambio di genere
                dispatch(addFilms({
                    typeOfMovie: "moviesSpecificGenre",
                    movies: response.results,
                }));
            }
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, moviesGenre]);

    const handlePageChange = async (page: number) => {
        console.log('qua');

        try {
            setIsLoading(true);
            const response = await specificPageSpecificGenres(page.toString(), moviesGenre);
            setCurrentPage(page);  // Aggiorna la pagina corrente
            dispatch(addFilms({
                typeOfMovie: "moviesSpecificGenre",
                movies: response.results,
            }));
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (moviesGenre) {
            handlePageChange(currentPage);
            window.scrollTo(0, 0);  // Scroll to top whenever page or genre changes
        }
    }, [currentPage, moviesGenre]);

    if (error) {
        return <div className="text-red-500">Error fetching movies. Please try again later.</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-black/90 text-white">
            <div className="container mx-5 md:mx-auto py-10">
                <FilterFilm />
            </div>
            <div className="flex flex-col container mx-5 md:mx-auto">
                <section className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {movies && movies.length > 0 ? (
                        <>
                            {movies.map((movie, index) => (
                                <div key={index}>
                                    <CardMovie lastPartOfPath={movie?.poster_path || ""} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No movies available</p>
                    )}
                </section>
                <div className="w-full flex justify-end py-5">
                    {movies && movies.length > 0 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">{currentPage}</PaginationLink>
                                </PaginationItem>
                                {totalPages > 1 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">{totalPages}</PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem>
                                    <Button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}>
                                        <PaginationNext
                                        />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </div >
    );
}
