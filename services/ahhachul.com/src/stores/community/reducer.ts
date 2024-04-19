import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunityCategoryType, ICommunityStore } from 'types';

const initialState: ICommunityStore = {
  activeTab: 'HOT',
};

const {
  reducer,
  actions: { setTab },
} = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<CommunityCategoryType>) => {
      state.activeTab = action.payload;
    },
  },
});

export { initialState, setTab };
export default reducer;
