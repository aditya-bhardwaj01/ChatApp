import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light'
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeMode: (state) => {
            state.mode = (state.mode === 'light' ? 'dark' : 'light');
        }
    }
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;