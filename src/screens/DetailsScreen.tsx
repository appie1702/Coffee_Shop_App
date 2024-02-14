import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {
  addToCart,
  addToFavorites,
  calculateCartPrice,
  deleteFromFavorites,
} from '../features/dataSlice';
import PaymentFooter from '../components/PaymentFooter';
import {ThunkDispatch} from '@reduxjs/toolkit';

const DetailsScreen = ({navigation, route}: any) => {
  const [fullDesc, setfullDesc] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  let coffeelist = useSelector((state: any) => state.data.coffeeList);
  let beansList = useSelector((state: any) => state.data.beansList);

  let details: any = {};
  if (route.params?.type === 'Coffee') {
    details = coffeelist[route.params?.index];
  } else {
    details = beansList[route.params?.index];
  }

  const [price, setprice] = useState<any>(details?.prices[0]);

  const backHandler = () => {
    navigation.pop();
  };

  const toggleFavorite = (favorite: boolean, type: string, id: string) => {
    if (favorite) {
      dispatch(deleteFromFavorites({type, id}));
    } else {
      dispatch(addToFavorites({type, id}));
    }
  };

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
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
          prices: [{...price, quantity: 1}],
        },
      }),
    );
    dispatch(calculateCartPrice({}));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          imagelink_portrait={details.imagelink_portrait}
          type={details.type}
          id={details.id}
          favorite={details.favorite}
          name={details.name}
          special_ingredient={details.special_ingredient}
          ingredients={details.ingredients}
          average_rating={details.average_rating}
          ratings_count={details.ratings_count}
          roasted={details.roasted}
          backHandler={backHandler}
          toggleFavorite={toggleFavorite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setfullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>{details.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setfullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {details.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {details.prices.map((data: any) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setprice(data);
                }}
                key={data.size}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        details.type === 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.PaymentFooterContainer}>
          <PaymentFooter
            price={price}
            buttonTitle="Add to Cart"
            buttonhandler={() =>
              addToCartHandler({
                id: details.id,
                index: details.index,
                name: details.name,
                roasted: details.roasted,
                imagelink_square: details.imagelink_square,
                special_ingredient: details.special_ingredient,
                type: details.type,
                price: price,
              })
            }
          />
        </View>
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
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_20,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  PaymentFooterContainer: {
    flex: 1,
    padding: SPACING.space_15,
  },
});
export default DetailsScreen;
