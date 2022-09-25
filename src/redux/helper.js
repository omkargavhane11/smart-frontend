import { createSlice } from "@reduxjs/toolkit";

export const helperSlice = createSlice({
    name: "helper",
    initialState: {
        filterModalOpen: false
    },
    reducers: {
        openFilter: (state, action) => {
            state.filterModalOpen = true;
        },
        closeFilter: (state, action) => {
            state.filterModalOpen = false;
        },
        toggleFilter: (state, action) => {
            state.filterModalOpen = !state.filterModalOpen
        }
    }
})

export const { openFilter, closeFilter, toggleFilter } = helperSlice.actions;
export default helperSlice.reducer;