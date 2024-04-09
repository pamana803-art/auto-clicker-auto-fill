import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FirebaseFirestoreService } from '@dhruv-techapps/acf-service';
import { Product, Subscription } from '@invertase/firestore-stripe-payments';
import { logout } from '../app.slice';

type SubscribeStore = { visible: boolean; subscriptions?: Subscription[]; error?: string; products?: Product[]; isSubscribing: boolean };

const initialState: SubscribeStore = {
  visible: false,
  isSubscribing: false,
};

export const getProducts = createAsyncThunk('firebase/getProducts', async () => {
  const result = await FirebaseFirestoreService.getProducts(window.EXTENSION_ID);
  return result;
});

export const getSubscription = createAsyncThunk('firebase/getSubscription', async (_, thunkAPI) => {
  const subscription = await FirebaseFirestoreService.getSubscriptions(window.EXTENSION_ID);
  if (!subscription) {
    thunkAPI.dispatch(getProducts());
  }
  return subscription;
});

export const subscribe = createAsyncThunk('firebase/subscribe', async (priceId: string) => {
  const result = await FirebaseFirestoreService.subscribe(window.EXTENSION_ID, priceId);
  return result;
});

const slice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {
    switchSubscribeModal: (state) => {
      window.dataLayer.push({ event: 'modal', name: 'subscribe', visibility: !state.visible });
      state.visible = !state.visible;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      delete state.subscriptions;
    });
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
    });
    builder.addCase(getSubscription.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(subscribe.pending, (state) => {
      state.isSubscribing = true;
    });
    builder.addCase(subscribe.rejected, (state, action) => {
      state.isSubscribing = false;
      state.error = action.error.message;
    });
  },
});

export const { switchSubscribeModal } = slice.actions;

export const subscribeSelector = (state: RootState) => state.subscribe;

export const subscribeReducer = slice.reducer;
