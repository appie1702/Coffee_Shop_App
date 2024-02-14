import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {addToFavorites, deleteFromFavorites} from '../features/dataSlice';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({navigation}: any) => {
  const favoritesList = useSelector((state: any) => state.data.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const toggleFavorite = (favorite: boolean, type: string, id: string) => {
    if (favorite) {
      dispatch(deleteFromFavorites({type, id}));
    } else {
      dispatch(addToFavorites({type, id}));
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar
          searchCoffee={() => {}}
          clearSearch={() => {}}
          headerTitle="Favorites"
        />
        <View style={styles.ScrollViewInnerContainer}>
          {favoritesList?.length === 0 ? (
            <EmptyListAnimation title="No Favorites" />
          ) : (
            <View
              style={[styles.ListItemContainer, {marginBottom: tabBarHeight}]}>
              {favoritesList?.map((item: any) => (
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
                  <FavoritesItemCard
                    id={item.id}
                    imagelink_portrait={item.imagelink_portrait}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    type={item.type}
                    ingredients={item.ingredients}
                    average_rating={item.average_rating}
                    ratings_count={item.ratings_count}
                    roasted={item.roasted}
                    description={item.description}
                    favorite={item.favorite}
                    toggleFavorite={toggleFavorite}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
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
    padding: SPACING.space_15,
    justifyContent: 'space-between',
  },
  ScrollViewInnerContainer: {
    flexGrow: 1,
    paddingTop: SPACING.space_15,
  },

  ListItemContainer: {
    gap: SPACING.space_15,
  },
});
export default FavoritesScreen;
