import { ScrollView, View, Text, SafeAreaView, Image, StatusBar, TouchableHighlight } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../public/Style'
import { 
    Input,
    Button,
    Icon
} from '@rneui/themed'

export default function Register({navigation}) {
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
                <View  style={{alignItems: 'center', paddingBottom: 10}}>
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
                                placeholder='Full Name'
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
                        <View style={styles.field_container}>
                            <View style={{flex: 1}}>
                            <Input
                                renderErrorMessage={false}
                                placeholder='Confirm Password'
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
                        <View style={styles.field_container}>
                            <Button
                                buttonStyle={styles.login_button}
                                containerStyle={{padding: 5, width: '100%'}}
                                type="solid"
                                onPress={() => navigation.navigate('Login')}
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