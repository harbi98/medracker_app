import { ScrollView, View, Text, SafeAreaView, Image, StatusBar, TouchableHighlight } from 'react-native'
import React, {useState, useContext} from 'react'
import { styles, window_width, window_height } from '../public/Style'
import { AuthContext } from '../context/AuthContext'
import { 
    Input,
    Button,
    Icon
} from '@rneui/themed'

export default function Register({navigation}) {
    const { register } = useContext(AuthContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [addess, setAddress] = useState();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'#ffffff'}
            />
            <ScrollView style={{width: '100%'}}>
                <View  style={{alignItems: 'center', paddingBottom: 10, marginTop: window_height * 0.05}}>
                    <View style={styles.auth_page_logo}>
                            
                    </View>
                    <View style={styles.form_container}>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                                <Input
                                    renderErrorMessage={false}
                                    placeholder='First Name'
                                    value={firstName}
                                    onChangeText={(e) => setFirstName(e)}
                                    leftIcon={
                                        <Image
                                            source={require('../../assets/user.png')}
                                            style={styles.input_icon}
                                        />
                                    }
                                    inputContainerStyle={styles.form_field}
                                />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                                <Input
                                    renderErrorMessage={false}
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChangeText={(e) => setLastName(e)}
                                    leftIcon={
                                        <Image
                                            source={require('../../assets/user.png')}
                                            style={styles.input_icon}
                                        />
                                    }
                                    inputContainerStyle={styles.form_field}
                                />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                                <Input
                                    renderErrorMessage={false}
                                    placeholder='Email Address'
                                    value={email}
                                    onChangeText={(e) => setEmail(e)}
                                    leftIcon={
                                        <Image
                                            source={require('../../assets/envelope-outline.png')}
                                            style={styles.input_icon}
                                        />
                                    }
                                    inputContainerStyle={styles.form_field}
                                />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                            <Input
                                renderErrorMessage={false}
                                placeholder='Password'
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(e) => setPassword(e)}
                                leftIcon={
                                    <Image
                                        source={require('../../assets/lock.png')}
                                        style={styles.input_icon}
                                    />
                                }
                                inputContainerStyle={styles.form_field}
                            />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                            <Input
                                renderErrorMessage={false}
                                placeholder='Confirm Password'
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={(e) => setConfirmPassword(e)}
                                leftIcon={
                                    <Image
                                        source={require('../../assets/lock.png')}
                                        style={styles.input_icon}
                                    />
                                }
                                inputContainerStyle={styles.form_field}
                            />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                            <Input
                                renderErrorMessage={false}
                                placeholder='Contact Number'
                                value={contactNumber}
                                onChangeText={(e) => setContactNumber(e)}
                                leftIcon={
                                    <Image
                                        source={require('../../assets/hastag.png')}
                                        style={styles.input_icon}
                                    />
                                }
                                inputContainerStyle={styles.form_field}
                            />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                            <Input
                                renderErrorMessage={false}
                                placeholder='Address'
                                value={addess}
                                onChangeText={(e) => setAddress(e)}
                                leftIcon={
                                    <Image
                                        source={require('../../assets/lock.png')}
                                        style={styles.input_icon}
                                    />
                                }
                                inputContainerStyle={styles.form_field}
                            />
                            </View>
                        </View>
                        <View style={styles.field_container}>
                            <Button
                                buttonStyle={styles.login_button}
                                containerStyle={{padding: 5, width: '100%'}}
                                type="solid"
                                onPress={() => register(firstName, lastName, email, password, confirmPassword, contactNumber, addess)}
                            >
                                <Icon type='antdesign' name="form" color="#FFFFFF" />
                                <Text style={styles.login_button_title}>Sign Up</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.form_options_container}>
                        <View style={{width: '100%', marginBottom: 20}}>
                            <Button
                                buttonStyle={styles.register_button}
                                containerStyle={{padding: 5, width: '100%'}}
                                type="solid"
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Icon type='antdesign' name="login" color="#198754" />
                                <Text style={styles.register_button_title}>Sign In</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}