import React, {createContext, useState, useEffect} from 'react'
import * as Location from 'expo-location'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);

    return (
        <AuthContext.Provider value={{
            location
        }}>{children}</AuthContext.Provider>
    )
}