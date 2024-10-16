import { Link, Outlet } from "react-router-dom"
import React, { Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { MovieInterface } from "./types";


// import CardMovie from "./components/custom/CardMovie";
import Navbar from "./components/custom/Navbar"
import Loader from "./components/custom/Loader";

const CardMovie = React.lazy(() => import('./components/custom/CardMovie'))

function App() {

  const [searchMovieActive, setSearchMovieActive] = useState(true);
  const movie = useSelector((state: RootState) => state.movie.searchMovies);

  useEffect(() => {
    console.log(movie);

    if (movie.length > 0) {
      setSearchMovieActive(true);
    } else {
      setSearchMovieActive(false);
    }
  }, [movie]);


  return (
    <>
      <div className="flex min-h-screen w-full flex-col ">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
          <Navbar />
        </header>
        <main >
          {searchMovieActive ?
            (
              <>
                <div className="w-full p-5 grid grid-cols-2 lg:grid-cols-6 gap-5 dark_bg">
                  {movie && movie.length > 0 && (
                    <>
                      {movie.map((movie: MovieInterface) => (
                        <Link onClick={() => setSearchMovieActive(false)} to={`/film/${movie.id}`} key={movie.id}>
                          <CardMovie lastPartOfPath={movie?.poster_path || ""} />
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </>
            )
            :
            (
              <>
                <div className={`${searchMovieActive ? "hidden" : "block"}`}>
                  <Suspense fallback={<Loader />}>
                    <Outlet />
                  </Suspense>
                </div>
              </>
            )}

        </main>
      </div>
    </>
  )
}

export default App
