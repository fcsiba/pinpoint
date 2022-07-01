import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import { Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.json';
import axios from "axios";
import * as SecureStore from "expo-secure-store";


const logo = require("../assets/Logo.png")
const google = require("../assets/google.png");

export default function Authenticate({ navigation, route }) {
  const { role } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    // if(role === 'driver')
    // {
    //   navigation.navigate("DriverApp");
    // }
    // if(role === 'parent') {
    //   navigation.navigate("BottomTabs");
    // }
    console.log({ username, password })
    if (username && password) {
      console.log(`${config.base_url_local}api/${role}/login`);
      axios.post(`${config.base_url_local}api/${role}/login`, {
        email: username,
        password: password
      }, {
        "headers": {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        console.log('success', res.data.message);
        SecureStore.setItemAsync('user', JSON.stringify({
          id: res.data.message?._id,
          name: res.data.message?.driver_name,
          email: res.data.message?.email,
          role: res.data.message?.role,
        }))
        console.log('here')
        if(role === 'parent')
        {
          console.log('Navigating to parent app')
          navigation.navigate("BottomTabs");
        }
        else{
          console.log('Navigating to driver app');
          navigation.navigate("DriverApp");
        }
        
      })
        .catch((err) => {
          console.log("e", err.response.data.errors[0]);
          const key = Object.keys(err.response.data.errors[0]);
          setError(err.response.data.errors[0][key]);
        });
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={theme.textVariants.header}>
          <Text style={theme.textVariants.headerCompanyName}>PinPoint</Text> Login
        </Text>
      </View>
      <View style={styles.InputContainer}>
        <TextInput inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Username' placeholderTextColor='black' value={username} onChangeText={(text) => { setUsername(text) }} style={styles.InputInner} />
      </View>
      <View style={[styles.InputContainer, { marginTop: hp(5) }]}>
        <TextInput inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Password' secureTextEntry={true} placeholderTextColor='black' value={password} onChangeText={(text) => { setPassword(text) }} style={styles.InputInner} />
      </View>
      {error ? (
        <View>
          <Text
            style={{
              marginTop: hp(1.5),
              flexDirection: "row",
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </Text>
        </View>
      ) : (
        <Text></Text>
      )}
      <View style={styles.btnStyle}>
        <Button title='Login' buttonStyle={{ backgroundColor: theme.colors.secondary, width: wp(30), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={onSubmit} />
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
  btnStyle: {
    marginTop: hp(5),
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2)
  },
  InputContainer: {
    borderWidth: 1,
    borderRadius: 2,
    width: wp(80),
    height: hp(5),
    marginLeft: wp(5)
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
    marginBottom: hp(2),
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
