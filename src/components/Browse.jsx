
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import SecondaryContainer from './SecondaryContainer';
import MainContainer from './MainContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const Browse = () => {

    console.log("browse render")


    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();




    const toggleGpt = useSelector(state => state.gpt.showGptSearch)

    return (
        <div className='oveflow-x-hidden'>
            <Header />
            {toggleGpt ? <GptSearch /> : <><MainContainer />
                <SecondaryContainer /></>}

        </div>
    )
}

export default Browse
