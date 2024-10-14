import { getMovieGenres } from "@/lib/api";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Genre } from "@/types";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setGenre } from "@/stores/movie/genreSlice";

export default function FilterFilm() {
    const dispatch = useDispatch();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const moviesGenre = useSelector((state: RootState) => state.genreMovie.genre);

    const fetchMovieGenres = async () => {
        try {
            setLoading(true);
            const response = await getMovieGenres();
            setGenres(response.genres);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    };

    const handleGenreChange = (genre: string) => {
        dispatch(setGenre(genre));
    };

    useEffect(() => {
        fetchMovieGenres();
    }, []);

    useEffect(() => {
        console.log(moviesGenre);
    }, [moviesGenre]);

    return (
        <div className="flex items-center gap-5">
            {loading ? (
                <p>Loading genres...</p>
            ) : error ? (
                <p className="text-red-500">Error loading genres</p>
            ) : (
                <Select onValueChange={handleGenreChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleziona un genere" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Generi di Film</SelectLabel>
                            {genres.map((genre) => (
                                <SelectItem key={genre.id} value={genre.id.toString()}>
                                    {genre.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </div>
    );
}
