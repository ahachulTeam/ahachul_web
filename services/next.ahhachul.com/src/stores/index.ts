import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { authReducer } from './auth';
import { uiReducer } from './ui';
import { complaintReducer } from './complaints';
import { blindDateReducer } from './blindDate';
import { searchReducer } from './search';

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  search: searchReducer,
  complaint: complaintReducer,
  blindDate: blindDateReducer,
});

const store = configureStore({
  reducer: reducers,
});

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };
