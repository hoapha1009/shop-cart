import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';

interface UsersState {
    current: any;
    settings: any;
}

interface userDataRegister {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    retypePassword?: string;
}

interface userDataLogin {
    email?: string;
    password?: string;
}

const initialState: UsersState = {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER) || '{}'),
    settings: {},
};

export const register = createAsyncThunk(
    'user/register',
    // if you type your function argument here
    async (payload: userDataRegister) => {
        const data: any = await userApi.register(payload);
        //save data to local storage
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

        return data.user;
    }
);

export const login = createAsyncThunk(
    'user/login',
    // if you type your function argument here
    async (payload: userDataLogin) => {
        const data: any = await userApi.login(payload);
        //save data to local storage
        localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

        return data.user;
    }
);

const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
            state.current = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.current = action.payload;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.current = action.payload;
        });
    },
});

const { actions, reducer } = userSlice;
export const { signOut } = actions;
export default reducer;
