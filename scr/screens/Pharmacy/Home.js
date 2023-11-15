import { View, Text, ScrollView, Image, TouchableHighlight, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { styles } from '../../public/Style'
import { 
  Icon
} from '@rneui/themed'

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'#ffffff'}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <View style={styles.tab_container}>
          <View style={styles.home_header}>
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#00BE62'}}/>
            <View style={{flex: 1}}>
              <Text style={styles.home_title}>{'Pharmacy Name'.toUpperCase()}</Text>
            </View>
            <View style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../assets/headset.png')} style={{width: 25, height: 25}}/>
            </View>
            <View style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../assets/settings.png')} style={{width: 25, height: 25}}/>
            </View>
            <View style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../../assets/envelope.png')} style={{width: 25, height: 25}}/>
            </View>
          </View>
          <View style={styles.home_content}>
            <View style={styles.home_options}>
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{
                  alignItems: 'center',
                  padding: 5
                }}
                onPress={() => navigation.navigate('PharmacyProducts')}
              >
                <>
                  <View style={styles.home_option_button}>
                    <Image source={require('../../../assets/box-open-full.png')} style={{width: '60%', height: '60%'}}/>
                  </View>
                  <Text>Products</Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{
                  alignItems: 'center',
                  padding: 5
                }}
                onPress={() => console.log('pressed')}
              >
                <>
                  <View style={styles.home_option_button}>
                    <Image source={require('../../../assets/wallet.png')} style={{width: '60%', height: '60%'}}/>
                  </View>
                  <Text>Wallet</Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{
                  alignItems: 'center',
                  padding: 5
                }}
                onPress={() => console.log('pressed')}
              >
                <>
                  <View style={styles.home_option_button}>
                    <Image source={require('../../../assets/chart-line-up.png')} style={{width: '60%', height: '60%'}}/>
                  </View>
                  <Text>Performance</Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'#fff'}
                style={{
                  alignItems: 'center',
                  padding: 5
                }}
                onPress={() => console.log('pressed')}
              >
                <>
                  <View style={styles.home_option_button}>
                    <Image source={require('../../../assets/panorama.png')} style={{width: '60%', height: '60%'}}/>
                  </View>
                  <Text>Album</Text>
                </>
              </TouchableHighlight>
            </View>
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='materialicons' name="info-outline" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Learn to use MedTracker</Text>
              </View>
              <View style={styles.section_tutorial_container}>
                <View style={styles.tutorial_card}>

                </View>
              </View>
            </View>
            <View style={styles.home_section_long}>
              <View style={styles.section_title_container}>
                <Icon type='entypo' name="back-in-time" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Recent Transaction</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView style={{flex: 1}} horizontal={true}>
                  <View style={styles.section_cards_container}>
                    <View style={styles.recent_transaction_card}>

                    </View>
                    <View style={styles.recent_transaction_card}>

                    </View>
                    <View style={styles.recent_transaction_card}>

                    </View>
                    <View style={styles.recent_transaction_card}>

                    </View>
                    <View style={[styles.recent_transaction_card, styles.last_recent_transaction_card]}>

                    </View>
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}