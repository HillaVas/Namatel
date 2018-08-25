import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import {colors} from './../config/Constants'

const Toolbar =(props)=>{
  return(
      <View style={styles.container}>
          <Text style={styles.title}>
            {props.title}
          </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:Platform.OS === 'ios' ? 65 : 60,
    backgroundColor:colors.primary,
    alignItems:'center',
    justifyContent:'center',
    paddingTop:Platform.OS === 'ios' ? 15 : 0,
    elevation:4,
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:.2}
  },
  title:{
    fontSize:18,
    fontFamily:'IRANSansMobile',
    color:'white'
  }
});

export default Toolbar;
