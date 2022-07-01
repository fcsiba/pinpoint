
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, TextInput, Dimensions, SegmentedControlIOSComponent } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from "react-native-responsive-screen";
import { theme } from '../styles/color';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config.json';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"


const logo = require("../assets/Logo.png")
const google = require("../assets/google.png");
const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let originLocation = {};
let speedGlobal = "";
let foregroundSubscription = null

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      originLocation.latitude = location.coords.latitude
      originLocation.longitude = location.coords.longitude
      speedGlobal = location.coords.speed;
    }
    //console.log('Updates', {originLocation, speedGlobal})
  }
})

export default function DriverMap({ navigation, route }) {
  const API_KEY = 'AIzaSyBPZ-6UFY_pjJKfNdC09T6i3QiVFjnr530';
  const { student_id } = route.params;
  console.log('Hassan at map', student_id)
  let interval = null;
  const [mapRegion, setmapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destinationLoc, setDestinationLoc] = useState(
    {
      latitude: 24.9040632,
      longitude: 68.0822363,
    }
  );
  const [originLoc, setOriginLoc] = useState(
    {
      latitude: 24.9040632,
      longitude: 68.0822363,
    }
  );
  const [speed, setSpeed] = useState("");
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 24.8746012,
      longitude: 67.0632203,
    },
    {
      latitude: 24.9040632,
      longitude: 67.0822363,
    },
  ]);

  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    console.log('I am here hassym')
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    console.log('hassan herhehe', originLocation)
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      console.log("Location tacking stopped")
    }
  }

  useEffect(
    () => {
      startBackgroundUpdate();
      axios.get(`${config.base_url_local}api/student/getById/${student_id}`)
        .then((res) => {
          console.log('Student res', res.data[0])
          const studentHomeLocationobj = res.data[0]?.student_home_loc || {};
          if (Object.keys(studentHomeLocationobj).length > 0) {
            console.log('Setting destttt')
            setDestinationLoc({
              latitude: studentHomeLocationobj.latitude,
              longitude: studentHomeLocationobj.longitude
            })
          }
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    []
  );

  useEffect(
    () => {
      makeTimer();
    },
    []
  );

  const makeTimer = async () => {
    this.interval = setInterval(() => {
      if (Object.keys(originLocation).length > 0) {
        console.log('Make timer', originLocation)
        let tempLoc = { ...originLocation };
        setOriginLoc(tempLoc)
        axios.patch(`${config.base_url_local}api/student/updateStudentDriverLocation/${student_id}`, { driver_loc: tempLoc })
          .then((res) => {
            console.log('Student res', res.data);
          })
          .catch((err) => {
            console.log(err.response.data)
          })
      }
      if(speedGlobal) {
        console.log('Make timer speed', speedGlobal)
        let tempSpeed = speedGlobal;
        setSpeed(tempSpeed);
        axios.patch(`${config.base_url_local}api/student/updateStudentDriverLocation/${student_id}`, { speed: tempSpeed })
          .then((res) => {
            console.log('Student res', res.data);
          })
          .catch((err) => {
            console.log(err.response.data)
          })

      }
    }, 6000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={[theme.textVariants.header, { marginBottom: hp(2) }]}>
          <Text style={theme.textVariants.headerCompanyName}>PinPoint</Text> Driver Map
        </Text>
        {console.log('hassan', originLoc, destinationLoc)}
        <View>
          {/* <MapView
            style={styles.maps}
            region={mapRegion}
          >
            <Marker coordinate={mapRegion} title='Marker' />
          </MapView> */}
          <MapView
            style={styles.maps}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: originLoc.latitude,
              longitude: originLoc.longitude,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0121,
            }}>
            <MapViewDirections
              origin={originLoc}
              destination={destinationLoc}
              apikey={API_KEY}
              strokeWidth={4}
              strokeColor="#111111"
            />
            <Marker coordinate={originLoc} />
            <Marker coordinate={destinationLoc} />
          </MapView>
        </View>
        <View style={styles.btnStyle}>
          <Button title='Finish Ride' buttonStyle={{ backgroundColor: theme.colors.secondary, width: wp(40), borderRadius: 20 }} titleStyle={{ fontSize: 18 }} onPress={() => {
            stopBackgroundUpdate();
            clearInterval(this.interval);
            let tempObj = {
              latitude : "",
              longitude : ""
            }
            axios.patch(`${config.base_url_local}api/student/updateStudentDriverLocation/${student_id}`, { driver_loc: tempObj })
              .then((res) => {
                console.log('Student res', res.data);
                navigation.navigate('DriverStudent')
              })
              .catch((err) => {
                console.log(err.response.data)
              })
          }} />
        </View>
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
    width: wp(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
    height: hp(10)
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
  maps: {
    width: Dimensions.get('screen').width,
    height: hp(70)
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
