import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Animated,
  Linking,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Utils from './../config/Utils';

import {colors,fonts} from './../config/Constants';

const {width,height} = Dimensions.get('window')

const offset = (Platform.OS === 'android') ? -250 : 0

export default class Login extends React.Component {

  constructor(){
    super();
    this.state={
      number:'',
      code:'',
      loading:false,
      inputState:'number',
      editable:true,
      xyNumber : new Animated.ValueXY({x:0,y:-height/3}),
      opacityNumber : new Animated.Value(0)
    }
  }

  //3 methods below are used for Deeplinking VIA url
  componentDidMount() {
    console.log('Logging component did mount');
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        //this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }

    AsyncStorage.getItem('user_info').then((value)=>{
      console.log(value);
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    Actions.splash()
  }

  //Animated input view up
  showInput(){
    Animated.timing(this.state.xyNumber,{
      toValue:{x:0,y:height/300},
      duration:500
    }).start()
    Animated.timing(this.state.opacityNumber,{
      toValue:1,
      duration:600
    }).start()
  }

  hideInput(){
    Animated.timing(this.state.xyNumber,{
      toValue:{x:0,y:-height/3},
      duration:500
    }).start()
    Animated.timing(this.state.opacityNumber,{
      toValue:0,
      duration:400
    }).start()
  }

  render(){

    return(
      <KeyboardAvoidingView
        keyboardVerticalOffset={offset}
        style={{flex:1}} behavior="padding" enabled>

        <Animated.View style={styles.container}>

          <Image style={styles.bgImage} source={require('./../assets/graphics/splash_bg.jpg')} />

          <Animated.View
            style={[
              styles.inputContainer,
              this.state.xyNumber.getLayout(),
              {opacity:this.state.opacityNumber}]}>

            {this.renderInputComponent()}

            <TouchableOpacity style={styles.button} onPress={()=>this.handleRequestClick()} activeOpacity={.8}>
              {this.renderButtonContent()}
            </TouchableOpacity>

          </Animated.View>

          <TouchableOpacity style={styles.logoContainer} onLongPress={()=>{this.hideInput()}}  onPress={()=>this.showInput()} activeOpacity={.6}>
            <Image style={styles.logo} source={require('./../assets/graphics/logo.png')} />
          </TouchableOpacity>

        </Animated.View>
      </KeyboardAvoidingView>
    )
  }

  changeInputState(state){
    this.setState({
      inputState : state
    })
  }

  renderInputComponent(){
    if (this.state.inputState === 'number') {
      return(
        <TextInput
          style={styles.input}
          maxLength={11}
          placeholder='۰۹۱۰۱۱۱۲۲۳۳'
          keyboardType='phone-pad'
          returnKeyType='go'
          value={this.state.number}
          editable={this.state.editable}
          underlineColorAndroid='white'
          onChangeText={(number) => this.setState({number})}
        />
      )
    } else {
      return(
        <TextInput
          style={styles.input}
          maxLength={4}
          placeholder='کد چهار رقمی'
          keyboardType='phone-pad'
          returnKeyType='go'
          value={this.state.code}
          underlineColorAndroid='white'
          onChangeText={(code) => this.setState({code})}
          enabled={true}
        />
      )
    }
  }

  renderButtonContent(){
    if (!this.state.loading)
      return <Text style={styles.buttonText}>{this.state.inputState === 'number' ? 'ارسال کد' : 'بررسی'}</Text>
    else
      return <ActivityIndicator size="small" color="white"/>
  }

  handleRequestClick(){
    if (this.state.inputState === 'number') {
      this.sendSMSRequest()
    } else this.checkSMSCode()
  }

  sendSMSRequest(){

    this.setState({
      loading:true,
      editable:false
    })

    fetch('https://api.namatel.com/api-user.php?action=sign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.number,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        this.hideInput()

        setTimeout(()=>{
          this.changeInputState('code')
          this.showInput()
        },700);

        this.setState({
          loading:false,
          editable:true
        })

        user = {
          number : this.state.number
        }


    }).catch((error) => {
      console.error(error);

      this.setState({
        loading:false
      })

    });
  }

  checkSMSCode(){

    this.setState({
      loading:true,
      editable:false
    })

    fetch('https://api.namatel.com/api-user.php?action=token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.number,
        token: this.state.code
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        this.setState({
          loading:false,
        })

        user = {
          number : this.state.number,
          uid : responseJson.result_user_token.uid
        }

        AsyncStorage.setItem('user',JSON.stringify(user)).then(()=>{
          Actions.splash()
        })

    }).catch((error) => {
      console.error(error);

      this.setState({
        loading:false
      })

    });

  }

  //When user inputs number wrong
  resetInputs(){

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column-reverse',
    alignItems:'center'
  },
  bgImage:{
    resizeMode:'cover',
    width:width,
    height:height,
    position:'absolute'
  },
  inputContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    paddingHorizontal:10,
    backgroundColor:colors.primary,
    width:80,
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    shadowOpacity:.3,
    shadowColor:'black',
    shadowOffset:{width:0,height:.2},
    elevation:4,
    marginBottom:Platform.OS === 'ios' ? 100:50
  },
  buttonText:{
    ...fonts.normal,
    fontSize:15,
    color:'white'
  },
  input:{
    width:width-30,
    paddingHorizontal:25,
    height:60,
    backgroundColor:'white',
    borderRadius:10,
    marginVertical:5,
    fontSize:18,
    color:colors.text,
    ...fonts.normal
  },
  logoContainer:{
    backgroundColor:colors.primaryHue,
    marginBottom:100,
    padding:20,
    borderRadius:70,
    overflow:'hidden',
    shadowColor:'black',
    shadowOpacity:.9,
    shadowOffset:{width:0,height:1}
  },
  logo:{
    width:100,
    height:100,
    resizeMode:'contain'
  }
})
