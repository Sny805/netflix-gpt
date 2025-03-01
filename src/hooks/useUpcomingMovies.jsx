import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    const topReatedMovies = useSelector(store => store.movies.upcomingMovies)


    const getNowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results))
    }

    useEffect(() => {
        !topReatedMovies && getNowPlayingMovies();
    }, [])
}

export default useUpcomingMovies
