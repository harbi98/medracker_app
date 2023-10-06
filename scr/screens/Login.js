import { ScrollView, View, Text, SafeAreaView, Image, TouchableHighlight, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../public/Style'
import { 
    Input,
    CheckBox,
    Button,
    Icon
} from '@rneui/themed'

export default function Login({navigation}) {
    const [check1, setCheck1] = useState(false);
    const [accType, setAccType] = useState('customer');

    const handleSelectAccountType = (acc_type) => {
        setAccType(acc_type);
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'dark-content'}
            />
            <ScrollView style={{width: '100%'}}>
                <View style={{alignItems: 'center', paddingBottom: 10}}>
                    <View style={styles.auth_page_logo}>
                        
                    </View>
                    <View style={styles.choose_account_container}>
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
                    </View>
                    <View style={styles.form_container}>
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                                <Input
                                    renderErrorMessage={false}
                                    placeholder='Email Address'
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
                                checked={check1}
                                containerStyle={styles.checkbox}
                                onPress={() => setCheck1(!check1)}
                            />
                            <Text onPress={() => setCheck1(!check1)}>Remember me</Text>
                        </View>
                        <View style={styles.field_container}>
                            {accType === 'customer' ?
                                    <Button
                                        buttonStyle={styles.login_button}
                                        containerStyle={{padding: 5, width: '100%'}}
                                        type="solid"
                                        onPress={() => navigation.navigate('CustomerDashboard')}
                                    >
                                        <Icon type='antdesign' name="login" color="white" />
                                        <Text style={styles.login_button_title}>Log In (Customer)</Text>
                                    </Button>
                                :
                                    null
                            }
                            {accType === 'pharmacy' ?
                                    <Button
                                        buttonStyle={styles.login_button}
                                        containerStyle={{padding: 5, width: '100%'}}
                                        type="solid"
                                        onPress={() => navigation.navigate('PharmacyDashboard')}
                                    >
                                        <Icon type='antdesign' name="login" color="white" />
                                        <Text style={styles.login_button_title}>Log In (Pharmacy)</Text>
                                    </Button>
                                :
                                    null
                            }
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