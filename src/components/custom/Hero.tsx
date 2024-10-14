import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
    const movie = useSelector((state: RootState) => state.movie.popularMovies[0]);

    return (
        <div className="w-full h-[calc(100vh-40vh)] relative">
            {movie && movie.backdrop_path && (
                <div className="w-full h-full absolute bg-black z-10">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        className="w-full h-full object-cover relative z-0"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black/30 z-20 flex flex-col justify-center items-start p-5 gap-3">
                        <span className="text-white text-4xl opacity-70">{movie.title}</span>
                        <span className="text-white text-sm opacity-70">{movie.release_date}</span>
                        <span className="text-white text-sm opacity-70 max-w-md">{movie.overview}</span>
                        <Link to={`/film/${movie.id}`}>
                            <Button>See Details</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
