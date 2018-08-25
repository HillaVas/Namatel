import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Toolbar from './../component/Toolbar';

const {width,height} = Dimensions.get('window');

import {colors , fonts} from './../config/Constants';

export default class Main extends React.Component {

  constructor(){
    super();
    this.state = {
      username : 'فرید صنیعی پور',
      number:'09011625853'
    }
  }

  render(){
    return(
      <View style = {{flex:1}}>

        <Toolbar title={this.props.title}/>

        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>

          <View style={styles.userData}>
            <Image source={require('./../assets/graphics/user.png')}
              style={styles.profileIcon}
            />

            <View style={styles.infoContainer}>
              <Text style={styles.title}>{this.state.username}</Text>
            </View>

          </View>

          <View style={styles.itemsContainer}>

            <View style={styles.line}/>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} name='user' size={25}/>
              </View>
              <Text style={styles.itemText}>تغییر اطلاعات کاربری</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} name='bookmark' size={25}/>
              </View>
              <Text style={styles.itemText}>علامت زده شده‌ها</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} name='camera' size={25}/>
              </View>
              <Text style={styles.itemText}>خریداری شده‌ها</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} name='credit-card' size={25}/>
              </View>
              <Text style={styles.itemText}>پرداختها</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} name='info' size={25}/>
              </View>
              <Text style={styles.itemText}>درباره‌ما</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={.7} onPress={()=>{this.logout()}}>
              <View style={styles.itemIconContainer}>
                <Icon style={styles.itemIcon} size={25}/>
              </View>
              <Text style={styles.itemText}>خروج از حساب کاربری</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>

      </View>
    )
  }

  logout(){

    AsyncStorage.setItem('user','');

    setTimeout(()=>{
      Actions.replace('splash')    
    },1000)

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  userData:{
    height:95,
    width:width-10,
    marginTop:10,
    flexDirection:'row-reverse'
  },
  profileIcon:{
    width:85,
    height:85,
    borderRadius:40
  },
  infoContainer:{
    justifyContent:'center',
    height:85,
    paddingRight:15
  },
  title:{
    fontSize:20,
    ...fonts.normal
  },
  line:{
    width:width,
    height:.3,
    marginTop:10,
    backgroundColor:colors.textSecondary
  },
  itemsContainer:{
    height:300,
    width:width,
    flexDirection:'column',
    alignItems:'flex-start',
    marginTop:10,
    marginRight:10
  },
  itemContainer:{
    flexDirection:'row-reverse',
    height:40,
    width:width,
    alignItems:'center',
    marginTop:5
  },
  itemIconContainer:{
    width:30,
    alignItems:'center',
    justifyContent:'center'
  },
  itemIcon:{
    color:colors.textSecondary
  },
  itemText:{
    ...fonts.normal,
    fontSize:15,
    marginHorizontal:10
  },
})
