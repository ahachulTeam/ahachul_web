import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type IToken } from 'features/app-authentications/model';

interface IAuthStore {
  auth: IToken | null;
}

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
