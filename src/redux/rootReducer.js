import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './User/user.reducer';
// import loopReducer from './Loop/loop.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['bookmarks'],
};

export default combineReducers({
  user: persistReducer(persistConfig, userReducer),
  //   loop: loopReducer,
});
