import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const initialState = {
    data: [],
    searchResults: [],
};

const crudSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        addData: (state, action) => {
            const { text, autherName } = action.payload;
            const id = nanoid();
            state.data.push({
                id,
                text,
                autherName
            })
            toast.success(`Data added successfully`)
        },

        updateData: (state, action) => {
            const { id, newText } = action.payload;
            const existingDataIndex = state.data.findIndex(item => item.id === id);
            if (existingDataIndex !== -1) {
                state.data[existingDataIndex].text = newText;
                toast.success(`Data updated successfully`)
            }
            else {
                toast.warning('Something went wrong')
            }
        },

        deleteData: (state, action) => {
            const { id } = action.payload;
            state.data = state.data.filter(item => item.id !== id);
            toast.success(`Data deleted successfully`)
        },

        searchByAuthor: (state, action) => {
            const autherName = action.payload.toLowerCase();
            state.searchResults = state.data.filter(item => item.autherName.toLowerCase().includes(autherName));
            if (state.searchResults.length <= 0) {
                toast.info('No data found')
            }
        }
    }
})

export const { addData, updateData, deleteData, searchByAuthor } = crudSlice.actions;
export default crudSlice.reducer;