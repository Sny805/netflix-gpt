import React from 'react'
import { useSelector } from 'react-redux';
import Movielist from './Movielist';

const GptMovieSuggetions = () => {

    const { moviesName, moviesResults } = useSelector(store => store.gpt);
    if (!moviesName) return null;

    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-70">
            {
                moviesName.map((movieName, index) => (
                    <Movielist key={movieName} title={movieName} movies={moviesResults[index]} />
                ))
            }


        </div>
    )
}

export default GptMovieSuggetions
