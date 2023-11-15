import { ScrollView, View, Text, SafeAreaView, Image, TouchableHighlight, StatusBar } from 'react-native'
import React, { useState, useContext } from 'react'
import { styles, window_height, window_width } from '../public/Style'
import { AuthContext } from '../context/AuthContext'
import { 
    Input,
    CheckBox,
    Button,
    Icon
} from '@rneui/themed'

export default function Login({navigation}) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [check, setCheck] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'#ffffff'}
            />
            <ScrollView style={{width: '100%'}}>
                <View style={{alignItems: 'center', paddingBottom: 10, marginTop: window_height * 0.05}}>
                    <View style={styles.auth_page_logo}>
                        
                    </View>
                    {/* <View style={styles.choose_account_container}>
                        <Text style={styles.account_selection_title}>Choose Account Type</Text>
                        <View style={styles.account_selection_container}>
                            <TouchableHighlight
                                underlayColor='#d3d3d3'
                                style={accType === 'customer' ? styles.account_type_card_active : styles.account_type_card}
                                onPress={() => handleSelectAccountType('customer')}
                            >
                                <>
                                    <Image style={styles.account_type_icon} source={require('../../assets/patient.png')}/>
                                    <Text>Customer</Text>
                                </>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor='#d3d3d3'
                                style={accType === 'pharmacy' ? styles.account_type_card_active : styles.account_type_card}
                                onPress={() => handleSelectAccountType('pharmacy')}
                            >
                                <>
                                    <Image style={styles.account_type_icon} source={require('../../assets/drugstore.png')}/>
                                    <Text>Pharmacy</Text>
                                </>
                            </TouchableHighlight>
                        </View>
                    </View> */}
                    <View style={styles.form_container}>
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
                                value={password}
                                onChangeText={(e) => setPassword(e)}
                                secureTextEntry={true}
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
                        <View style={styles.flexend_container}>
                            <Text>Forgot Password?</Text>
                        </View>
                        <View style={styles.checkbox_container}>
                            <CheckBox
                                checked={check}
                                containerStyle={styles.checkbox}
                                onPress={() => setCheck(!check)}
                            />
                            <Text onPress={() => setCheck(!check)}>Remember me</Text>
                        </View>
                        <View style={styles.field_container}>
                        <Button
                            buttonStyle={styles.login_button}
                            containerStyle={{padding: 5, width: '100%'}}
                            type="solid"
                            onPress={() => login(email, password)}
                        >
                            <Icon type='antdesign' name="login" color="white" />
                            <Text style={styles.login_button_title}>Log In</Text>
                        </Button>
                        </View>
                    </View>
                    <View style={styles.form_options_container}>
                        <View style={{width: '100%', marginBottom: 20}}>
                            <Button buttonStyle={styles.register_button} containerStyle={{padding: 5, width: '100%'}} type="solid" onPress={() => navigation.navigate('Register')}>
                                <Icon type='antdesign' name="form" color="#198754" />
                                <Text style={styles.register_button_title}>Sign Up</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}