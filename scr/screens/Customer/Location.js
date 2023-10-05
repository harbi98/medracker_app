import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from '../../public/Style'
import Mapbox from '@rnmapbox/maps'
import { AuthContext } from '../../context/AuthContext';

Mapbox.setAccessToken('pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg');

export default function Location() {
  const {location} = useContext(AuthContext);
  const [currLocation, setCurrLocation] = useState(null);

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={local_styles.map}>
        <StatusBar
          barStyle={'dark-content'}
        />
        <Mapbox.UserLocation
          visible={true}
          onUpdate={(newLocation) => setCurrLocation(newLocation)}
        />
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={[JSON.stringify(location.coords.longitude), JSON.stringify(location.coords.latitude)]}
          animationMode="flyTo"
          animationDuration={2000}
        />
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={[JSON.stringify(location.coords.longitude), JSON.stringify(location.coords.latitude)]}
          title="Your Location"
        />
      </Mapbox.MapView>
      {currLocation ?
          <Text>{JSON.stringify(currLocation)}</Text>
        :
          null
      }
    </View>
  )
}

const local_styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  map: {
    height: 500,
    width: '100%'
  }
});