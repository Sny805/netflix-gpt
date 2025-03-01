import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMovieDetails = (movieid) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchMovieDetails = async (controller) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieid}`,
                { ...API_OPTIONS, signal: controller.signal }
            );
            if (!response.ok) throw new Error("Failed to fetch movie details");
            const jsondata = await response.json();
            setMovieDetails(jsondata);
        } catch (error) {
            if (error.name !== "AbortError") console.error("Error fetching movie details", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!movieid) return;
        const controller = new AbortController();
        fetchMovieDetails(controller);

        return () => controller.abort();
    }, [movieid]);

    return { movieDetails, loading };
};

export default useMovieDetails;
