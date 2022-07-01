import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { AuthStack } from './navigations/AuthStack';
import { NavigationContainer } from '@react-navigation/native';


const GOOGLE_API_KEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8'
// const App = () => {
//   const [mapRegion, setmapRegion] = useState({
//     latitude: 24.8746012,
//     longitude: 67.0632203,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={{ alignSelf: 'stretch', height: '100%' }}
//         region={mapRegion}
//       >
//         <Marker coordinate={mapRegion} title='Marker' />
//       </MapView>
//     </View>
//   );
// };
// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
  // const [coordinates] = useState([
  //   {
  //     latitude: 24.8746012,
  //     longitude: 67.0632203,
  //   },
  //   {
  //     latitude: 24.9040632,
  //     longitude: 67.0822363,
  //   },
  // ]);
  // return (
  //   <View style={styles.container}>
  //     <MapView
  //       style={styles.maps}
  //       initialRegion={{
  //         latitude: coordinates[0].latitude,
  //         longitude: coordinates[0].longitude,
  //         latitudeDelta: 0.0622,
  //         longitudeDelta: 0.0121,
  //       }}>
  //       <MapViewDirections
  //         origin={coordinates[0]}
  //         destination={coordinates[1]}
  //         apikey="AIzaSyBk6G_XO6bybDaBGEht1MJ3ES_iwLvn9Og"
  //         strokeWidth={4}
  //         strokeColor="#111111"
  //       />
  //       {/* <Marker coordinate={coordinates[0]} />
  //       <Marker coordinate={coordinates[1]} /> */}
  //       <Polyline
  //         coordinates={coordinates}
  //         strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
  //         strokeColors={['#7F0000']}
  //         strokeWidth={6}
  //       />
  //     </MapView>
  //   </View>
  // );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default App;