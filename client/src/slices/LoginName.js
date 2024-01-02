import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    personName: ''
}

export const nameSlice = createSlice({
    name: 'personName',
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.personName = action.payload;
        }
    }
});

export const { changeName } = nameSlice.actions;

export default nameSlice.reducer;