import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataReducer from '../features/dataSlice';
import userReducer from '../features/userSlice';

const reducers = combineReducers({
  data: dataReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['data'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);
export {store, persistor};
