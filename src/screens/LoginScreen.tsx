import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {addUser, setUserConnected, setUserLoading} from '../features/userSlice';
import CustomIcon from '../components/CustomIcon';

const LoginScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const onGoogleButtonPress = async () => {
    dispatch(setUserLoading());
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'#1b1b1b'} />
      <ImageBackground
        source={require('../assets/coffee_assets/background_images/coffee2.jpg')}
        style={styles.ScrollViewFlex}
        resizeMode="cover"
        resizeMethod="resize">
        {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.LinearGradient}
          colors={[COLORS.primaryBlackRGBA, COLORS.secondaryLightGreyHex]}> */}

        <View style={styles.CoolTextContainer}>
          <Text style={styles.CoolText}>Hello!!{'\n'}Coffee Lover</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            onGoogleButtonPress()
              .then((res: any) => {
                dispatch(addUser({userData: res?.user}));
              })
              .catch(error => {
                dispatch(setUserConnected({userConnected: true}));
                console.log(error);
              })
          }
          style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Sign In With Google</Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
      </ImageBackground>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
        keyboardShouldPersistTaps="handled">
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.LinearGradient}
          colors={[COLORS.primaryBlackRGBA, COLORS.secondaryLightGreyHex]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              onGoogleButtonPress()
                .then((res: any) => {
                  dispatch(addUser({userData: res?.user}));
                })
                .catch(error => {
                  dispatch(setUserConnected({userConnected: true}));
                  console.log(error);
                })
            }
            style={styles.LoginButton}>
            <Text style={styles.InnerViewText}>Sign In With Google</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    height: '100%',
  },
  ScrollViewFlex: {
    flexGrow: 1,
    position: 'relative',
    padding: SPACING.space_10,
  },
  // LinearGradient: {
  //   height: '40%',
  //   width: '70%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: BORDERRADIUS.radius_20,
  // },
  LoginButton: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_10,
  },
  LoginButtonText: {
    letterSpacing: 4,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
  CoolText: {
    fontSize: FONTSIZE.size_36,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  CoolTextContainer: {
    position: 'absolute',
    top: 30,
    left: SPACING.space_30,
  },
});
export default LoginScreen;
