import { DriveFile } from '@dhruv-techapps/shared-google-drive';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { googleDriveDeleteAPI, googleDriveListWithContentAPI } from './google-drive.api';

type GoogleDriveStore = {
  files: Array<DriveFile>;
  filesLoading: boolean;
};

const initialState: GoogleDriveStore = { filesLoading: false, files: [] };

const slice = createSlice({
  name: 'googleDrive',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(googleDriveListWithContentAPI.pending, (state) => {
      state.filesLoading = true;
    });
    builder.addCase(googleDriveListWithContentAPI.fulfilled, (state, action) => {
      state.filesLoading = false;
      state.files = action.payload;
    });
    builder.addCase(googleDriveListWithContentAPI.rejected, (state) => {
      state.filesLoading = false;
    });
    builder.addCase(googleDriveDeleteAPI.fulfilled, (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload.id);
    });
  }
});

export const googleDriveSelector = (state: RootState) => state.googleDrive;
export const googleDriveReducer = slice.reducer;
