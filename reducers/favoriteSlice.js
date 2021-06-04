import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [],
};

const favoriteSlice = createSlice({
    name: 'addedFavorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((el) => el.id !== action.payload.id);
        },
        clearAllFavorites: (state) => {
            state.favorites = [];
        },
    },
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoriteSlice.actions;
export const favoriteList = (state) => state.favorites.favorites;
export default favoriteSlice.reducer;
