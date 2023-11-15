import { Text, View, ScrollView, Touchable, TouchableHighlight, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
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
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';

const db = SQLite.openDatabase('main.db');

export default function Products({navigation}) {
    const { token, pharmacyId } = useContext(AuthContext);

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

    const addCategory = () => {
        try{
            fetch(BASE_URL+'add-category',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: categoryName,
                })
            })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                alert(data.message);
                getCategories();
                toggleAddCategory();
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e){
            console.log(e);
        }
    }
    const getCategories = () => {
        try{
            fetch(BASE_URL+'categories',{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                setCategories(data.data);
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e){
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
    const addProduct = () => {
        try{
            fetch(BASE_URL+'add-product',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: pharmacyId,
                    name: productName,
                    details: 'test',
                    price: productPrice,
                    photo: 'test.jpg',
                    category_id: categoryID,
                    quantity: productQuantity,
                })
            })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                alert(JSON.stringify(data.message));
                toggleAddProduct();
                setProductName();
                setProductPrice();
                setCategoryID();
                setProductQuantity();
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e){
            console.log(e);
        }
    }
    const getProducts = () => {
        try{
            fetch(BASE_URL+'product-store/2',{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                setProducts(data.data);
            })
            .catch((e) => {
                console.log(e);
            })
        } catch (e){
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
                                                    <Image source={{uri: product.photo}} style={styles.product_photo}/>
                                                    <View style={{flex: 1, padding: 10}}>
                                                        <Text style={{fontSize: 18, marginBottom: 10}}>{product.name}</Text>
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
                                                <Text>{category.name}</Text>
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
                            console.log(selectedItem.id, selectedItem.name)
                            setCategoryID(selectedItem.id);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.name
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