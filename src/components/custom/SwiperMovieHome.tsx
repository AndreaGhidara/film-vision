import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MovieInterface } from '@/types';
import { Link } from 'react-router-dom';
import CardMovie from './CardMovie';

export default function SwiperMovieHome({ movies }: { movies: MovieInterface[] }) {
    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={2}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1280: {
                        slidesPerView: 6,
                    },
                }}
            >
                {movies && movies.length > 0 ? (
                    movies.map((movie: MovieInterface, index: number) => (
                        <SwiperSlide className="w-full" key={index}>
                            <Link to={`/film/${movie.id}`}>
                                <div className="w-full flex justify-center sm:block">
                                    {movie.poster_path && <CardMovie lastPartOfPath={movie.poster_path} />}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </Swiper>
        </>
    )
}
