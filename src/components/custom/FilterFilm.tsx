import { getMovieGenres, getMovieSpecificGenres } from "@/lib/api";
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
import { useDispatch } from "react-redux";
import { addFilms } from "@/stores/movie/movieSlice";
import { useLocation } from "react-router-dom";

export default function FilterFilm() {
    const dispatch = useDispatch();
    const location = useLocation(); // Per monitorare il cambio di path

    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined); // Cambiato a undefined

    const fetchMovieGenres = async () => {
        try {
            const response = await getMovieGenres();
            setGenres(response.genres);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMovieSpecificGenres = async (genreId: string) => {
        try {
            const response = await getMovieSpecificGenres(genreId);
            dispatch(addFilms(response.results));
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre); // Imposta il valore selezionato
        fetchMovieSpecificGenres(genre); // Chiama l'API per ottenere i film del genere selezionato
    };

    // Resetta il valore della select quando cambia il path
    useEffect(() => {
        setSelectedGenre(undefined); // Resetta lo stato della select
    }, [location.pathname]);

    useEffect(() => {
        fetchMovieGenres();
    }, []);

    return (
        <div className="flex items-center gap-5">
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
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
        </div>
    );
}
