import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableHighlight, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from '../../public/Style'
import Mapbox from '@rnmapbox/maps'
import { UserLocationRenderMode } from '@rnmapbox/maps'
import { processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { 
  Input,
  Button,
  Icon
} from '@rneui/themed'

Mapbox.setAccessToken('pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg');

export default function Location() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keyword, setKeyword] = useState('');

  let lineStringGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              125.564223,
              7.054047
            ],
            [
              125.564185,
              7.054182
            ],
            [
              125.564028,
              7.054806
            ],
            [
              125.563993,
              7.054881
            ],
            [
              125.563975,
              7.054906
            ],
            [
              125.563957,
              7.054915
            ],
            [
              125.563935,
              7.054919
            ],
            [
              125.563882,
              7.054919
            ],
            [
              125.563816,
              7.05491
            ],
            [
              125.563767,
              7.054897
            ],
            [
              125.563725,
              7.054879
            ],
            [
              125.563658,
              7.054842
            ],
            [
              125.563534,
              7.054755
            ],
            [
              125.563441,
              7.054696
            ],
            [
              125.563341,
              7.054643
            ],
            [
              125.563235,
              7.054599
            ],
            [
              125.563106,
              7.05455
            ],
            [
              125.562608,
              7.054348
            ],
            [
              125.562696,
              7.054024
            ]
          ],
          type: "LineString"
        }
      },
    ]
  }

  const getSuggestedLocations = (keyword) => {
    setKeyword(keyword);
    try{
      fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+keyword+'.json?proximity=ip&access_token=pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg',{
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      })
      .then(processResponse)
      .then(res => {
          const { statusCode, data } = res;
          setSearchResults(data.features);
      })
      .catch((e) => {
          console.log(e);
      })
    } catch (e){
        console.log(e);
    }
  }
  const handleCloseSearch = () => {
    setKeyword('');
    setSearchResults();
  }

  return (
    <View style={styles.tabs_container}>
      <StatusBar
        barStyle={'dark-content'}
      />
      <View style={styles.search_block}>
        <View style={{marginLeft: 10, marginRight: 10,flexDirection: 'row', elevation: 5, backgroundColor: '#ffffff', borderRadius: 5, alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Input
              value={keyword}
              renderErrorMessage={false}
              inputContainerStyle={styles.search_location_field}
              onChangeText={(e) => getSuggestedLocations(e)}
              placeholder='Search Map...'
            />
          </View>
          {keyword !== '' ?
              <TouchableHighlight
                underlayColor={'#ffffff'}
                style={{width: 25, height: 25, alignItems: 'center', justifyContent: 'center', marginRight: 10}}
                onPress={() => handleCloseSearch('')}
              >
                <Image style={{width: '100%', height: '100%', tintColor: '#808080'}} source={require('../../../assets/circle-xmark.png')}/>
              </TouchableHighlight>
            :
              null
          }
        </View>
        <ScrollView style={styles.results_block}>
          {searchResults ?
              searchResults.map((result, key) => {
                return (
                  <View key={key} style={{width: '100%', padding: 10, borderBottomWidth: 0.5, borderColor: '#c3c3c3'}}>
                    <Text style={{fontSize: 18, marginBottom: 5, fontWeight: 'bold'}}>{result.text}</Text>
                    <Text style={{fontSize: 12, marginBottom: 5, fontWeight: '100'}}>{result.place_name}</Text>
                  </View>
                )
              })
            :
              null
          }
        </ScrollView>
      </View>
      <Mapbox.MapView
        style={local_styles.map}
        logoEnabled={false}
        zoomEnabled={true}
        pitchEnabled={true}
        onPress={(feature) => alert([feature.geometry.coordinates[0]+'', feature.geometry.coordinates[1]+''])}
      >
      <Mapbox.UserLocation
          androidRenderMode='gps'
          renderMode={UserLocationRenderMode.Native}
          visible={true}
          requestsAlwaysUse={true}
          onUpdate={(location) => setUserLocation(location)}
      />
      {/* {selectedLocation ?
          <Mapbox.PointAnnotation
            id="selectedLocation"
            coordinate={selectedLocation}
            title="Selected Location"
          />
        :
          null
      } */}
      <Mapbox.ShapeSource id='mapbox-direction-source' shape={lineStringGeoJSON}>
        <Mapbox.LineLayer
          id="mapbox-direction-line"
          style={{
              lineColor: '#FF0000',
              lineWidth: 5,
          }}
        />
      </Mapbox.ShapeSource>
      <Mapbox.PointAnnotation
        id="pointA"
        coordinate={[125.56427,7.05406]}
        title="Point A Location"
        onSelected={(payload) => console.log(payload)}
      >
          <View style={{width: 20, height: 20, backgroundColor: 'red', borderRadius: 10}}>

          </View>
      </Mapbox.PointAnnotation>
      <Mapbox.PointAnnotation
        id="pointB"
        coordinate={[125.5628, 7.05382]}
        title="Point B Location"
      >
        <View style={{width: 20, height: 20, backgroundColor: 'red', borderRadius: 10}}>

        </View>
    </Mapbox.PointAnnotation>
      <Mapbox.Camera
        zoomLevel={18}
        centerCoordinate={[125.56427,7.05406]}
        animationMode="flyTo"
        animationDuration={2000}
      />
      {/* {userLocation ?
          <Mapbox.Camera
            zoomLevel={15}
            centerCoordinate={[userLocation.coords.longitude,userLocation.coords.latitude]}
            animationMode="flyTo"
            animationDuration={2000}
          />
          :
          null
      } */}
      {selectedLocation ?
        <Mapbox.PointAnnotation
          id="selectedLocation"
          coordinate={[selectedLocation.coords.longitude, selectedLocation.coords.latitude]}
          title="Selected Location"
        />
        :
        null
      }
      </Mapbox.MapView>
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