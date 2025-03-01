import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId)
    const trailerVideo = useSelector(state => state.movies?.trailerVideo)


    return (
        <div className='w-screen w-full h-auto'>
            {trailerVideo ? (<iframe
                className='w-screen aspect-video'
                src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>) : (
                <div className="flex items-center justify-center w-full h-[50vh] md:h-[70vh] lg:h-[85vh] bg-black text-white text-lg">
                    Loading trailer...
                </div>
            )}

        </div>
    )
}

export default VideoBackground
