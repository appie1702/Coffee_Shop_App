import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import OrderItemCard from './OrderItemCard';
interface OrderHistoryCardProps {
  navigationHandler: ({id, type, index}: any) => void;
  orderDate: string;
  cartListPrice: string;
  CartList: any;
}
const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  orderDate,
  cartListPrice,
  CartList,
}) => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubtitle}>{orderDate}</Text>
        </View>
        <View style={styles.PriceContainer}>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderPrice}>$ {cartListPrice}</Text>
        </View>
      </View>

      <View style={styles.ListContainer}>
        {CartList.map((item: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + item.id}
            activeOpacity={0.7}
            onPress={() =>
              navigationHandler({
                index: item.index,
                id: item.id,
                type: item.type,
              })
            }>
            <OrderItemCard
              type={item.type}
              name={item.name}
              imagelink_square={item.imagelink_square}
              special_ingredient={item.special_ingredient}
              prices={item.prices}
              itemPrice={item.itemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    gap: SPACING.space_10,
  },
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  HeaderSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  PriceContainer: {
    alignItems: 'flex-end',
  },
  HeaderPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  ListContainer: {
    gap: SPACING.space_15,
  },
});
export default OrderHistoryCard;
