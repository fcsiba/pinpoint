import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { Card } from 'react-native-shadow-cards';
const RightArrowIcon = require('../assets/RightArrow.png')
import normalize from 'react-native-normalize';
import { theme } from '../styles/color'

const OptionsButton = ({ color = 'white', src= null, btnText = '', onBtnPress}) => {
  return (
    <>
        <Card style={styles.card}>
        <TouchableOpacity onPress={onBtnPress}>
          <View style={styles.cardInsideContainer}>

            <View style={{ padding: 9 }}>
              <Image
                source={src}
                style={[styles.Image]}
              />
            </View>

            <View style={{ padding: 5, marginTop: hp(0.5), alignItems:'center', justifyContent:'center' }}>
              <Text style={styles.TextHeading}>{btnText}</Text>
            </View>

            <View style={styles.IconContainer}>
              <Image
                source={RightArrowIcon}
                resizeMode="contain"
                style={{ width: wp(10), height: hp(10), tintColor: 'white' }}
              />
            </View>

          </View>
          </TouchableOpacity>
        </Card>
      

    </>
  )
};

const styles = StyleSheet.create({
  card: {
    marginTop: hp(6),
    width: wp(87.5),
    marginLeft: wp(5),
    height: hp(8),
    borderRadius: 20,
    elevation : 10
  },
  cardInsideContainer: {
    flexDirection: 'row',
  },
  TextHeading: {
    fontSize: normalize(19),
    height: 'auto',
    width: wp(45),
    fontWeight: 'bold',
  },
  Image: {
    width: wp(20),
    height: hp(6), marginRight: wp(2), borderRadius: 20,
    resizeMode: 'contain',
  },
  IconContainer: {
    width: wp(13),
    height: hp(8),
    backgroundColor: theme.colors.secondary,
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:wp(.7)
  }
});

export default OptionsButton;