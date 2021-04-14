import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

interface UsersState {
    current: any;
    settings: any;
}

interface userData {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
}

const initialState: UsersState = {
    current: {},
    settings: {},
};

export const register = createAsyncThunk(
    'user/register',
    // if you type your function argument here
    async (payload: userData) => {
        const data: any = await userApi.register(payload);
        //save data to local storage
        localStorage.setItem('access_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data.user;
    }
);

const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.current = action.payload;
        });
    },
});

const { reducer } = userSlice;
export default reducer;
