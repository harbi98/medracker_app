import React, {createContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../config';
import { createNavigationContainerRef } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite'
import * as Location from 'expo-location'

export const AuthContext = createContext();
const db = SQLite.openDatabase("MainDB");
export const navigationRef = createNavigationContainerRef();

export const navigate = (name) => {
  if (navigationRef.isReady()) {
    if(name != '') {
        navigationRef.navigate(name);
    } else {
        if(navigationRef.canGoBack()) {
            navigationRef.goBack();
        }
    }
  }
}

export const AuthProvider = ({children}) => {
    const [location, setLocation] = useState(null);
    const [token, setToken] = useState(null);
    const [pharmacyId, setPharmacyId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
      })();
    }, []);

    const login = async (text_email, text_password) => {
      try {
          fetch(BASE_URL+'login',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email: text_email,
                  password: text_password,
              })
          })
          .then(processResponse)
          .then(res => {
              const { statusCode, data } = res;
              //console.log(data);
              if(statusCode === 200){
                setToken(data.token);
                setUserType(data.type);
                if(data.type === 'admin') {
                  setPharmacyId(data.id)
                } else if(data.type === 'user') {
                  setUserId(data.id)
                }
                try {
                    db.transaction((txt) => {
                        txt.executeSql(
                            "CREATE TABLE IF NOT EXISTS "
                            + "token "
                            + "(User_ID INTEGER PRIMARY KEY AUTOINCREMENT, user_Token TEXT);"
                        );
                        txt.executeSql("INSERT INTO token (user_Token) VALUES (?)", [data.token]);
                    })
                } catch(error) {
                    console.log(error);
                }
            }
          })
          .catch((e) => {
              console.log(e);
              alert('Login Error!' + e);
          })
      } catch (e){
        alert(e);
      }
    }
    const register = async (fname, lname, email, password, c_password, contact_num, address) => {
      try{
          fetch(BASE_URL+'register',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fname: fname,
                lname: lname,
                type: 'user',
                email: email,
                password: password,
                c_password: c_password,
                contact_num: contact_num,
                address: address,
                lat: 7.215319,
                long: 125.440295
              })
          })
          .then(processResponse)
          .then(res => {
              const { statusCode, data } = res;
              alert(data.message);
              if(statusCode === 200) {
                navigate('Login');
              }
          })
          .catch((e) => {
              alert('Register Error' + e);
          })
      } catch (e){
          console.log(e);
      }
    }

    return (
        <AuthContext.Provider value={{
          login,
          register,
          token,
          userType,
          pharmacyId,
          userId
        }}>{children}</AuthContext.Provider>
    )
}