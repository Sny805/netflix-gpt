import React from 'react'
import Movielist from './Movielist';
import { useSelector } from 'react-redux';




const SecondaryContainer = () => {

    const movies = useSelector((state) => state.movies);

    if (!movies) {
        return (
            <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black">
                <p className="text-white text-xl font-bold">Loading...</p>
            </div>
        );
    }


    return (
        <div className='bg-black overflow-y-hidden'>
            <div className='mt-0 md:-mt-52 relative pl-4 z-10 md:pl-12 overflow-y-hidden'>
                <Movielist title={"Now Playing"} movies={movies?.nowPlayingMovies} />
                <Movielist title={"Popular"} movies={movies?.popularMovies} />
                <Movielist title={"Top Rated"} movies={movies?.topRatedMovies} />
                <Movielist title={"Upcoming"} movies={movies?.upcomingMovies} />
            </div>
        </div>

    )
}

export default SecondaryContainer
