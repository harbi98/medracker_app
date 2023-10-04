import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from '../../public/Style'
import { 
  Input,
  Button,
  Icon
} from '@rneui/themed'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <View  style={styles.tab_container}>
          <View style={styles.home_header}>
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#00BE62'}}/>
            <View style={{flex: 1}}>
              <Input
                rightIcon={<Icon type='antdesign' name="search1" color="grey"/>}
                rightIconContainerStyle={{marginRight: 5}}
                renderErrorMessage={false}
                inputStyle={{marginLeft: 10, marginRight: 10}}
                inputContainerStyle={styles.form_field}
                placeholder='Search...'
              />
            </View>
            <View style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
              <Icon type='antdesign' name="setting" size={30}/>
            </View>
          </View>
          <View style={styles.home_content}>
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='entypo' name="back-in-time" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Recent</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={[styles.medicine_card, styles.last_medicine_card]}>

                    </View>
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View>
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='fontisto' name="fire" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Popular Medicine</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={[styles.medicine_card, styles.last_medicine_card]}>

                    </View>
                  </View>
                </ScrollView>
                <View style={styles.scroll_indicator}>
                  <Icon type='entypo' name="chevron-right" size={30} color='#00BE62'/>
                </View>
              </View>
            </View>
            <View style={styles.home_section}>
              <View style={styles.section_title_container}>
                <Icon type='materialicons' name="local-pharmacy" size={30} color='#00BE62'/>
                <Text style={styles.section_title_label}>Pharmacy</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView horizontal={true}>
                  <View style={styles.section_cards_container}>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={styles.medicine_card}>

                    </View>
                    <View style={[styles.medicine_card, styles.last_medicine_card]}>

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