import React from 'react'
import GptMovieSuggetions from './GptMovieSuggetions';
import GptSearchBar from './GptSearchBar';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
    return (
        <>
            <div className='fixed inset-0 -z-10'>
                <img src={BG_URL} alt="bgimg" className='h-screen object-cover md:w-full' />
            </div>
            <div>
                <GptSearchBar />
                <GptMovieSuggetions />
            </div>
        </>
    )
}

export default GptSearch
