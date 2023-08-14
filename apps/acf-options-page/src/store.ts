import { configureStore } from '@reduxjs/toolkit';
import configsReducer from './store/config.slice';
import addonReducer from './store/addon.slice';
import modeReducer from './store/mode.slice';
import themeReducer from './store/theme.slice';
import settingsReducer from './store/settings.slice';

export const store = configureStore({
  reducer: {
    configs: configsReducer,
    addon: addonReducer,
    mode: modeReducer,
    theme: themeReducer,
    settings: settingsReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
