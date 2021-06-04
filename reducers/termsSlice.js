import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerms: [],
};

const termsSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        updateSearchTerms: (state, action) => {
            state.searchTerms.push(action.payload);
        },
        resetTermsArray: (state) => {
            state.searchTerms.splice(0, 1);
        },
    },
});

export const { updateSearchTerms, resetTermsArray } = termsSlice.actions;
export const searchTermHistory = (state) => state.terms.searchTerms;
export default termsSlice.reducer;
