import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { getMovieGenres, getMovies, specificPageSpecificGenres } from "@/lib/api"
import { Genre, MovieInterface } from "@/types";
import Loader from "@/components/custom/Loader";
import CardMovie from "@/components/custom/CardMovie";
import { Link } from "react-router-dom";


export default function MovieList() {

    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(400);

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<{ id: number; name: string }>({ id: 0, name: "" });


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [genres, setGenres] = useState<Genre[]>([]);

    const fetchMovieGenres = async () => {
        try {
            const response = await getMovieGenres();
            setGenres(response.genres);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const getMoviesAll = async (page: string, genreId?: string) => {
        setLoading(true);
        setCurrentPage(parseInt(page));
        try {
            let response;
            if (genreId) {
                response = await specificPageSpecificGenres(page, genreId);
            } else {
                response = await getMovies(page);
            }
            setMovies(response.results);
            setLoading(false);
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getMoviesAll(pageNumber.toString());
        window.scrollTo(0, 0);  // Scroll to top when page changes
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchMovieGenres();
        getMoviesAll(currentPage.toString());
    }, [currentPage]);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <section className="h-[50px] flex items-center">
                <div className="mx-5">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value.name
                                    ? genres.find((genre) => genre.name === value.name)?.name
                                    : "Select genre..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search genre..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No genre found.</CommandEmpty>
                                    <CommandGroup>
                                        {genres.map((genre) => (
                                            <CommandItem
                                                key={genre.name}
                                                value={genre.name}
                                                onSelect={(currentValue) => {
                                                    setValue({ id: genre.id, name: currentValue === value.name ? "" : currentValue });
                                                    setOpen(false);
                                                    getMoviesAll("1", genre.id.toString());
                                                }}
                                            >
                                                {genre.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        value.name === genre.name ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Button className="mx-4" onClick={() => getMoviesAll("1")}>
                        Reset
                    </Button>
                </div>
            </section>
            <section className="w-full min-h-[calc(100vh-114px)] dark_bg py-5">
                {loading ? (
                    <Loader />
                ) : (
                    movies && movies.length > 0 ? (
                        <>
                            <div className="w-full px-5 grid grid-cols-2 lg:grid-cols-6 gap-5">
                                {movies.map((movie, index) => (
                                    <Link to={`/film/${movie.id}`} key={index}>
                                        <CardMovie lastPartOfPath={movie?.poster_path || ""} />
                                    </Link>
                                ))}
                            </div>
                            <div className="w-full flex justify-center mt-5">
                                <Pagination>
                                    <PaginationContent>
                                        {/* Bottone per andare alla pagina precedente */}
                                        <PaginationItem>
                                            <PaginationPrevious onClick={previousPage} />
                                        </PaginationItem>

                                        {/* Gestione delle pagine precedenti, mostrale solo se non sei alla prima pagina */}
                                        {currentPage > 1 && (
                                            <PaginationItem>
                                                <PaginationLink onClick={() => changePage(currentPage - 1)}>
                                                    {currentPage - 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        {/* Pagina corrente */}
                                        <PaginationItem>
                                            <PaginationLink className="text-black" isActive={true}>
                                                {currentPage}
                                            </PaginationLink>
                                        </PaginationItem>

                                        {/* Gestione delle pagine successive, mostrale solo se non sei all'ultima */}
                                        {currentPage < totalPages && (
                                            <PaginationItem>
                                                <PaginationLink onClick={() => changePage(currentPage + 1)}>
                                                    {currentPage + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        {/* Ellissi per indicare più pagine */}
                                        {currentPage < totalPages - 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}

                                        {/* Link all'ultima pagina */}
                                        {currentPage < totalPages && (
                                            <PaginationItem>
                                                <PaginationLink onClick={() => changePage(totalPages)}>
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        {/* Bottone per andare alla pagina successiva */}
                                        <PaginationItem>
                                            <PaginationNext isActive={currentPage === totalPages} onClick={nextPage} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </>
                    ) : (
                        <p>No movies available</p>
                    )
                )}
            </section>
        </div>
    )
}
