import React, { Suspense, useEffect, lazy } from 'react'
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import MovieDetails from './MovieDetails';


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    },
    {
        path: "/movie-details/:id",
        element: <MovieDetails />


    }

])

const Body = () => {
    return (
        <Suspense fallback={<h1>Loading</h1>}>
            <RouterProvider router={appRouter} />
        </Suspense>
    )
}

export default Body
