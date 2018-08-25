import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';

import {colors,fonts} from './../config/Constants';

const Toolbar=(props)=>{
  return(
    <View style={styles.container}>
        <Text style={styles.title}>
          {props.title}
        </Text>

        <TouchableOpacity style={styles.backContainer} onPress={()=>Actions.pop()} activeOpacity={.4}>
          <Icon style={styles.back} name='angle-left' size={25}/>
        </TouchableOpacity>
    </View>
  )
}

export default Toolbar;

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:Platform.OS === 'ios' ? 65 : 60,
    paddingTop:Platform.OS === 'ios' ? 15 : 0,
    backgroundColor:colors.primary,
    elevation:4,
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowOffset:{width:0,height:.2},
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden'
  },
  title:{
    fontSize:18,
    fontFamily:'IRANSansMobile',
    color:'white'
  },
  backContainer:{
    position:'absolute',
    left:0,
    marginLeft:10,
    top:Platform.OS === 'ios' ? 22 : 15
  },
  back:{
    color:'white'
  }
})
