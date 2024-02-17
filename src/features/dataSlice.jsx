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
    addToCart: (state, action) => {
      const {itemToAdd} = action.payload;
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === itemToAdd.id) {
          found = true;
          let size = false;
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === itemToAdd.prices[0].size) {
              size = true;
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
          if (size === false) {
            state.CartList[i].prices.push(itemToAdd.prices[0]);
          }
          state.CartList[i].prices.sort((a, b) => {
            if (a.size > b.size) {
              return -1;
            }
            if (a.size < b.size) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      if (found === false) {
        state.CartList.push(itemToAdd);
      }
    },

    calculateCartPrice: state => {
      let totalPrice = 0;

      const updatedCartList = [];
      for (const cartItem of state.CartList) {
        let tempPrice = 0;
        for (const price of cartItem.prices) {
          tempPrice = tempPrice + parseFloat(price.price) * price.quantity;
        }
        let updatedCartItem = {
          ...cartItem,
          itemPrice: tempPrice.toFixed(2).toString(),
        };
        // cartItem.itemPrice = tempPrice.toFixed(2).toString();
        totalPrice = totalPrice + tempPrice;
        updatedCartList.push(updatedCartItem);
      }
      return {
        ...state,
        CartList: updatedCartList,
        cartPrice: totalPrice.toFixed(2).toString(),
      };
    },

    addToFavorites: (state, action) => {
      const {type, id} = action.payload;

      if (type === 'Coffee') {
        for (let i = 0; i < state.coffeeList.length; i++) {
          if (state.coffeeList[i].id === id) {
            if (state.coffeeList[i].favorite === false) {
              state.coffeeList[i].favorite = true;
              state.FavoritesList.unshift(state.coffeeList[i]);
            } else {
              state.coffeeList[i].favorite = false;
            }
            break;
          }
        }
      } else if (type === 'Bean') {
        for (let i = 0; i < state.beansList.length; i++) {
          if (state.beansList[i].id === id) {
            if (state.beansList[i].favorite === false) {
              state.beansList[i].favorite = true;
              state.FavoritesList.unshift(state.beansList[i]);
            } else {
              state.beansList[i].favorite = false;
            }
            break;
          }
        }
      }
    },

    deleteFromFavorites: (state, action) => {
      const {type, id} = action.payload;

      if (type === 'Coffee') {
        for (let i = 0; i < state.coffeeList.length; i++) {
          if (state.coffeeList[i].id === id) {
            if (state.coffeeList[i].favorite === true) {
              state.coffeeList[i].favorite = false;
            } else {
              state.coffeeList[i].favorite = true;
            }
            break;
          }
        }
      } else if (type === 'Beans') {
        for (let i = 0; i < state.beansList.length; i++) {
          if (state.beansList[i].id === id) {
            if (state.beansList[i].favorite === true) {
              state.beansList[i].favorite = false;
            } else {
              state.beansList[i].favorite = true;
            }
            break;
          }
        }
      }
      let spliceIndex = -1;
      for (let i = 0; i < state.FavoritesList.length; i++) {
        if (state.FavoritesList[i].id === id) {
          spliceIndex = i;
          break;
        }
      }
      state.FavoritesList.splice(spliceIndex, 1);
    },
    incrementCartItemQuantity: (state, action) => {
      const {id, size} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === size) {
              state.CartList[i].prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    decrementCartItemQuantity: (state, action) => {
      const {id, size} = action.payload;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === id) {
          for (let j = 0; j < state.CartList[i].prices.length; j++) {
            if (state.CartList[i].prices[j].size === size) {
              if (state.CartList[i].prices.length > 1) {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList[i].prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].prices[j].quantity > 1) {
                  state.CartList[i].prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    addToOrderHistoryListFromCart: state => {
      let temp = state.CartList.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.itemPrice),
        0,
      );

      if (state.OrderHistoryList.length > 0) {
        state.OrderHistoryList.unshift({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      } else {
        state.OrderHistoryList.push({
          OrderDate:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      }
      state.CartList = [];
    },
    resetState: state => {
      state.beansList = BeansData;
      state.coffeeList = CoffeeData;
      state.cartPrice = 0;
      state.FavoritesList = [];
      state.CartList = [];
      state.OrderHistoryList = [];
      state.isLoading = false;
      state.isError = false;
    },
  },
  // extraReducers(builder) {},
});

export const {
  addToCart,
  calculateCartPrice,
  addToFavorites,
  deleteFromFavorites,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  addToOrderHistoryListFromCart,
  resetState,
} = dataSlice.actions;
export default dataSlice.reducer;
