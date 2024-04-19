import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComplaintViewType, IComplaintStore } from 'types/complaints';

const initialState: IComplaintStore = {
  activeView: 'SUBMISSION',
};

const {
  reducer,
  actions: { setView },
} = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ComplaintViewType>) => {
      state.activeView = action.payload;
    },
  },
});

export { initialState, setView };
export default reducer;
