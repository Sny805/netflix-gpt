import React, { useState } from 'react'
import Header from './Header';
import { BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignForm] = useState(true)

    const toggleSignInForm = () => {
        setIsSignForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className='absolute inset-0'>
                <img src={BG_URL} alt="bgimg" />
            </div>
            <form className='bg-black p-12  absolute my-36 mx-auto right-0 left-0 w-3/12 text-white rounded-md bg-opacity-80'>
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder='Full Name' className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none' />
                }

                <input type="text" placeholder='Email Address' className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none' />
                <input type="password" placeholder='Password' className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none' />
                <button className='p-2 my-4 bg-red-700 w-full rounded-md'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4'>{isSignInForm ? "New to Netflix?" : "Already registered?"} <span onClick={toggleSignInForm} className='font-bold cursor-pointer border-b-2 border-transparent hover:border-white'>{isSignInForm ? "Sign Up Now" : "Sign In"}</span> </p>

            </form>
        </div>
    )
}

export default Login
