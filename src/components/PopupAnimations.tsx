import {StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import LottieView from 'lottie-react-native';

interface PopupAnimationsProps {
  style: any;
  source: any;
  loop?: boolean;
}
const PopupAnimations: React.FC<PopupAnimationsProps> = ({
  style,
  source,
  loop = false,
}) => {
  return (
    <View style={styles.LottieAnimationsContainer}>
      <LottieView style={style} source={source} autoPlay loop={loop} />
    </View>
  );
};

const styles = StyleSheet.create({
  LottieAnimationsContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center',
  },
});
export default PopupAnimations;
