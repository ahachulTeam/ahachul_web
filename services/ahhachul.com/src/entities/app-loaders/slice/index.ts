import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingStore {
  active: boolean;
  opacity?: number;
}

const defaultOpacity = 0.4;
const initialState: LoadingStore = {
  active: false,
  opacity: defaultOpacity,
};

const {
  reducer,
  actions: { loaded, loading },
} = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<LoadingStore>) => {
      state.active = true;
      if (action?.payload?.opacity) {
        state.opacity = action.payload.opacity;
      }
    },
    loaded: (state) => {
      state.opacity = defaultOpacity;
      state.active = false;
    },
  },
});

export { initialState, loaded, loading };
export default reducer;
