import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import client from '../utils/openai';

import { addGptMoviesResult } from '../utils/gptSlice';
import useSearchMovieTMDB from '../hooks/useSearchMovieTMDB';

const GptSearchBar = () => {
    const langKey = useSelector((state) => state.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    // Fetch movies from TMDB
    const { error, loading, searchMovieTMDB } = useSearchMovieTMDB();

    // Handle GPT search click
    const handleGptSearchClick = async () => {
        let query = searchText.current?.value.trim();
        if (!query) return;

        try {
            const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${query}". Only return the names of 5 movies, comma-separated. Example: Inception, Avatar, Titanic, Interstellar, The Dark Knight.`;

            const gptResults = await client.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            });

            const gptMovies = gptResults.choices?.[0]?.message?.content?.split(',').map((movie) => movie.trim()) || [];

            if (!gptMovies.length) return;

            const tmdbResults = await Promise.all(gptMovies.map((movie) => searchMovieTMDB(movie)));
            dispatch(addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults }));

        } catch (error) {
            console.error('GPT API Error:', error);
        }
    };

    return (
        <div className="pt-[45%] md:pt-[10%] flex justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-1/2 bg-black gap-4 grid grid-cols-12 p-4 rounded-md shadow-lg">
                <input
                    ref={searchText}
                    type="text"
                    className="p-3 col-span-9 rounded-md outline-none border-none bg-gray-800 text-white"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    onClick={handleGptSearchClick}
                    className="py-2 px-3  bg-red-700 text-white rounded-md col-span-3 transition hover:bg-red-800"
                >
                    {
                        loading ? "Searching..." : lang[langKey].search
                    }

                </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default GptSearchBar;
