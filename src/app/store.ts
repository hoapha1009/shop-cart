import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/couterSlice';
import userReducer from '../features/Auth/userSlice';

const rootReducer = {
    counter: counterReducer,
    user: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
