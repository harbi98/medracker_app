import { Platform, StatusBar, Dimensions, StyleSheet } from 'react-native';
export const window_width = Dimensions.get('window').width;
export const window_height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 0,
        paddingTop: 0,
        backgroundColor: '#ffffff',
        width: window_width
    },
    tabs_container: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 0,
        paddingTop: 0,
        backgroundColor: '#ffffff',
        width: window_width,
        marginBottom: 50
    },
    tab_container: {
        flex: 1
    },
    auth_page_logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#00BE62',
        marginTop: 30
    },
    form_container: {
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    field_container: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
    },
    form_field_label: {
        marginLeft: 10,
        marginBottom: 5
    },
    form_field: {
        borderRadius: 10,
        width: '100%'
    },
    search_location_field: {
        width: '100%',
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderBottomWidth: 0,
    },
    input_icon: {
        width: 24,
        height: 24
    },
    flexend_container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        paddingRight: 10
    },
    checkbox_container: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        paddingRight: 10
    },
    checkbox: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    login_button: {
        borderRadius: 20,
        backgroundColor: '#198754',
        elevation: 3,
    },
    register_button: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        elevation: 3
    },
    login_button_title: {
        color: '#FFFFFF',
        marginLeft: 5
    },
    register_button_title: {
        color: '#198754',
        marginLeft: 5
    },
    form_options_container: {
        width: '90%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    home_header: {
        width: window_width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    navigation_header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    home_content: {
        flex: 1,
        width: '100%'
    },
    home_section: {
        width: '100%',
        height: 250,
        marginBottom: 10,
    },
    home_section_long: {
        width: '100%',
        height: 300,
        marginBottom: 10,
    },
    home_title: {
        fontSize: 18,
        marginLeft: 10
    },
    home_options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 10,
        width: window_width
    },
    home_option_button: {
        height: (window_width / 4) - 25,
        width: (window_width / 4) - 25,
        borderRadius: ((window_width / 4) - 25) / 2,
        backgroundColor: '#fff',
        marginBottom: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    section_title_container: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    section_title_label: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft: 8
    },
    scroll_indicator: {
        height: '100%',
        justifyContent: 'center',
        padding: 5
    },
    section_cards_container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
    },
    section_tutorial_container: {
        flex: 1,
        padding: 10,
    },
    medicine_card: {
        flex: 1,
        width: 150,
        borderRadius: 10,
        marginRight: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: '#ffffff'
    },
    medicine_image: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    pharmacy_card: {
        flex: 1,
        width: 150,
        borderRadius: 10,
        marginRight: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: '#ffffff'
    },
    pharmacy_image: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    last_medicine_card: {
        marginRight: 0,
    },
    tutorial_card: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        marginRight: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: '#FFFFFF'
    },
    recent_transaction_card: {
        height: '100%',
        width: 150,
        borderRadius: 10,
        marginRight: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: '#FFFFFF'
    },
    last_recent_transaction_card: {
        marginRight: 0,
    },
    product_card: {
        flexDirection: 'row',
        borderRadius: 5,
        width: '100%',
        height: 120,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    product_photo: {
        height: '100%',
        width: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    product_category_card: {
        flexDirection: 'row',
        borderRadius: 5,
        width: '100%',
        padding: 20,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center'
    },
    choose_account_container: {
        width: '90%',
        alignItems: 'center',
        marginTop: 15
    },
    account_selection_container: {
        justifyContent: 'space-evenly',
        width: '100%',
        flexDirection: 'row',
    },
    account_selection_title: {
        fontSize: 24,
        color: '#198754',
        marginBottom: 15,
    },
    account_type_card: {
        height: 150,
        width: 150,
        padding: 25,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        backgroundColor: '#FFFFFF'
    },
    account_type_card_active: {
        height: 150,
        width: 150,
        padding: 25,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#198754',
        backgroundColor: '#FFFFFF'
    },
    account_type_icon: {
        width: '100%',
        height: '100%'
    },
    search_block: { 
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 5,
        right: 5,
        left: 5,
        zIndex: 1
    },
    results_block: {
        maxHeight: 200,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10

    }
});