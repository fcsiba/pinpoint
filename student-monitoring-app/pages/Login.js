import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform,TextInput} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import { Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const logo = require("../assets/Logo.png")
const google = require("../assets/google.png");

export default function LoginButtons({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={theme.textVariants.header}>
          Welcome to <Text style={theme.textVariants.headerCompanyName}>PinPoint</Text>
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          icon={
            <Icon
              name="id-card"
              size={25}
              color="white"
              style={{ marginRight: wp(5.5) }}
            />
          }
          title="Login as driver"
          type="solid"
          style={styles.button}
          buttonStyle={[styles.innerButton, { backgroundColor: '#79b37e' }]}
          titleStyle={[theme.textVariants.button]}
          onPress={() => { navigation.navigate('Authenticate', { role : 'driver' }) }}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          icon={
            <Icon
              name="user"
              size={25}
              color="white"
              style={{ marginRight: wp(5.5) }}
            />
          }
          title="Login as parent"
          type="solid"
          style={styles.button}
          buttonStyle={[styles.innerButton, { backgroundColor: '#79b37e' }]}
          titleStyle={[theme.textVariants.button]}
          onPress={() => { navigation.navigate('Authenticate', { role : 'parent' }) }}
        />
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
  InputContainer: {
    borderWidth: 1,
    borderRadius: 2,
    width: wp(80),
    height: hp(5),
    marginLeft: wp(10)
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
    top: 0,
    marginTop: hp(10)
  },
  InputInner: {
    fontSize: 16,
    color: 'black',
    paddingBottom: hp(1),
    paddingLeft: wp(1),
    paddingTop: hp(1)
  },

});
