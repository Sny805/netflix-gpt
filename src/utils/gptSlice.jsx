import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSlice",
    initialState: {
        showGptSearch: false,
        moviesName: null,
        moviesResults: null

    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMoviesResult: (state, action) => {
            const { movieNames, movieResults } = action.payload
            state.moviesName = movieNames;
            state.moviesResults = movieResults;

        }
    }
})

export const { toggleGptSearchView, addGptMoviesResult } = gptSlice.actions

export default gptSlice.reducer;