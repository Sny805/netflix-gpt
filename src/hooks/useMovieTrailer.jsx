import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const trailerVideos = useSelector(store => store.movies.trailerVideo)


    const getMoviesVideos = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
            const json = await data.json();
            if (!json.results || !Array.isArray(json.results) || json.results.length === 0) {
                console.error("No video results found");
                return;
            }
            const filterData = json.results?.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailerVideo(trailer));
        }
        catch (error) {
            console.error("Error fetching movie trailer :", error)
        }


    }
    useEffect(() => {
        if (movieId) {
            !trailerVideos && getMoviesVideos()
        }

    }, [movieId])
}

export default useMovieTrailer
