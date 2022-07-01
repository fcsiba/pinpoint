import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator, Alert,
  Dimensions,
  Keyboard,
  Share,
  TouchableWithoutFeedback
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import { Avatar, Input, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as SecureStore from "expo-secure-store";
import config from '../config.json';
import * as Location from 'expo-location';
import axios from "axios";

const logo = require("../assets/user.png")

export default function ParentViewDriverDetails({ navigation }) {

  const [driverName, setDriverName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [mapRegion, setmapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function clearAll() {
    for (var i = setTimeout(function() {}, 0); i > 0; i--) {
      window.clearInterval(i);
      window.clearTimeout(i);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log("Setting location");

        setmapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        })
      }
    })();
  }, []);


  useEffect(
    () => {
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
                  setStudentID(res.data[0]._id)
                  axios.get(`${config.base_url_local}api/driver/getById/${res.data[0].driver_id}`)
                    .then((res) => {
                      console.log('driver res', res.data)
                      if (res.data.length) {
                        setDriverName(res.data[0].driver_name)
                        setVehicleName(res.data[0].vehicle_name)
                        setVehicleNo(res.data[0].vehicle_no)
                      }
                    })
                    .catch((err) => {
                      console.log(err.response.data.message)
                    })
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
    },
    []
  );

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View
            style={{
              width: wp("100%"),
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp("10"),
              marginBottom: hp("5")
            }}
          >
            <Avatar
              style={styles.avat1}
              avatarStyle={{
                borderWidth: 4,
                borderColor: "#000",
                borderRadius: 80,
              }}
              size="medium"
              rounded
              source={logo}
            />

          </View>
          <View style={styles.LabelContainer}>
            <Text style={theme.textVariants.label}>
              Name:   {driverName}
            </Text>
          </View>
          <View style={styles.LabelContainer}>
            <Text style={theme.textVariants.label}>
              Vehicle Name:   {vehicleName}
            </Text>
          </View>

          <View style={styles.LabelContainer}>
            <Text style={theme.textVariants.label}>
              Vehicle Number:   {vehicleNo}
            </Text>
          </View>

          <View style={styles.btnStyle}>
            <Button title='Set Parent Location' buttonStyle={{ backgroundColor: '#79b37e', width: wp(80), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={() => {
              if (studentID) {
                let tempObj = {
                  latitude: mapRegion.latitude,
                  longitude: mapRegion.longitude
                }
                console.log('tempObj', tempObj)
                axios.patch(`${config.base_url_local}api/student/updateStudentHomeLocation/${studentID}`, { student_home_loc: tempObj })
                  .then((res) => {
                    console.log('Student res', res.data);
                    Alert.alert('Success', 'Parent Location set successfully', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                  })
                  .catch((err) => {
                    console.log(err.response.data)
                  })
              }

            }} />
          </View>

          <View style={[styles.btnStyle, {marginTop: hp(5)}]}>
            <Button title='Logout' buttonStyle={{ backgroundColor: '#79b37e', width: wp(80), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={() => {
              clearAll()
              navigation.navigate('LoginButtons');
            }} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
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

  btnStyle: {
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(10),
    height: hp(10),
    marginTop: hp(10)
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
  avat1: {
    height: hp("15%"),
    width: wp("30%"),
  },
  ImageBackground: {
    flex: 1,
  },
  HeadingText: {
    fontSize: 24,
    color: "black",

  },
  HeadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
    marginBottom: hp(2)
  },

  InputContainer: {
    borderWidth: 1,
    borderRadius: 2,
    width: wp(80),
    height: hp(5),
    marginLeft: wp(10)
  },
  DropDownContainer: {
    borderRadius: 2,
    width: wp(80),
    height: hp(5),
    marginLeft: wp(10),
    backgroundColor: 'transparent'
  },

  LabelContainer: {
    width: wp(80),
    height: hp(4),
    marginTop: hp(3),
    marginLeft: wp(15)
  },
  InputInner: {
    fontSize: 16,
    color: 'black',
    paddingBottom: hp(1),
    paddingLeft: wp(1),
    paddingTop: hp(1)
  },
  btnContainer: {
    marginTop: hp(5),
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp(10)
  }

});

