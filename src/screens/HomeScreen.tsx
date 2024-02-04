import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import CustomIcon from '../components/CustomIcon';
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

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const {coffeeList, beansList} = useSelector((state: any) => state.data);
  const [cat, setcat] = useState(getCategoriesFromCoffeeData(coffeeList));
  const [searchText, setsearchText] = useState('');
  const [catIndex, setcatIndex] = useState({
    index: 0,
    cat: cat[0],
  });
  const [sortedCoffee, setsortedCoffee] = useState(
    getCoffeeList(catIndex.cat, coffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View
      style={{
        ...styles.ScreenContainer,
        width: dimensions.screen.width,
      }}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewFlex}>
        <HeaderBar />
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>
        {/*         <Categories/>
         */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {cat?.map((data, i) => (
            <TouchableOpacity
              onPress={() => {
                setcatIndex({index: i, cat: cat[i]});
                setsortedCoffee(getCoffeeList(cat[i], coffeeList));
              }}
              key={i}
              /* style={styles.CategoryViewContainer} */
            >
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
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={item => {
            return <TouchableOpacity></TouchableOpacity>;
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
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default HomeScreen;
