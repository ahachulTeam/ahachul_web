import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchStore } from 'types';

const initialState: ISearchStore = {
  showModal: false,
  keyword: null,
  history: null,
};

const {
  reducer,
  actions: { showModal, hideModal, setKeyword, setHistory },
} = createSlice({
  name: 'search',
  initialState,
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.keyword = null;
      state.showModal = false;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
  },
});

export { initialState, showModal, hideModal, setKeyword, setHistory };
export default reducer;
