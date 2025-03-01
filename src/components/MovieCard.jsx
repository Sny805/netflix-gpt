import React from 'react';
import { IMG_CDN } from '../utils/constants';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    if (!movie.poster_path) return null;  // Ensure it doesn't break if no image

    return (
        <div className='w-36 md:w-48 pr-4 cursor-pointer transition-transform transform hover:scale-110 duration-300 ease-in-out'>
            <Link to={`/movie-details/${movie.id}`}>
                <img src={IMG_CDN + movie.poster_path} alt="Movie Poster" className="rounded-lg shadow-lg" />
            </Link>
        </div>
    );
};

export default MovieCard;
