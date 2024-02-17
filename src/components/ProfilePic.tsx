import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = ({source, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.ImageContainer} onPress={onPress}>
      <Image
        source={
          source
            ? {
                uri: source,
              }
            : require('../assets/app_images/avatar.png')
        }
        style={styles.Image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default ProfilePic;
