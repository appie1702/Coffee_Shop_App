import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import PopupAnimations from '../components/PopupAnimations';
import {COLORS} from '../theme/theme';

const LoadingScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <PopupAnimations
        style={styles.LottieAnimations}
        source={require('../lottie/loading.json')}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {flex: 1, backgroundColor: COLORS.primaryBlackHex},
  LottieAnimations: {height: 200},
});
export default LoadingScreen;
