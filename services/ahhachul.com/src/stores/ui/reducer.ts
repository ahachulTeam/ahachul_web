import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackBarPayload, IUiStore } from 'types';

const initialState: IUiStore = {
  loading: false,
  snackBars: {
    list: [],
    posBottom: 115,
  },
};

const {
  reducer,
  actions: { loaded, loading, clearAll, addSnackBar, removeSnackBar },
} = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loaded: (state) => {
      state.loading = false;
    },
    clearAll: (state) => {
      state.loading = false;
    },
    addSnackBar: (state, action: PayloadAction<Omit<ISnackBarPayload, 'id'>>) => {
      const id = new Date().getTime().toString();
      state.snackBars = {
        posBottom: action.payload?.posBottom || 115,
        list: [{ id, ...action.payload }, ...state.snackBars.list],
      };
    },
    removeSnackBar: (state, action: PayloadAction<Pick<ISnackBarPayload, 'id'>>) => {
      const { id } = action.payload;
      state.snackBars = { ...state.snackBars, list: state.snackBars.list.filter((snackBar) => snackBar.id !== id) };
    },
  },
});

export { initialState, loaded, loading, clearAll, addSnackBar, removeSnackBar };
export default reducer;
