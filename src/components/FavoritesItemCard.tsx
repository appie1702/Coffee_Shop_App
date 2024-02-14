import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface FavoritesItemCartProps {
  id: string;
  name: string;
  roasted: string;
  type: string;
  average_rating: number;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
  ingredients: string;
  ratings_count: string;
  description: string;
  favorite: boolean;
  toggleFavorite: any;
}
const FavoritesItemCard: React.FC<FavoritesItemCartProps> = ({
  id,
  name,
  roasted,
  type,
  average_rating,
  imagelink_portrait,
  special_ingredient,
  ingredients,
  ratings_count,
  description,
  favorite,
  toggleFavorite,
}) => {
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        enableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favorite={favorite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        toggleFavorite={toggleFavorite}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_15,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
export default FavoritesItemCard;
