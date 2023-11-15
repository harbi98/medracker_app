import { View, Text, ScrollView, SafeAreaView, StatusBar, Image, TouchableHighlight } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../../public/Style'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL, processResponse } from '../../config'
import { 
  Input,
  Button,
  Icon
} from '@rneui/themed'

export default function Home({navigation}) {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  const getProducts = () => {
    try{
        fetch(BASE_URL+'products',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(processResponse)
        .then(res => {
            const { statusCode, data } = res;
            setProducts(data.data);
        })
        .catch((e) => {
            console.log(e);
        })
    } catch (e){
        console.log(e);
    }
  }
  const getPharmacies = () => {
    try{
        fetch(BASE_URL+'pharmacies',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(processResponse)
        .then(res => {
            const { statusCode, data } = res;
            setPharmacies(data.data);
        })
        .catch((e) => {
            console.log(e);
        })
    } catch (e){
        console.log(e);
    }
  }
  useEffect(() => {
    getProducts();
    getPharmacies();
  }, [])
  return (
    <SafeAreaView style={styles.tabs_container}>
      <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'#ffffff'}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <View  style={styles.tab_container}>
          <View style={styles.home_header}>
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#00BE62'}}/>
            <View style={{flex: 1}}>
              <Input
                rightIcon={<Icon type='antdesign' name="search1" color="grey"/>}
                rightIconContainerStyle={{marginRight: 5}}
                renderErrorMessage={false}
                inputStyle={{marginLeft: 10, marginRight: 10}}
                inputContainerStyle={styles.form_field}
                placeholder='Search...'
              />
            </View>
            <View style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Icon type='antdesign' name="setting" size={30}/>
            </View>
          </View>
          <View style={styles.home_content}>
            {/* <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='entypo' name="back-in-time" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Recent</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    <View style={styles.medicine_card}>
                      <View style={{flex: 2, width: '100%'}}>
                        <Image source={require('../../../assets/medicine.jpeg')} style={styles.medicine_image}/>
                      </View>
                      <View style={{flex: 1, width: '100%', padding: 10}}>
                        <Text>Product Name</Text>
                        <Text>Price</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>Pharmacy Name</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View> */}
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='fontisto' name="fire" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Popular Medicine</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    {products.map((product, key) => {
                        return (
                          <TouchableHighlight
                            underlayColor={'#ffffff'}
                            style={styles.medicine_card}
                            key={key}
                            onPress={() => navigation.navigate('ProductDetails', {product_id: product.id})}
                          >
                            <>
                              <View style={{flex: 2, width: '100%'}}>
                                <Image source={require('../../../assets/medicine.jpeg')} style={styles.medicine_image}/>
                              </View>
                              <View style={{flex: 1, width: '100%', padding: 10}}>
                                <Text style={{fontWeight: 'bold'}}>{product.name}</Text>
                                <Text>Price {product.price}</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail'>{product.pharmacy_name}</Text>
                              </View>
                            </>
                          </TouchableHighlight>
                        )
                    })}
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View>
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='materialicons' name="local-pharmacy" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Pharmacy</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    {pharmacies.map((pharmacy, key) => {
                        return (
                          <View style={styles.pharmacy_card} key={key}>
                            <View style={{flex: 2, width: '100%', padding: 10}}>
                              <Image source={require('../../../assets/drugstore.png')} style={styles.pharmacy_image}/>
                            </View>
                            <View style={{height: 50, width: '100%', padding: 10, justifyContent: 'center'}}>
                              <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold'}}>{pharmacy.name}</Text>
                            </View>
                          </View>
                        )
                    })}
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}