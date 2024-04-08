import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackBarPayload, IUiStore } from '@/src/types';

const initialState: IUiStore = {
  loading: {
    active: false,
    opacity: 0.45,
  },
  snackBars: {
    list: [],
    posBottom: 115,
  },
};

const {
  reducer,
  actions: { loaded, loading, addSnackBar, removeSnackBar },
} = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<{ opacity: number }>) => {
      state.loading.active = true;
      state.loading.opacity = action?.payload?.opacity ?? 0.45;
    },
    loaded: (state) => {
      state.loading.active = false;
      state.loading.opacity = 0.45;
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

export { initialState, loaded, loading, addSnackBar, removeSnackBar };
export default reducer;
