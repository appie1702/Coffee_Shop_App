import {
  Modal,
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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetState,
  setUserLoading,
  setUserConnected,
} from '../features/userSlice';
import {ThunkDispatch} from '@reduxjs/toolkit';

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
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userData = useSelector((state: any) => state.user.userData);
  const [searchText, setsearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const revokeAccess = async () => {
    dispatch(setUserLoading());
    try {
      await GoogleSignin.revokeAccess();
      dispatch(resetState());
    } catch (error) {
      dispatch(setUserConnected({userConnected: true}));
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}>
        <View style={styles.CenteredView}>
          <View style={styles.ModalView}>
            <View style={styles.InnerModalView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}
                style={styles.ModalCloseButton}>
                <Text style={styles.ModalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.InnerModalView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  revokeAccess();
                  setModalVisible(false);
                }}
                style={styles.LogoutButton}>
                <Text style={styles.LogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

        <ProfilePic
          source={userData?.photoURL}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </>
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
  CenteredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  ModalView: {
    width: '75%',
    height: '15%',
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_10,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
  },
  InnerModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  LogoutButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_4,
    paddingHorizontal: SPACING.space_10,
    width: '100%',
  },
  ModalCloseButton: {
    backgroundColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_4,
    paddingHorizontal: SPACING.space_10,
    width: '100%',
  },
  LogoutText: {
    letterSpacing: 6,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
  ModalCloseText: {
    letterSpacing: 6,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
});

export default HeaderBar;
