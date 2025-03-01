import React from 'react';
import { useParams } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { IMG_CDN } from '../utils/constants';

const MovieDetails = () => {
    const { id } = useParams();
    const { movieDetails } = useMovieDetails(id);

    if (!movieDetails) {
        return (
            <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black">
                <p className="text-white text-xl font-bold">Loading...</p>
            </div>
        );
    }



    const { title, overview, poster_path, genres, production_companies, release_date, runtime, tagline } = movieDetails;

    return (
        <div className="p-8 text-white bg-black min-h-screen flex flex-col md:flex-row gap-6">

            <div className="md:w-1/2 space-y-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                {tagline && <p className="italic text-gray-300">{tagline}</p>}
                <p className="text-gray-400">{overview}</p>


                <p><span className="font-bold">Release Date:</span> {release_date}</p>
                <p><span className="font-bold">Runtime:</span> {runtime} min</p>


                <p>
                    <span className="font-bold">Genres:</span> {genres?.map((g) => g.name).join(', ')}
                </p>


                <div>
                    <span className="font-bold">Produced by:</span>
                    <ul className="list-disc list-inside text-gray-400">
                        {production_companies?.map((company) => (
                            <li key={company.id}>{company.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Section - Movie Poster */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src={IMG_CDN + poster_path}
                    alt={title}
                    className="w-full md:max-w-sm rounded-lg shadow-lg object-cover"
                />
            </div>
        </div>
    );
};

export default MovieDetails;
