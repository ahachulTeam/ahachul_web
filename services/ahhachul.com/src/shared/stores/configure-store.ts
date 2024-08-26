import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { uiReducer } from 'stores';
import { authReducer } from 'features/app-authentications';

const persistConfig = {
  key: process.env.REACT_APP_NAME as string,
  storage,
  whitelist: ['auth', 'blindDate'],
};

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
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
