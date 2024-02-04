import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();

const PrerenderedBlurView = () => {
  return (
    <BlurView overlayColor="" blurAmount={15} style={styles.blurViewStyles} />
  );
};

const PrerenderedHomeCustomIcom = ({focused, color, size}) => {
  return (
    <CustomIcon
      name="home"
      size={25}
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
    />
  );
};

const PrerenderedCartCustomIcom = ({focused, color, size}) => {
  return (
    <CustomIcon
      name="cart"
      size={25}
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
    />
  );
};

const PrerenderedFavoritesCustomIcom = ({focused, color, size}) => {
  return (
    <CustomIcon
      name="like"
      size={25}
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
    />
  );
};

const PrerenderedHistoryCustomIcom = ({focused, color, size}) => {
  return (
    <CustomIcon
      name="bell"
      size={25}
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
    />
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: PrerenderedBlurView,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: PrerenderedHomeCustomIcom,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: PrerenderedCartCustomIcom,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: PrerenderedFavoritesCustomIcom,
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: PrerenderedHistoryCustomIcom,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
export default TabNavigator;
