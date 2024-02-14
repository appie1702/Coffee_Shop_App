import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemProps {
  id: string;
  name: string;
  roasted: string;
  prices: any;
  type: string;
  incrementQuantity: ({id, size}: {id: string; size: string}) => void;
  decrementQuantity: ({id, size}: {id: string; size: string}) => void;
  imagelink_square: ImageProps;
  special_ingredient: string;
}
const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  roasted,
  prices,
  type,
  incrementQuantity,
  decrementQuantity,
  imagelink_square,
  special_ingredient,
}) => {
  return (
    <View style={styles.Container}>
      {prices.length !== 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradient}>
          <View style={styles.Row}>
            <Image source={imagelink_square} style={styles.Image} />
            <View style={styles.Info}>
              <View>
                <Text style={styles.ItemName}>{name}</Text>
                <Text style={styles.ItemSubname}>{special_ingredient}</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          <View style={styles.SizeContainer}>
            {prices?.map((data: any, index: any) => (
              <View key={index.toString()} style={styles.SizeContainerRow}>
                <View style={styles.SizeRowValueContainer}>
                  <View style={styles.SizeBox}>
                    <Text
                      style={[
                        styles.SizeText,
                        {
                          fontSize:
                            type === 'Bean'
                              ? FONTSIZE.size_12
                              : FONTSIZE.size_16,
                        },
                      ]}>
                      {data.size}
                    </Text>
                  </View>
                  <Text style={styles.SizeCurrency}>
                    {data.currency}{' '}
                    <Text style={styles.SizePrice}>{data.price}</Text>
                  </Text>
                </View>
                <View style={styles.SizeRowValueContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      decrementQuantity({id, size: data.size});
                    }}
                    style={styles.Icon}>
                    <CustomIcon
                      name="minus"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                  <View style={styles.QuantityContainer}>
                    <Text style={styles.QuantityContainerText}>
                      {data.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      incrementQuantity({id, size: data.size});
                    }}
                    style={styles.Icon}>
                    <CustomIcon
                      name="add"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.SingleLinearGradient}>
          <View>
            <Image source={imagelink_square} style={styles.SingleImage} />
          </View>
          <View style={styles.SingleInfoContainer}>
            <View>
              <Text style={styles.ItemName}>{name}</Text>
              <Text style={styles.ItemSubname}>{special_ingredient}</Text>
            </View>
            <View style={styles.SingleValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                    },
                  ]}>
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0].currency}{' '}
                <Text style={styles.SizePrice}>{prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.SizeContainerRow}>
              <View style={styles.SizeRowValueContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    decrementQuantity({id, size: prices[0]?.size});
                  }}
                  style={styles.Icon}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.QuantityContainer}>
                  <Text style={styles.QuantityContainerText}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    incrementQuantity({id, size: prices[0]?.size});
                  }}
                  style={styles.Icon}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {},
  LinearGradient: {
    flex: 1,
    gap: SPACING.space_10,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
  },
  Image: {height: 110, width: 110, borderRadius: BORDERRADIUS.radius_8},
  Row: {flexDirection: 'row', flex: 1, gap: SPACING.space_12},
  Info: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ItemName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  ItemSubname: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
  RoastedContainer: {
    height: 35,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  SizeContainer: {
    flex: 1,
    gap: SPACING.space_10,
  },
  SizeContainerRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  SizeRowValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    height: 30,
    width: 60,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  Icon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
  },
  QuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_8,
    borderWidth: 1.5,
    borderColor: COLORS.primaryOrangeHex,
    width: 55,
    alignItems: 'center',
    // paddingVertical: SPACING.space_2,
  },
  QuantityContainerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  SingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,
  },
  SingleImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_8,
  },
  SingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  SingleValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default CartItem;
