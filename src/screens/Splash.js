import React from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import CommonDataManager from './../config/CommonDataManager';

import Logger from './../config/Logger';

export default class Splash extends React.Component {

  constructor(){
    super()
  }

  componentDidMount(){
    this.handleState()
  }

  render(){
    return(
      <View style={styles.container}>

        <Image style={styles.image} source={require('./../assets/graphics/logo.png')} />

        <ActivityIndicator style={{margin:10}} size="large" color="black"/>

      </View>
    )
  }

  handleState(){

    AsyncStorage.getItem('user').then((value)=>{
      let data = JSON.parse(value)

      if (data === null || data === '') {
        setTimeout(()=>{
          Actions.login()
        },3000)
      } else {
        this.makeRequest()
      }
    })
  }

  makeRequest(){
    //initiate the log session
    var logger = Logger.getInstance();

    let common = CommonDataManager.getInstance();

    fetch('https://api.namatel.com/api-home.php?action=home', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control' : 'none'
      },
    }).then((response) => response.json())
      .then((responseJson) => {

        common.setData(responseJson.result_home);

        Actions.home();

    }).catch((error) => {
      console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  image:{
    width:100,
    height:100,
    resizeMode:'contain'
  }
})
