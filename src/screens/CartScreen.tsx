import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import {
  calculateCartPrice,
  decrementCartItemQuantity,
  incrementCartItemQuantity,
} from '../features/dataSlice';

const CartScreen = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  let cartList = useSelector((state: any) => state.data.CartList);
  let cartPrice = useSelector((state: any) => state.data.cartPrice);

  const tabBarHeight = useBottomTabBarHeight();
  const buttonHandler = () => {
    navigation.push('Payment', {amount: cartPrice});
  };

  const incrementQuantityHandler = ({id, size}: {id: string; size: string}) => {
    dispatch(incrementCartItemQuantity({id, size}));
    dispatch(calculateCartPrice({}));
  };

  const decrementQuantityHandler = ({id, size}: {id: string; size: string}) => {
    dispatch(decrementCartItemQuantity({id, size}));
    dispatch(calculateCartPrice({}));
  };

  console.log({cartList: cartList.length, cartPrice});
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar
          searchCoffee={() => {}}
          clearSearch={() => {}}
          headerTitle="Cart"
        />
        <View style={styles.ScrollViewInnerContainer}>
          {cartList?.length === 0 ? (
            <EmptyListAnimation title="Cart is empty" />
          ) : (
            <View style={styles.ListItemContainer}>
              {cartList?.map((item: any) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.push('Details', {
                      id: item.id,
                      index: item.index,
                      type: item.type,
                    });
                  }}
                  key={item.id}>
                  <CartItem
                    id={item.id}
                    name={item.name}
                    roasted={item.roasted}
                    prices={item.prices}
                    type={item.type}
                    incrementQuantity={incrementQuantityHandler}
                    decrementQuantity={decrementQuantityHandler}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {cartList.length !== 0 ? (
          <View
            style={{
              paddingVertical: SPACING.space_15,
              marginBottom: tabBarHeight,
            }}>
            <PaymentFooter
              buttonhandler={() => {
                buttonHandler();
              }}
              buttonTitle="Pay"
              price={{price: cartPrice, currency: '$'}}
            />
          </View>
        ) : (
          <View
            style={{
              marginBottom: tabBarHeight,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    padding: SPACING.space_15,
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  ScrollViewInnerContainer: {
    flexGrow: 1,
    paddingTop: SPACING.space_15,
    // backgroundColor: 'red',
  },

  ListItemContainer: {
    paddingHorizontal: SPACING.space_10,
    gap: SPACING.space_15,
    // backgroundColor: 'yellow',
  },
});
export default CartScreen;
