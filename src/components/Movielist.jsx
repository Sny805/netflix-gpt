import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieList = ({ title, movies }) => {
    const scrollRef = useRef(null);

    // Function to scroll left
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative px-4 overflow-y-hidden">
            <h1 className="text-lg md:text-2xl py-4 text-white">{title}</h1>

            {/* Scroll Buttons */}
            <button
                className="absolute right-24 top-8 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full hidden md:block hover:bg-opacity-75 transition"
                onClick={scrollLeft}
            >
                <ChevronLeft size={24} className="text-white" />
            </button>

            <button
                className="absolute right-12 top-8 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full hidden md:block hover:bg-opacity-75 transition"
                onClick={scrollRight}
            >
                <ChevronRight size={24} className="text-white" />
            </button>

            {/* Movie List */}
            <div ref={scrollRef} className="flex overflow-x-scroll md:overflow-x-hidden scrollbar-hide scroll-smooth">
                <div className="flex space-x-4">
                    {movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
