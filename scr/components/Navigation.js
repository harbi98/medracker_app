import { Text, View } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '../context/AuthContext'
import Login from '../screens/Login'
import Register from '../screens/Register'
import CustomerDashboard from '../screens/Customer/BottomTab'
import PharmacyDashboard from '../screens/Pharmacy/BottomTab'
import PharmacyProducts from '../screens/Pharmacy/Products'
import ProductDetails from '../screens/ProductDetails'

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { token, userType } = useContext(AuthContext);
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {token ?
              <>
                {userType === 'user' ?
                    <>
                      <Stack.Screen name='CustomerDashboard' component={CustomerDashboard} options={{headerShown: false}}/>
                    </>
                  :
                    <>
                      <Stack.Screen name='PharmacyDashboard' component={PharmacyDashboard} options={{headerShown: false}}/>
                      <Stack.Screen name='PharmacyProducts' component={PharmacyProducts} options={{headerShown: false}}/>
                    </>
                }
                <Stack.Screen name='ProductDetails' component={ProductDetails} options={{title: 'Medicine Details'}}/>
              </>
            :
              <>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
              </>
          }
        </Stack.Navigator>
    </NavigationContainer>
  )
}