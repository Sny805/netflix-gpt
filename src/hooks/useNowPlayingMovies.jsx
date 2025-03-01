

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(state => state.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/now_playing?page=1",
                API_OPTIONS
            );
            const json = await response.json();
            dispatch(addNowPlayingMovies(json.results));
        } catch (error) {
            console.error("Error fetching now playing movies:", error);
        }
    }


    useEffect(() => {
        if (!nowPlayingMovies?.length) {
            getNowPlayingMovies();
        }

    }, [nowPlayingMovies, dispatch])
}

export default useNowPlayingMovies
