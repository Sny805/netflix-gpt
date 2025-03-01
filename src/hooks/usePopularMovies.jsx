import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const popularMovies = useSelector(store => store.movies.popularMovies)

    const getPopularMovies = async () => {

        try {
            const data = await fetch('https://api.themoviedb.org/3/tv/popular?page=1', API_OPTIONS);
            const json = await data.json();
            dispatch(addPopularMovies(json.results))
        }

        catch (error) {
            console.error("Error fetch popular movies", error.message)
        }

    }

    useEffect(() => {
        if (!popularMovies?.length) {
            getPopularMovies();
        }

    }, [dispatch, popularMovies])
}

export default usePopularMovies
