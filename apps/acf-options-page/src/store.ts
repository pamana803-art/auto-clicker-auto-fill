import { configureStore } from '@reduxjs/toolkit';
import appReducer from './store/app.slice';
import themeReducer from './store/theme.slice';
import toastReducer from './store/toast.slice';
import { blogReducer } from './store/blog';
import { settingsReducer, settingsListenerMiddleware } from './store/settings';
import { configReducers, configsListenerMiddleware, configsToastListenerMiddleware } from './store/config';
export const store = configureStore({
  reducer: {
    app: appReducer,
    theme: themeReducer,
    settings: settingsReducer,
    toast: toastReducer,
    blog: blogReducer,
    ...configReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(settingsListenerMiddleware.middleware, configsListenerMiddleware.middleware, configsToastListenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
