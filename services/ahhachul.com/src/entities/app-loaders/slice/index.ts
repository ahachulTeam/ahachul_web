import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingStore {
  active: boolean;
  opacity?: number;
}

const initialState: LoadingStore = {
  active: false,
  opacity: 0.5,
};

const {
  reducer,
  actions: { loaded, loading },
} = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<LoadingStore>) => {
      state.opacity = action?.payload?.opacity ?? 0.5;
      state.active = true;
    },
    loaded: (state) => {
      state.opacity = 0.5;
      state.active = false;
    },
  },
});

export { initialState, loaded, loading };
export default reducer;
