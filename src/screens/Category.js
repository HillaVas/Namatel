import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Toolbar from './../component/Toolbar'

import {fonts} from './../config/Constants'

export default class Main extends React.Component {

  constructor(){
    super();
    this.state = {
      data:[
          {
            persian:'وحشت',
            count:43,
            banner:require('./../assets/graphics/horror.jpeg')
          },{
            persian:'تاک شو',
            count:56,
            banner:require('./../assets/graphics/show.jpg')
          },{
            persian:'تاریخی مذهبی',
            count:64,
            banner:require('./../assets/graphics/culture.jpg')
          },{
            persian:'فیلم کوتاه',
            count:12,
            banner:require('./../assets/graphics/short.jpg')
          },{
            persian:'کمدی',
            count:83,
            banner:require('./../assets/graphics/comedy.jpg')
          },{
            persian:'درام عاشقانه',
            count:41,
            banner:require('./../assets/graphics/love.jpg')
          },{
            persian:'زبان اصلی با زیرنویس',
            count:24,
            banner:require('./../assets/graphics/sub.jpg')
          },{
            persian:'ناراحت کننده',
            count:49,
            banner:require('./../assets/graphics/sad.jpg')
          },
      ]
    }
  }

  render(){
    return(
      <View style = {{flex:1}}>

        <Toolbar title={this.props.title}/>

        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={({item}) => this.renderListItem(item)}
          keyExtractor={item => item.count + ''}
        />

      </View>
    )
  }

  renderListItem = (item)=>{
    return(
      <TouchableOpacity style={styles.row} activeOpacity={.8}>
        <Image style={styles.rowBanner} source={item.banner}/>

        <View style={styles.rowContent}>
          <Text style={styles.countText}>{this.alt(item.count)}</Text>
          <Text style={styles.persianText}>{item.persian}</Text>
          <Text></Text>
        </View>

      </TouchableOpacity>
    )
  }

  alt(str) {
    let englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    let current = [];

    str = str + '';

    for (var i = 0; i < str.length; i++) {
      if (englishNumbers.indexOf(str.charAt(i)) != -1) {
        var character = parseInt(str.charAt(i));
          current.push(persianNumbers[character])
        } else {
          current.push(str.charAt(i))
        }
    }
      return current;
  }

}

const styles = StyleSheet.create({
  list:{
    flex:1
  },
  row:{
    width:'100%',
    height:120,
  },
  rowBanner:{
    width:'100%',
    height:120,
    resizeMode:'cover'
  },
  rowContent:{
    position:'absolute',
    width:'100%',
    height:120,
  },
  countText:{
    position:'absolute',
    color:'white',
    height:30,
    top:120/2-10,
    textAlign:'center',
    fontSize:20,
    marginLeft:10,
    ...fonts.normal,
    color:'white'
  },
  persianText:{
    position:'absolute',
    color:'white',
    height:30,
    top:120/2-10,
    textAlign:'center',
    fontSize:20,
    marginRight:10,
    right:0,
    ...fonts.normal,
    color:'white'
  }
});
