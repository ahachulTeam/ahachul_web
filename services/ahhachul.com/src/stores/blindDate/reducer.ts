import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlindDateViewType, IBlindDate } from 'types';

const initialState: IBlindDate = {
  userAcceptedUsingBlindDate: false,
  activeView: 'BLIND',
};

const {
  reducer,
  actions: { setAcceptUsingBlindDate, setRejectUsingBlindDate, setBlindDateView },
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
  },
});

export { initialState, setAcceptUsingBlindDate, setRejectUsingBlindDate, setBlindDateView };
export default reducer;
