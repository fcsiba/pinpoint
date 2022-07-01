import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';

export default function ParentView({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style= {theme.textVariants.header}>
            Parent View
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginBottom: hp(5),
  },

  innerButton: {
    height: hp(6),
    width: wp(70),
    borderRadius: 12,
    backgroundColor: "#3b5998"
  },

  btnIcon: {
    marginRight: wp(10)
  },

  iconContainer: {
    height: hp(3.5),
    width: wp(7),
    marginRight: wp(6)
  },

  btnContainer: {
    marginBottom: Platform.OS === 'ios' ? hp(1) : hp(6)
  },

  txtContainer: {
    width: wp(80),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
    position: 'absolute',
    top : 0,
    marginTop: hp(10)
  }

});
