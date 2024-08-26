import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from 'entities/app-authentications';
import { loadingReducer } from 'entities/app-loaders';

const persistConfig = {
  key: process.env.REACT_APP_NAME as string,
  storage,
  whitelist: ['auth'],
};

const reducers = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
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

export { store, persistor };
