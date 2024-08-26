import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthStore } from './model';

const initialState: IAuthStore = {
  auth: null,
};

const {
  reducer,
  actions: { setToken },
} = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IAuthStore['auth']>) => {
      state.auth = action.payload;
    },
  },
});

export { initialState, setToken };
export default reducer;
