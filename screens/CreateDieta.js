import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';
import moment from 'moment';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreateDieta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      light_theme: true,
      dropdownHeight: 40,
      button1: false,
      button2: false,
      button3: false,
      button4: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  async addStory() {
    
      let storyData = {
        preview_image: this.state.previewImage,
        cafe: this.state.cafe,
        almoco: this.state.almoco,
        lanche: this.state.lanche,
        janta: this.state.janta,
        author: firebase.auth().currentUser.displayName,
        created_on: moment().format('LL'),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(storyData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('FeedSemanal');
    
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: 'SEGUNDA',
        image_2: 'TER??A',
        image_3: 'QUARTA',
        image_4: 'QUINTA',
        image_5: 'SEXTOU',
        image_6: 'S??BADO',
        image_7: 'DOMINGO',
      };
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                Weekly diet
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Text style={styles.previewImage}>
                {preview_images[this.state.previewImage]}
              </Text>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'Segunda', value: 'image_1' },
                    { label: 'Ter??a', value: 'image_2' },
                    { label: 'Quarta', value: 'image_3' },
                    { label: 'Quinta', value: 'image_4' },
                    { label: 'Sexta', value: 'image_5' },
                    { label: 'S??BADO', value: 'image_6' },
                    { label: 'DOMINGO', value: 'image_7' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: RFValue(40),
                    marginBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: 'transparent' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{
                    backgroundColor: this.state.light_theme
                      ? '#eee'
                      : '#1f948b',
                  }}
                  labelStyle={styles.dropdownLabel}
                  arrowStyle={styles.dropdownLabel}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                />
              </View>
              <View
                style={{ marginHorizontal: RFValue(10), flexDirection: 'row' }}>
                <TextInput
                 style={[
                    this.state.button1
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(cafe) => this.setState({ cafe })}
                  placeholder={'Caf?? da manha'}
                  placeholderTextColor={
                    this.state.light_theme ? '#15193c' : 'white'
                  }
                />
                <TouchableOpacity
                  style={
                    this.state.button1
                      ? styles.buttondisable2
                      : styles.buttondisable
                  }
                  onPress={() => {
                    
                      this.state.button1  
                      ? this.setState({ button1: false }) 
                      : this.setState({ button1: true }) 
                      
                    }  }>
                  
                </TouchableOpacity>
              </View>
              <View
                style={{ marginHorizontal: RFValue(10), flexDirection: 'row' }}>
                <TextInput
                 style={[
                    this.state.button2 
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(almoco) => this.setState({ almoco })}
                  placeholder={'Almo??o'}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? '#15193c' : 'white'
                  }
                />
                <TouchableOpacity
                  style={
                    this.state.button2
                      ? styles.buttondisable2
                      : styles.buttondisable
                  }
              
                  onPress={() => {
                    
                      this.state.button2  
                      ? this.setState({ button2: false }) 
                      : this.setState({ button2: true }) 
                      
                    }  }>
                 
                </TouchableOpacity>
              </View>
              <View
                style={{ marginHorizontal: RFValue(10), flexDirection: 'row' }}>
                <TextInput
                  style={[
                    this.state.button3 
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(lanche) => this.setState({lanche})}
                  placeholder={'Lanche'}
                  multiline={true}
                  numberOfLines={20}
                  placeholderTextColor={
                    this.state.light_theme ? '#15193c' : 'white'
                  }
                />
                <TouchableOpacity
                  style={
                    this.state.button3
                      ? styles.buttondisable2
                      : styles.buttondisable
                  }
                  onPress={() => {
                    
                      this.state.button3  
                      ? this.setState({ button3: false }) 
                      : this.setState({ button3: true }) 
                  }
                    } > 
                  
                </TouchableOpacity>
              </View>
              <View
                style={{ marginHorizontal: RFValue(10), flexDirection: 'row' }}>
                <TextInput
                  style={[
                    this.state.button4 
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(janta) => this.setState({ janta })}
                  placeholder={'Janta'}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? '#15193c' : 'white'
                  }
                />
                <TouchableOpacity
                  style={
                    this.state.button4
                      ? styles.buttondisable2
                      : styles.buttondisable
                  }
                 
                  onPress={() => {
                    
                      this.state.button4  
                      ? this.setState({ button4: false }) 
                      : this.setState({ button4: true }) 
                      
                    }  
                   
                  }>
                  
                </TouchableOpacity>
              </View>
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addStory()}
                  title="Enviar"
                  color="#841584"
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f948b',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: '#15193c',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    color: 'white',
    marginLeft: 35,
    marginTop: 50,
    width: '93%',
    height: RFValue(100),
    alignItems: 'center',
    fontSize: RFValue(68),
    fontFamily: 'Bubblegum-Sans',
    justifyContent: 'center',

    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    width: '80%',
    height: RFValue(40),
    borderColor: 'gray',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontLight: {
    width: '80%',
    height: RFValue(40),
    borderColor: 'white', 
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabel: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabelLight: {
    color: '#15193c',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttondisable: {
    width: 70,
    height: 50,
    backgroundColor: '#ee8249',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttondisable2: {
    width: 70,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
