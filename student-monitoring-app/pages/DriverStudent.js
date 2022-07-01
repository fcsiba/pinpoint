
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import { Button, SocialIcon } from 'react-native-elements';
import DropDownPicker from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.json';
import axios from "axios";
import * as SecureStore from "expo-secure-store";


const logo = require("../assets/Logo.png")
const google = require("../assets/google.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function DriverStudent({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [students, setStudents] = useState([]);
  const [goBack, setGoback]= useState(true);

  useEffect(
    () => {
      SecureStore.getItemAsync("user")
        .then((userString) => {
          if (userString) {
            console.log('Storage', userString)
            let userObject = JSON.parse(userString);
            console.log('url', `${config.base_url_local}api/student/getByDriverId/${userObject?.id}`);
            axios.get(`${config.base_url_local}api/student/getByDriverId/${userObject?.id}`)
              .then((res) => {
                console.log('Student res', res.data)
                if (res.data.length) {
                  let parsedStudents = []
                  for (let i = 0; i < res.data.length; i++) {
                    let studentObj = {}
                    student = res.data[i];
                    studentObj.label = student.student_name;
                    studentObj.value = student._id;
                    parsedStudents.push(studentObj);
                  }
                  console.log('parsedStudents', parsedStudents);
                  setStudents(parsedStudents);
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

  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       console.log('Hassu')
  //       if(goBack)
  //       {
  //         console.log('Hassu1')
  //         e.preventDefault();
  //       }
  //     }),
  //   [navigation]
  // );

  onStartClick = () => {
    console.log(value)
    if (value) {
      navigation.navigate('DriverMap', {
        student_id: value
      });
    }

  }
  return (

    <TouchableWithoutFeedback
      onPress={() => {
        setOpen(false)
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.txtContainer}>
          <Text style={theme.textVariants.header}>
            <Text style={theme.textVariants.headerCompanyName}>PinPoint</Text> Students
          </Text>
        </View>
        <View
          style={[
            styles.dropDownContainer,
            Platform.OS === "ios"
              ? {
                zIndex: 20,
              }
              : {},
          ]}
        >
          <DropDownPicker
            flatListProps={{
              showsVerticalScrollIndicator: false,
              keyboardShouldPersistTaps: "always",
            }}
            zIndex={20}
            zIndexInverse={20}
            style={styles.dropDownStyle}
            searchTextInputStyle={{
              fontSize: 14,
            }}
            searchContainerStyle={{
              borderWidth: 0,
            }}
            selectedItemLabelStyle={{
              fontSize: 14,
              color: "red",
            }}
            listItemContainerStyle={{
              width: windowWidth * 0.6,
            }}
            containerStyle={{
              width: windowWidth * 0.6,
            }}
            searchable={true}
            open={open}
            value={value}
            items={students}
            placeholder="Select Student"
            setOpen={setOpen}
            setValue={setValue}
          />
        </View>
        <View style={styles.btnStyle}>
          <Button title='Start' buttonStyle={{ backgroundColor: theme.colors.secondary, width: wp(30), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={onStartClick} />
        </View>

        <View style={styles.btnStyle}>
          <Button title='Logout' buttonStyle={{ backgroundColor: '#79b37e', width: wp(30), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={() => {
            navigation.navigate('LoginButtons')
          }} />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: hp(8),
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
    marginBottom: hp(1),
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
  dropDownContainer: {
    marginVertical: windowHeight * 0.008
  },
  dropDownStyle: {
    width: windowWidth * 0.6,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 4,
    height: 30,
  },

});
