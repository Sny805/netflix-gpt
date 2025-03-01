import React from 'react';
import { Play } from 'lucide-react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="absolute w-full aspect-video pt-[25%] sm:pt-[20%] px-4 sm:px-8 md:px-16 text-white bg-gradient-to-r from-black">

            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">{title}</h1>


            <p className="hidden sm:inline-block w-full sm:w-3/4 md:w-1/3 py-4 text-sm sm:text-lg">
                {overview}
            </p>


            <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
                <button className="bg-white text-black flex items-center gap-2 text-xs sm:text-sm md:text-lg py-1 sm:py-2 px-3 sm:px-8 rounded-lg hover:bg-opacity-80">
                    <Play size={20} color="black" /> Play
                </button>
                <button className="hidden sm:inline-block bg-gray-300 text-white text-xs sm:text-sm md:text-lg py-1 sm:py-2 px-6 sm:px-10 font-bold bg-opacity-50 rounded-md hover:bg-opacity-70">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
