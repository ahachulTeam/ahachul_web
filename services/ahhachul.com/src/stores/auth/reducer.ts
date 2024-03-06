import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthStore, SingupResponseType } from 'types';

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
    setToken: (state, action: PayloadAction<SingupResponseType | null>) => {
      state.auth = action.payload;
    },
  },
});

export { initialState, setToken };
export default reducer;
