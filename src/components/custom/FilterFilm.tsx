import { getMovieGenres, getMovieSpecificGenres } from "@/lib/api"
import { useEffect, useState } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Genre } from "@/types"
import { useDispatch } from "react-redux"
import { addFilms } from "@/stores/movie/movieSlice"

export default function FilterFilm() {
    const dispatch = useDispatch();


    const [genres, setGenres] = useState<Genre[]>([])
    const fetchMovieGenres = async () => {
        try {
            const response = await getMovieGenres()
            setGenres(response.genres)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMovieSpecificGenres = async (genreId: string) => {
        try {
            const response = await getMovieSpecificGenres(genreId);
            console.log(response.results);
            dispatch(addFilms(response.results));
        } catch (error) {
            console.log(error)
        }
    }

    const handleGenreChange = (genre: string) => {
        fetchMovieSpecificGenres(genre)
    }

    useEffect(() => {
        fetchMovieGenres()
    }, [])


    return (
        <div className="flex items-center gap-5">
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
        </div>
    )
}
