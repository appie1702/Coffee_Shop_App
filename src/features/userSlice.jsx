import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const initialState = {
  userData: {},
  isUserSignedIn: 'loading',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload.userData;
    },
    setUserConnected: (state, action) => {
      state.isUserSignedIn = action.payload.userConnected;
    },
    setUserLoading: state => {
      state.isUserSignedIn = 'loading';
    },
    resetState: state => {
      state.userData = {};
    },
  },
  // extraReducers(builder) {},
});

export const {addUser, setUserConnected, setUserLoading, resetState} =
  userSlice.actions;
export default userSlice.reducer;
