import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth';
import { communityReducer } from './community';
import { lostReducer } from './lost';
import { complaintReducer } from './complaints';
import { searchReducer } from './search';
import { uiReducer } from './ui';

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: process.env.REACT_APP_NAME as string,
  storage,
  whitelist: ['auth'],
};

const reducers = combineReducers({
  auth: authReducer,
  search: searchReducer,
  ui: uiReducer,
  community: communityReducer,
  complaint: complaintReducer,
  lost: lostReducer,
});
const reducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor, useAppDispatch, useAppSelector };
