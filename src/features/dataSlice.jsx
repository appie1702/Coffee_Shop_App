import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const initialState = {
  beansList: BeansData,
  coffeeList: CoffeeData,
  cartPrice: 0,
  FavoritesList: [],
  CartList: [],
  OrderHistoryList: [],
  isLoading: false,
  isError: null,
};

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers(builder) {},
});

export default dataSlice.reducer;

export const getCategoriesFromCoffeeData = state => {
  let temp = {};
  for (const singleData of state.data.coffeeList) {
    if (!temp[singleData.name]) {
      temp[singleData.name] = 1;
    } else {
      temp[singleData.name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};
