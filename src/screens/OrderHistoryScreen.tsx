import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopupAnimations from '../components/PopupAnimations';
import OrderHistoryCard from '../components/OrderHistory/OrderHistoryCard';

const OrderHistoryScreen = ({navigation, route}: any) => {
  const [showAnimation, setshowAnimation] = useState(false);
  const orderHistoryList = useSelector(
    (state: any) => state.data.OrderHistoryList,
  );
  const tabbarHeight = useBottomTabBarHeight();
  console.log({orderHistoryList: orderHistoryList[0]});

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {index, id, type});
  };

  const buttonPressHandler = () => {
    setshowAnimation(true);
    setTimeout(() => {
      setshowAnimation(false);
    }, 2000);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopupAnimations
          style={styles.LottieAnimations}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex]}>
        <HeaderBar
          searchCoffee={() => {}}
          clearSearch={() => {}}
          headerTitle="Order History"
        />
        <View style={[styles.ScrollViewInnerView]}>
          {orderHistoryList?.length === 0 ? (
            <EmptyListAnimation title="No Order History" />
          ) : (
            <View style={styles.ListItemContainer}>
              {orderHistoryList?.map((data: any, index: any) => (
                <OrderHistoryCard
                  key={index.toString()}
                  navigationHandler={navigationHandler}
                  orderDate={data.OrderDate}
                  cartListPrice={data.CartListPrice}
                  CartList={data.CartList}
                />
              ))}
            </View>
          )}
        </View>
        {orderHistoryList.length > 0 ? (
          <TouchableOpacity
            style={[styles.DownloadButton, {marginBottom: tabbarHeight}]}
            onPress={buttonPressHandler}>
            <Text style={styles.DownloadText}>Download</Text>
          </TouchableOpacity>
        ) : (
          <></>
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
  LottieAnimations: {height: 250},
  ScrollViewFlex: {
    flexGrow: 1,
    padding: SPACING.space_15,
    justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  ScrollViewInnerView: {
    flexGrow: 1,
    paddingTop: SPACING.space_15,
    // backgroundColor: 'red',
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_10,
    gap: SPACING.space_30,
    // backgroundColor: 'yellow',
  },
  DownloadButton: {
    margin: SPACING.space_10,
    marginTop: SPACING.space_24,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_32 * 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  DownloadText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});
export default OrderHistoryScreen;
