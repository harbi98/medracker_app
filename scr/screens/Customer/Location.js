import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../public/Style'
import Mapbox from '@rnmapbox/maps'
import * as ExpoLocation from 'expo-location'

Mapbox.setAccessToken('pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg');

export default function Location() {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState('125.56269613033322'); //7.053368928095796, 125.56269613033322
  const [latitude, setLatitude] = useState('7.053368928095796');

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={local_styles.map}>
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={[longitude, latitude]}
          animationMode="flyTo"
          animationDuration={2000}
        />
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={[longitude, latitude]}
          title="Your Location"
        />
      </Mapbox.MapView>
      {location ? <Text>{JSON.stringify(location)}</Text> : null}
    </View>
  )
}

const local_styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
    width: '100%'
  }
});