import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Logger from './../config/Logger';

import CoolImage from './../component/CoolImage';

const {width,height} = Dimensions.get('window');

import PaymentHelper from './../config/PaymentHelper'

export default class ComponentTest extends React.Component {

  componentDidMount(){
    this.initiateLogger()
  }

  render(){
    return(
      <View style={styles.container}>

        <TouchableOpacity onPress={()=>{console.log('Splash First time')}}>
          <Text>Splash first time</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          var logger = Logger.getInstance()
          logger.addVideoLogAction({action:'play'})
        }}>
          <Text>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          var logger = Logger.getInstance()
          logger.uploadLogSessions()
          logger.garbageCollect()
        }}>
          <Text>UPLOAD</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{console.log('end')}}>
          <Text>End</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>Actions.push('payment')}>
          <Text>Press to show lightbox</Text>
        </TouchableOpacity>

        {this.renderPayment()}

      </View>
    )
  }

  renderPayment(){
    return(
      <View style={{
        width:width - 20,
        height:100,
        marginHorizontal:10,
        backgroundColor:'brown',
        marginTop:40,
        justifyContent:'center',
        borderRadius:10,
        overflow:'hidden'
      }}>

        <TouchableOpacity style={{
          width:100,
          height:50,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:10,
          backgroundColor:'white',
          margin:10
        }} onPress={()=>this.makePayment()}>
          <Text>Make Payment</Text>
        </TouchableOpacity>

      </View>
    )
  }

  makePayment(){

    let payment = {
      cid : 1,
      uid : 3,
      items : [{
        id:1,
        price:1000
      },{
        id:2,
        price:2000
      }]
    }

    var helper = new PaymentHelper(payment)
    helper.printStatus()
    helper.makePayment()
  }

  renderImage(){
    <CoolImage
      style={{
        width:200,
        height:200
      }}
      source={{uri:'https://placeimg.com/620/430/any'}}
      thumbnail={{uri:'https://placeimg.com/150/130/any'}}
    />
  }

  initiateLogger(){
    var log = Logger.getInstance();

    log.addVideoLog()
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop:20
  }
})
