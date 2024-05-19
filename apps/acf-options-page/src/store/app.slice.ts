import { ManifestService } from '@dhruv-techapps/core-service';
import { FirebaseOauthService } from '@dhruv-techapps/firebase-oauth';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { NO_EXTENSION_ERROR } from '../constants';
import { RootState } from '../store';

export const getManifest = createAsyncThunk('app/getManifest', async () => {
  if (window.chrome?.runtime) {
    const manifest = await ManifestService.values(window.EXTENSION_ID, ['name', 'version']);
    return manifest;
  }
  throw new Error(NO_EXTENSION_ERROR[0]);
});

export const isLogin = createAsyncThunk('firebase/isLogin', async () => {
  const user = await FirebaseOauthService.isLogin(window.EXTENSION_ID);
  return user;
});

export const login = createAsyncThunk('firebase/login', async () => {
  const user = await FirebaseOauthService.login(window.EXTENSION_ID);
  return user;
});

export const signInWithEmailAndPassword = createAsyncThunk('firebase/loginWithEmailAndPassword', async () => {
  const user = await FirebaseOauthService.signInWithEmailAndPassword(window.EXTENSION_ID, 'dharmesh.hemaram@gmail.com', 'Dharmesh!2210');
  return user;
});

export const logout = createAsyncThunk('firebase/logout', async () => {
  const result = await FirebaseOauthService.logout(window.EXTENSION_ID);
  return result;
});

type AppStore = {
  manifest?: Partial<chrome.runtime.Manifest>;
  error?: string;
  loading: boolean;
  user?: User | null;
  extensionNotFound: boolean;
  loginModal: boolean;
  isLoginLoading: boolean;
};

const initialState: AppStore = {
  loading: true,
  loginModal: false,
  isLoginLoading: false,
  extensionNotFound: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setManifest: (state, action) => {
      state.manifest = action.payload;
      state.loading = false;
    },
    setAppError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    switchExtensionNotFound: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      window.dataLayer.push({ event: 'modal', name: 'extension_not_found', visibility: !state.extensionNotFound });
      state.extensionNotFound = !state.extensionNotFound;
      if (action.payload) {
        state.error = action.payload;
      }
    },
    switchLogin: (state) => {
      state.loading = false;
      window.dataLayer.push({ event: 'modal', name: 'login', visibility: !state.loginModal });
      state.loginModal = !state.loginModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManifest.fulfilled, (state, action) => {
      state.manifest = action.payload;
      state.loading = false;
    });
    builder.addCase(getManifest.rejected, (state, action) => {
      state.loading = false;
      const error = action.error.message;
      if (error) {
        state.error = error;
        if (NO_EXTENSION_ERROR.includes(error)) {
          window.dataLayer.push({ event: 'modal', name: 'extension_not_found', visibility: !state.extensionNotFound });
          state.extensionNotFound = !state.extensionNotFound;
        }
      }
    });
    builder.addCase(isLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(isLogin.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoginLoading = false;
      state.loginModal = false;
    });
    builder.addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoginLoading = false;
      state.loginModal = false;
    });
    builder.addCase(signInWithEmailAndPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoginLoading = false;
      state.loginModal = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoginLoading = false;
      state.loginModal = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      delete state.user;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { switchExtensionNotFound, switchLogin, setAppError, setManifest } = slice.actions;

export const appSelector = (state: RootState) => state.app;

export default slice.reducer;
