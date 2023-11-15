import { View, Text, ScrollView, TouchableHighlight, SafeAreaView, Platform , Button} from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { styles } from '../../public/Style'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

export default function Cart() {
  const {token, userId} = useContext(AuthContext);
  const [cartItems, setCartItems] = useState();

  const getCart = () => {
    try{
      fetch(BASE_URL+'cart/'+userId,{
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
      .then(processResponse)
      .then(res => {
          const { statusCode, data } = res;
          data.data.map((item) => console.log(item))
          setCartItems(data.data);
      })
      .catch((e) => {
          console.log(e);
      })
    } catch (e){
        console.log(e);
    }
  }
  const removeCartItems = () => {
    cartItems.map((item) => {
      try{
        fetch(BASE_URL+'cart/delete/'+userId+'/'+item.cart_product_id,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(processResponse)
        .then(res => {
            const { statusCode, data } = res;
            console.log(data);
            getCart();
        })
        .catch((e) => {
            console.log(e);
        })
      } catch (e){
          console.log(e);
      }
    })
  }
  const addOrder = () => {
    try{
      fetch(BASE_URL+'add-order',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            user_id: userId,
            status: 1
          })
      })
      .then(processResponse)
      .then(res => {
          const { statusCode, data } = res;
          alert(data.message);
          addOrderItem(data.order_id);
      })
      .catch((e) => {
          console.log(e);
      })
    } catch (e){
        console.log(e);
    }
  }
  const addOrderItem = (id) => {
    var orders = cartItems.map((item) => {
      return {
        order_id: id,
        product_id: item.cart_product_id,
        order_qty: item.cart_product_qty,
        order_price: item.product_price
      }
    });
    try{
      fetch(BASE_URL+'add-order-item',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            order_items: orders
          })
      })
      .then(processResponse)
      .then(res => {
          const { statusCode, data } = res;
          console.log(data);
          removeCartItems();
      })
      .catch((e) => {
          console.log(e);
      })
    } catch (e){
        console.log(e);
    }
  }

  useEffect(() => {
    getCart();
  }, [])

  const Cart = () => {
    return (
      <View style={styles.tabs_container}>
        
        <ScrollView style={{width: '100%'}}>
          {cartItems ?
              cartItems.map((item, key) => {
                return (
                  <View key={key} style={{margin: 10, marginBottom: 5, flexDirection: 'row', height: 100, borderRadius: 5, backgroundColor: '#ffffff', elevation: 5}}>
                    <View style={{flex: 1, backgroundColor: '#808080', borderRadius: 5}}>

                    </View>
                    <View style={{flex: 2, paddingLeft: 20 ,justifyContent: 'center'}}>
                      <Text>{item.product_name}</Text>
                      <Text>{item.pharmacy_name}</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableHighlight
                          style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#FF7276', marginRight: 10, alignItems: 'center', justifyContent: 'center'}}
                        >
                          <Text style={{fontWeight: 'bold', color: '#ffffff'}}>-</Text>
                        </TouchableHighlight>
                        <Text>{item.cart_product_qty}</Text>
                        <TouchableHighlight
                          style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#00BE62', marginLeft: 10, alignItems: 'center', justifyContent: 'center'}}
                        >
                          <Text style={{fontWeight: 'bold', color: '#ffffff'}}>+</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                        <Text numberOfLines={1} ellipsizeMode='tail'>{item.product_price}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
            :
              null
          }
        </ScrollView>
        <View style={{bottom: 30, width: '100%', padding: 10}}>
          <TouchableHighlight
          disabled={cartItems ? true : false}
          style={{
            height: 50,
            borderRadius: 10,
            backgroundColor: '#459D74',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => addOrder()}>
            <Text style={{color: '#ffffff'}}>Check Out</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  const OrderHstory = () => {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
  
  return (
      <Tab.Navigator
        screenOptions={{
          //tabBarIndicatorStyle: {backgroundColor: 'red'}
        }}
        style={{marginTop: Platform.OS === 'ios' ? 60 : 0}}
      >
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Order History" component={OrderHstory} />
      </Tab.Navigator>
  )
}