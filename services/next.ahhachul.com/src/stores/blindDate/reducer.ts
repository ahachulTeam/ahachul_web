import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlindDateViewType, IBlindDate } from '@/src/types';

const initialState: IBlindDate = {
  userAcceptedUsingBlindDate: false,
  activeView: 'BLIND',
  showNavbar: true,
};

const {
  reducer,
  actions: { setAcceptUsingBlindDate, setRejectUsingBlindDate, setBlindDateView, showNavbar, hideNavbar },
} = createSlice({
  name: 'blindDate',
  initialState,
  reducers: {
    setAcceptUsingBlindDate: (state) => {
      state.userAcceptedUsingBlindDate = true;
    },
    setRejectUsingBlindDate: (state) => {
      state.userAcceptedUsingBlindDate = false;
    },
    setBlindDateView: (state, action: PayloadAction<BlindDateViewType>) => {
      state.activeView = action.payload;
    },
    showNavbar: (state) => {
      state.showNavbar = true;
    },
    hideNavbar: (state) => {
      state.showNavbar = false;
    },
  },
});

export { initialState, setAcceptUsingBlindDate, setRejectUsingBlindDate, setBlindDateView, showNavbar, hideNavbar };
export default reducer;
