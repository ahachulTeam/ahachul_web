import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackBarPayload, IUiStore } from 'types';

const initialState: IUiStore = {
  loading: false,
  isOpenAlert: false,
  alertTitle: '',
  alertContent: '',
  snackBars: {
    list: [],
    posBottom: 60,
  },
};

const {
  reducer,
  actions: { loaded, loading, openAlert, closeAlert, clearAll, addSnackBar, removeSnackBar },
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
    openAlert: (state, action: PayloadAction<Pick<IUiStore, 'alertContent' | 'alertTitle'>>) => {
      state.isOpenAlert = true;
      state.alertContent = action.payload.alertContent;
      state.alertTitle = action.payload.alertTitle;
    },
    closeAlert: (state) => {
      state.isOpenAlert = false;
    },
    clearAll: (state) => {
      state.loading = false;
      state.isOpenAlert = false;
      state.alertContent = '';
    },
    addSnackBar: (state, action: PayloadAction<Omit<ISnackBarPayload, 'id'>>) => {
      const id = new Date().getTime().toString();

      state.snackBars = {
        posBottom: action.payload?.posBottom || 60,
        list: [{ id, ...action.payload }, ...state.snackBars.list],
      };
    },
    removeSnackBar: (state, action: PayloadAction<Pick<ISnackBarPayload, 'id'>>) => {
      const { id } = action.payload;

      state.snackBars = { ...state.snackBars, list: state.snackBars.list.filter((snackBar) => snackBar.id !== id) };
    },
  },
});

export { initialState, loaded, loading, openAlert, closeAlert, clearAll, addSnackBar, removeSnackBar };
export default reducer;
