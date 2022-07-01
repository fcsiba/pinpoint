import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as SecureStore from "expo-secure-store";
import config from '../config.json';
import axios from "axios";

export default function ParentViewMap({ navigation }) {
  const API_KEY = 'AIzaSyBPZ-6UFY_pjJKfNdC09T6i3QiVFjnr530';
  const [coordinates, setCoordinates] = useState([
  ]);

  // const [coordinates, setCoordinates] = useState([
  //   {
  //     latitude: 24.8746012,
  //     longitude: 67.0632203,
  //   },
  //   {
  //     latitude: 24.9040632,
  //     longitude: 67.0822363,
  //   },
  // ]);
  const [location, setLocation] = useState(null);
  const [lineColor, setLineColor] = useState('#111111')
  const [mapRegion, setmapRegion] = useState({
    latitude: 38.685516,
    longitude: -101.073324
  });
  const [parentLoc, setParentLoc] = useState({
    latitude: 38.685516,
    longitude: -101.073324
  });

  const [pTitle, setPTitle] = useState('Parent')
  const [dTitle, setDTitle] = useState('Student / Driver')



  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       console.log('Hassu')
  //       e.preventDefault();
  //     }),
  //   [navigation]
  // );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(JSON.stringify(location));
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

    console.log(`Location ${JSON.stringify(location)}`);

    console.log(`Coordinated ${JSON.stringify(coordinates)}`);

    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          console.log('Storage', userString)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  let parsedStudents = []
                  for (let i = 0; i < res.data.length; i++) {
                    let studentObj = {}
                    student = res.data[i];
                    studentObj.driver_loc = student.driver_loc;
                    studentObj.student_home_loc = student.student_home_loc;
                    parsedStudents.push(studentObj);
                  }
                  console.log('parsedStudents 1', parsedStudents);
                  if (Object.keys(parsedStudents[0]?.driver_loc).length > 0) {
                    if (parsedStudents[0].driver_loc.latitude !== "" && parsedStudents[0].driver_loc.longitude !== "") {
                      setLineColor('#111111');
                      setPTitle('Parent');
                      setDTitle('Student / Driver');
                      setmapRegion({
                        latitude: parseFloat(parsedStudents[0].driver_loc.latitude),
                        longitude: parseFloat(parsedStudents[0].driver_loc.longitude),
                      });
                      setParentLoc({
                        latitude: parseFloat(parsedStudents[0].student_home_loc.latitude),
                        longitude: parseFloat(parsedStudents[0].student_home_loc.longitude)
                      });
                    }
                    else {
                      setLineColor('#ffffff')
                      setPTitle('Parent');
                      setDTitle('Parent');
                      setmapRegion({
                        latitude: parseFloat(parsedStudents[0].student_home_loc.latitude),
                        longitude: parseFloat(parsedStudents[0].student_home_loc.longitude),
                      });
                      setParentLoc({
                        latitude: parseFloat(parsedStudents[0].student_home_loc.latitude),
                        longitude: parseFloat(parsedStudents[0].student_home_loc.longitude)
                      });
                    }
                  }
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


  return (
    <View style={styles.container}>
      {!coordinates.length ?
        <MapView
          style={styles.maps}
          provider={PROVIDER_GOOGLE}
        >
          <MapViewDirections
            origin={mapRegion}
            destination={parentLoc}
            apikey={API_KEY}
            strokeWidth={4}
            strokeColor={lineColor}
          />
          {console.log('HASSSU HERE helloooooooooo')}
          <Marker coordinate={mapRegion} title={dTitle} identifier={'mk1'}/>
          <Marker coordinate={parentLoc} title={pTitle} identifier={'mk2'} />
        </MapView> :

        <View style={styles.container}>
          {console.log("HAAAAAAAAAAAAAA", JSON.stringify(mapRegion))}
          <MapView
            style={styles.maps}
            region={mapRegion}
          >
            <Marker coordinate={mapRegion} title={mTitle} />
          </MapView>
        </View>}

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
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flex: 1
  },

});
