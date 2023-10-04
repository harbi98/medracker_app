import { ScrollView, View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { styles } from '../public/Style'
import { 
    Input,
    Button,
    Icon
} from '@rneui/themed'

export default function Register({navigation}) {
  return (
    <SafeAreaView>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.choose_account_container}>
                    <Text>Choose Account Type</Text>
                    <View style={styles.account_selection_container}>
                        <View style={styles.account_type_card}>
                            <Image style={styles.account_type_icon} source={require('../../assets/patient.png')}/>
                        </View>
                        <View style={styles.account_type_card}>
                            <Image style={styles.account_type_icon} source={require('../../assets/drugstore.png')}/>
                        </View>
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
                            // onPress={() => navigation.navigate('Login')}
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
                            // onPress={() => navigation.navigate('Login')}
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