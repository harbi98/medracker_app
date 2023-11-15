import { View, Text, Button, TouchableHighlight } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { styles } from '../public/Style'
import { BASE_URL, processResponse } from '../config'
import { AuthContext } from '../context/AuthContext'

export default function ProductDetails({navigation, route}) {
    const {product_id} = route.params;
    const { token, userId } = useContext(AuthContext);
    const [productDetails, setProductDetails] = useState();

    const getProductDetails = () => {
        try{
            fetch(BASE_URL+'product/'+product_id,{
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
                setProductDetails(data.data);
            })
            .catch((e) => {
                console.log(e);
            })
          } catch (e){
              console.log(e);
          }
    }
    const addCart = () => {
        try{
            fetch(BASE_URL+'add-cart',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: product_id,
                    product_qty: 1
                })
            })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                alert(data.message);
            })
            .catch((e) => {
                console.log(e);
            })
          } catch (e){
              console.log(e);
          }
    }
    useEffect(() => {
        getProductDetails();
    }, [])
    return (
        <View style={styles.container}>
            <View style={{flex: 1, width: '100%', padding: 20}}>
                <View style={{borderRadius: 5, elevation: 5, width: '100%', height: '100%'}}>
                    <View style={{flex: 1, borderRadius: 5, backgroundColor: '#c3c3c3', marginBottom: 10}}>
                    </View>
                    <View style={{flex: 2}}>
                        <View style={{padding: 10, paddingLeft: 0}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 5}}>{productDetails ? productDetails[0].name : ''}</Text>
                            <Text style={{fontSize: 18, color: '#ff0000'}}>{productDetails ? productDetails[0].price + ' PHP' : ''}</Text>
                        </View>
                        <View style={{flex: 1, padding: 10, paddingLeft: 0}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Description</Text>
                            <Text>{productDetails ? productDetails[0].details : ''}</Text>
                        </View>
                    </View>
                    <View style={{bottom: 10}}>
                        <TouchableHighlight
                        style={{
                            height: 50,
                            borderRadius: 10,
                            backgroundColor: '#459D74',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => addCart()}>
                            <Text style={{color: '#ffffff'}}>Add to Cart</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    )
}