import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CoffeeCard from '../components/CoffeeCard';
import {useDebouncedCallback} from 'use-debounce';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {addToCart, calculateCartPrice} from '../features/dataSlice';
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export const getCategoriesFromCoffeeData = (data: any) => {
  let temp: any = {};
  for (const singleData of data) {
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

export const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

const HomeScreen = ({navigation}: any) => {
  const listRef: any = useRef<FlatList>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const {coffeeList, beansList} = useSelector((state: any) => state.data);
  const [cat, setcat] = useState(getCategoriesFromCoffeeData(coffeeList));
  const [catIndex, setcatIndex] = useState({
    index: 0,
    cat: cat[0],
  });
  const [sortedCoffee, setsortedCoffee] = useState(
    getCoffeeList(catIndex.cat, coffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = useDebouncedCallback((search: string) => {
    if (search !== '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
        behavior: 'smooth',
      });
      setcatIndex({index: 0, cat: cat[0]});
      setsortedCoffee([
        ...coffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    } else {
      setcatIndex({index: 0, cat: cat[0]});
      setsortedCoffee([...coffeeList]);
    }
  }, 300);

  const clearSearch = useDebouncedCallback(() => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
      behavior: 'smooth',
    });
    setcatIndex({index: 0, cat: cat[0]});
    setsortedCoffee([...coffeeList]);
  }, 300);

  const CardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    // dispatch(resetState({}));
    dispatch(
      addToCart({
        itemToAdd: {
          id,
          index,
          name,
          roasted,
          imagelink_square,
          special_ingredient,
          type,
          prices,
        },
      }),
    );
    dispatch(calculateCartPrice({}));
    ToastAndroid.showWithGravity(
      `${name} is added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View
      style={{
        ...styles.ScreenContainer,
        width: dimensions.screen.width,
      }}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex}
        keyboardShouldPersistTaps="handled">
        <HeaderBar searchCoffee={searchCoffee} clearSearch={clearSearch} />
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {cat?.map((data, i) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                listRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0,
                  behavior: 'smooth',
                });
                setcatIndex({index: i, cat: cat[i]});
                setsortedCoffee(getCoffeeList(cat[i], coffeeList));
              }}
              key={i}>
              <View style={styles.CategoryViewTextContainer}>
                <Text
                  style={[
                    styles.CategoryText,
                    catIndex.index === i
                      ? {color: COLORS.primaryOrangeHex}
                      : {color: COLORS.primaryLightGreyHex},
                  ]}>
                  {data}
                </Text>
              </View>
              {catIndex.index === i ? (
                <View style={styles.ActiveCategory} />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          ref={listRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CoffeeBeansTitle}>
                No results for searched coffee!
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  })
                }>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  avg_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beansList}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  })
                }>
                <CoffeeCard
                  name={item.name}
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  avg_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: SPACING.space_15,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    paddingLeft: SPACING.space_16,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_15,
    paddingTop: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryViewTextContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: '100%',
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_12,
  },
  EmptyListContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 2.4,
    paddingHorizontal: SPACING.space_15,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_15,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
