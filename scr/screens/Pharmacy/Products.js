import { Text, View, ScrollView, Touchable, TouchableHighlight, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { styles } from '../../public/Style'
import { 
    Input,
    Button,
    Icon,
    Tab,
    TabView,
    FAB,
    Overlay
} from '@rneui/themed'
import * as SQLite from 'expo-sqlite'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';

const db = SQLite.openDatabase('main.db');

export default function Products({navigation}) {
    const [index, setIndex] = useState(0);
    const [addProductVisible, setAddProductVVisible] = useState(false);
    const [addCategoryVisible, setAddCategoryVisible] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [productPhoto, setProductPhoto] = useState();
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [categoryID, setCategoryID] = useState();
    const [productQuantity, setProductQuantity] = useState();

    const toggleAddProduct = () => {
        setAddProductVVisible(!addProductVisible);
    };
    const toggleAddCategory = () => {
        setAddCategoryVisible(!addCategoryVisible);
    };

    const addCategory = (category_name) => {
        try {
            db.transaction((txt) => {
                txt.executeSql(
                    "CREATE TABLE IF NOT EXISTS categories (category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_name TEXT);"
                );
                txt.executeSql("INSERT INTO categories (category_name) VALUES (?)", [category_name]);
            })
            alert('Added Category Sucessfully!');
            setCategoryName();
            toggleAddCategory();
            getCategories();
        } catch(e) {
            console.log(e);
        }
    }
    const getCategories = () => {
        try {
            db.transaction((txt) => {
                txt.executeSql("CREATE TABLE IF NOT EXISTS categories (category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_name TEXT);");
                txt.executeSql("SELECT * FROM categories", [], (_, {rows}) => {
                    var len = rows.length;
                    setCategories([]);
                    for (let i = 0; i < len; i++) {
                        setCategories(oldArray => [...oldArray, rows.item(i)])
                    }
                });
            })
        } catch(e) {
            console.log(e);
        }
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          base64: true,
        });
    
        setProductPhoto(result.assets[0].base64);
    };
    const addProduct = (product_name, price, category_id, quantity) => {
        try {
            db.transaction((txt) => {
                txt.executeSql(
                    "CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_photo TEXT, product_name TEXT, price DECIMAL(20,2), category_id INTEGER, quantity INTEGER);"
                );
                txt.executeSql("INSERT INTO products (product_photo, product_name, price, category_id, quantity) VALUES (?,?,?,?,?)", [productPhoto, product_name, price, category_id, quantity]);
            })
            alert('Added Product Sucessfully!');
            toggleAddProduct();
            getProducts();
        } catch(e) {
            console.log(e);
        }
    }
    const getProducts = () => {
        try {
            db.transaction((txt) => {
                txt.executeSql(
                    "CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_photo TEXT, product_name TEXT, price DECIMAL(20,2), category_id INTEGER, quantity INTEGER);"
                );
                txt.executeSql("SELECT * FROM products", [], (_, {rows}) => {
                    var len = rows.length;
                    setProducts([]);
                    for (let i = 0; i < len; i++) {
                        setProducts(oldArray => [...oldArray, rows.item(i)])
                    }
                });
            })
        } catch(e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getCategories();
        getProducts();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.home_header}>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    onPress={() => navigation.goBack()}
                    style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#c3c3c3', alignItems: 'center', justifyContent: 'center'}}
                >
                    <Image source={require('../../../assets/arrow-small-left.png')} style={{height: 25, width: 25}}/>
                </TouchableHighlight>
                <Text>PHARMACY NAME</Text>
                <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#00BE62'}}/>
            </View>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: '#00BE62',
                    height: 5
                }}
                containerStyle={{borderTopWidth: 1, borderColor: '#00BE62'}}
            >
                <Tab.Item
                    title="Products"
                    titleStyle={(active) => ({
                        //fontSize: 12,
                        color: active ? '#00BE62' : '#000'
                    })}
                />
                <Tab.Item
                    title="Category"
                    titleStyle={(active) => ({
                        //fontSize: 12,
                        color: active ? '#00BE62' : '#000'
                    })}
                />
                <Tab.Item
                    title="Sold Out"
                    titleStyle={(active) => ({
                        //fontSize: 12,
                        color: active ? '#00BE62' : '#000'
                    })}
                />
            </Tab>
            <View style={{flex: 1, width: '100%'}}>
                <TabView value={index} onChange={setIndex} animationType="spring">
                    <TabView.Item style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
                        <>
                            <ScrollView style={{width: '100%'}} contentContainerStyle={{flexGrow: 1}}>
                                <View
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        alignItems: 'center',
                                        padding: 10
                                    }}
                                >
                                    {products.map((product, key) => {
                                        return (
                                            <TouchableHighlight
                                                key={key}
                                                underlayColor={'#aaffd6'}
                                                style={styles.product_card}
                                                onPress={() => console.log('pressed')}
                                            >
                                                <>
                                                    <Image source={{ uri: 'data:image/jpg;base64,' + product.product_photo }} style={styles.product_photo}/>
                                                    <View style={{flex: 1, padding: 10}}>
                                                        <Text style={{fontSize: 18}}>{product.product_name}</Text>
                                                        <Text style={{color: '#c3c3c3'}}>500mg</Text>
                                                        <Text style={{fontSize: 18}}>Price {product.price}</Text>
                                                        <Text style={{fontSize: 18}}>Stocks {product.quantity}</Text>
                                                    </View>
                                                </>
                                            </TouchableHighlight>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                            <FAB
                                visible={true}
                                placement="right"
                                icon={{ name: 'add', color: 'white' }}
                                color="#00BE62"
                                onPress={toggleAddProduct}
                            />
                        </>
                    </TabView.Item>
                    <TabView.Item style={{width: '100%' }}>
                        <>
                            <ScrollView style={{width: '100%'}} contentContainerStyle={{flexGrow: 1}}>
                                <View
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        alignItems: 'center',
                                        padding: 10
                                    }}
                                >
                                    {categories.map((category, key) => {
                                        return (
                                            <TouchableHighlight
                                                key={key}
                                                underlayColor={'#aaffd6'}
                                                style={styles.product_category_card}
                                                onPress={() => console.log(category)}
                                            >
                                                <Text>{category.category_name}</Text>
                                            </TouchableHighlight>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                            <FAB
                                visible={true}
                                placement="right"
                                icon={{ name: 'add', color: 'white' }}
                                color="#00BE62"
                                onPress={toggleAddCategory}
                            />
                        </>
                    </TabView.Item>
                    <TabView.Item style={{width: '100%' }}>
                        
                    </TabView.Item>
                </TabView>
            </View>
            <Overlay
                isVisible={addProductVisible}
                onBackdropPress={toggleAddProduct}
                overlayStyle={{width: '80%'}}
            >
                <TouchableHighlight
                    underlayColor={'#16a861'}
                    style={{
                        backgroundColor: '#00BE62',
                        width: '100%',
                        height: 150,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10
                    }}
                    onPress={() => pickImage()}
                >
                    {productPhoto ?
                        <Image
                            source={{ uri: 'data:image/jpg;base64,' + productPhoto }}
                            style={{width: '100%', height: '100%', borderRadius: 5}}
                        />
                    :
                        <Image
                            source={require('.././../../assets/plus.png')}
                            style={{width: 50, height: 50, tintColor: '#fff'}}
                        />
                    }
                </TouchableHighlight>
                <View style={styles.field_container}>
                    <Text style={styles.form_field_label}>Product Name</Text>
                    <Input
                        value={productName}
                        renderErrorMessage={false}
                        inputStyle={{marginLeft: 10, marginRight: 10}}
                        inputContainerStyle={styles.form_field}
                        onChangeText={(e) => setProductName(e)}
                    />
                </View>
                <View style={styles.field_container}>
                    <Text style={styles.form_field_label}>Retail Price</Text>
                    <Input
                        value={productPrice}
                        renderErrorMessage={false}
                        inputStyle={{marginLeft: 10, marginRight: 10}}
                        inputContainerStyle={styles.form_field}
                        onChangeText={(e) => setProductPrice(e)}
                    />
                </View>
                <View style={styles.field_container}>
                    <Text style={styles.form_field_label}>Category</Text>
                    <SelectDropdown
                        data={categories}
                        defaultButtonText='Select Category'
                        search={true}
                        buttonStyle={{
                            width: '93%',
                            borderWidth: 1,
                            borderColor: '#a3a3a3',
                            backgroundColor: '#fff',
                            height: 40, borderRadius: 10
                        }}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem.category_id, selectedItem.category_name)
                            setCategoryID(selectedItem.category_id);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.category_name
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.category_name
                        }}
                    />
                </View>
                <View style={styles.field_container}>
                    <Text style={styles.form_field_label}>Quantity</Text>
                    <Input
                        value={productQuantity}
                        renderErrorMessage={false}
                        inputStyle={{marginLeft: 10, marginRight: 10}}
                        inputContainerStyle={styles.form_field}
                        onChangeText={(e) => setProductQuantity(e)}
                    />
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'space-around', marginBottom: 20, marginTop: 20}}>
                    <Button
                        title="Add"
                        color={'#00BE62'}
                        containerStyle={{width: '40%'}}
                        onPress={() => addProduct(productName, productPrice, categoryID, productQuantity)}
                    />
                    <Button
                        title="Cancel"
                        type='outline'
                        buttonStyle={{borderColor: '#00BE62'}}
                        titleStyle={{color: '#00BE62'}}
                        containerStyle={{width: '40%'}}
                        onPress={() => toggleAddProduct()}
                    />
                </View>
            </Overlay>
            <Overlay
                isVisible={addCategoryVisible}
                onBackdropPress={toggleAddCategory}
                overlayStyle={{width: '80%'}}
            >
                
                <View style={styles.field_container}>
                    <Text style={styles.form_field_label}>Category Name</Text>
                    <Input
                        renderErrorMessage={false}
                        inputStyle={{marginLeft: 10, marginRight: 10}}
                        inputContainerStyle={styles.form_field}
                        value={categoryName}
                        onChangeText={(e) => setCategoryName(e)}
                    />
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'space-around', marginBottom: 20, marginTop: 20}}>
                    <Button
                        title="Add"
                        color={'#00BE62'}
                        containerStyle={{width: '40%'}}
                        onPress={() => addCategory(categoryName)}
                    />
                    <Button
                        title="Cancel"
                        type='outline'
                        buttonStyle={{borderColor: '#00BE62'}}
                        titleStyle={{color: '#00BE62'}}
                        containerStyle={{width: '40%'}}
                        onPress={() => toggleAddCategory()}
                    />
                </View>
            </Overlay>
        </View>
    )
}