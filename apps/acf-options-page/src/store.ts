import { configureStore } from '@reduxjs/toolkit';
import configsReducer from './store/app.slice';
import addonReducer from './store/addon.slice';
import modeReducer from './store/mode.slice';
import themeReducer from './store/theme.slice';
import settingsReducer, { settingsListenerMiddleware } from './store/settings.slice';
import toastReducer from './store/toast.slice';
import blogReducer from './store/blog.slice';

export const store = configureStore({
  reducer: {
    app: configsReducer,
    addon: addonReducer,
    mode: modeReducer,
    theme: themeReducer,
    settings: settingsReducer,
    toast: toastReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(settingsListenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
