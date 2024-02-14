import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import CustomIcon from './CustomIcon';

interface HeaderBarProps {
  searchCoffee: (search: string) => void;
  clearSearch: () => void;
  headerTitle?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  searchCoffee,
  clearSearch,
  headerTitle,
}) => {
  const [searchText, setsearchText] = useState('');

  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      {headerTitle ? (
        <View style={styles.HaderTextContainer}>
          <Text style={styles.HeaderText}>{headerTitle}</Text>
        </View>
      ) : (
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              searchCoffee(searchText);
            }}
            style={styles.InputIcon}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText?.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            textAlignVertical={'center'}
            placeholder="Search Coffee..."
            value={searchText}
            onChangeText={text => {
              setsearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setsearchText('');
                clearSearch();
              }}
              style={styles.CloseIcon}>
              <CustomIcon
                name={'close'}
                size={FONTSIZE.size_10}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      )}

      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    paddingHorizontal: SPACING.space_15,
    paddingBottom: SPACING.space_10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  HaderTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.space_10,
  },
  InputContainerComponent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_8,

    width: '100%',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_10,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 2,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    padding: 0,
  },
  CloseIcon: {marginHorizontal: SPACING.space_12},
});

export default HeaderBar;
