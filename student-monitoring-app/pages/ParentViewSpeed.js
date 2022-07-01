import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import Speedometer from '../components/SpeedMeter'
import * as SecureStore from "expo-secure-store";
import config from '../config.json';
import axios from "axios";

export default function ParentViewSpeed({ navigation }) {

  useEffect(
    () => {
      makeTimer();
    },
    []
  );


  const makeTimer = async () => {
    this.interval = setInterval(() => {
      SecureStore.getItemAsync("user")
        .then((userString) => {
          if (userString) {
            console.log('Storage', userString)
            let userObject = JSON.parse(userString);
            console.log('url', `${config.base_url_local}api/student/getByParentId/${userObject?.id}`);
            axios.get(`${config.base_url_local}api/student/getByParentId/${userObject?.id}`)
              .then((res) => {
                console.log('Student res', res.data)
                if (res.data.length) {
                  console.log('Parent speed', res.data[0].speed)
                  setSpeed(parseFloat(res.data[0].speed) + 1)
                }
              })
              .catch((err) => {
                console.log(err.response.data.message)
              })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 15000);
  }

  // setTimeout(() => {
  //   var i = speed;
  //   setSpeed(i + 0.5);
  // }, 1000);
  const [speed, setSpeed] = useState(1);
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={theme.textVariants.header}>
          Driver Speed
        </Text>
      </View>
      <Speedometer
        value={speed}
        //value for Speedometer
        size={200}
        //Size of Speedometer
        minValue={0}
        //Min value for Speedometer
        maxValue={100}
        //Max value for Speedometer
        allowedDecimals={1}
        //Decimals value allowed or not
        labels={[
          {
            name: 'Low Risk',
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
          },
          {
            name: 'Medium Risk',
            labelColor: '#f4ab44',
            activeBarColor: '#f4ab44',
          },
          {
            name: 'High Risk',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
          },
        ]}
      //Labels for the different steps of Speedometer
      />
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
    top: 0,
    marginTop: hp(10)
  }

});
