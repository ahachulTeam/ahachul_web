import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILostStore, LostType } from 'types';

const initialState: ILostStore = {
  activeTab: 'LOST',
};

const {
  reducer,
  actions: { setTab },
} = createSlice({
  name: 'lost',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<LostType>) => {
      state.activeTab = action.payload;
    },
  },
});

export { initialState, setTab };
export default reducer;
