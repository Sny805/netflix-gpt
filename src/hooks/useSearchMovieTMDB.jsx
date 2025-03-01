import React, { useState } from 'react'
import { API_OPTIONS } from '../utils/constants';

const useSearchMovieTMDB = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const searchMovieTMDB = async (movie) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
            const json = await data.json();
            return json.results || [];
        }
        catch (error) {
            console.error('TMDB API Error:', error);
            setError("Failed to fetch movies")
            return [];
        }
        finally {
            setLoading(false)
        }
    }

    return { searchMovieTMDB, loading, error }


}

export default useSearchMovieTMDB
