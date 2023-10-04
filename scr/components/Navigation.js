import { Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import CustomerDashboard from '../screens/Customer/BottomTab'
import PharmacyDashboard from '../screens/Pharmacy/BottomTab'
import PharmacyProducts from '../screens/Pharmacy/Products'

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
            <Stack.Screen name='CustomerDashboard' component={CustomerDashboard} options={{headerShown: false}}/>
            <Stack.Screen name='PharmacyDashboard' component={PharmacyDashboard} options={{headerShown: false}}/>
            <Stack.Screen name='PharmacyProducts' component={PharmacyProducts} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}