import { createSlice } from "@reduxjs/toolkit";

export const helperSlice = createSlice({
    name: "helper",
    initialState: {
        filterModalOpen: false, // mobile screen filter sidebar
        navModalOpen : false  // navbar modal
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
        },

        // navbar modal 
        closeNavModal:(state, action) => {
            state.navModalOpen = false
        },
        openNavModal:(state, action) => {
            state.navModalOpen = true
        },
       toggleNavModal:(state, action) => {
            state.navModalOpen = !state.navModalOpen
        }
    }
})

export const { openFilter, closeFilter, toggleFilter, closeNavModal, openNavModal,toggleNavModal } = helperSlice.actions;
export default helperSlice.reducer;