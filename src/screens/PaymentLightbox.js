import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing,
  Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import {Actions} from 'react-native-router-flux'

import {colors,fonts} from './../config/Constants'

import PaymentHelper from './../config/PaymentHelper'

const {width,height} = Dimensions.get('window')

export default class PaymentLightbox extends React.Component {

  constructor(){
    super()
    this.state = {
      opacity : new Animated.Value(0),
      xy : new Animated.ValueXY({x:0,y:height})
    }
  }

  componentDidMount(){
    this.showLightbox()
    this.showContent()
  }

  showContent(){
    Animated.timing(this.state.xy,{
      toValue:{x:0,y:0},
      duration:500,
      easing:Easing.elastic()
    }).start()
  }

  hideContent(){
    Animated.timing(this.state.xy,{
      toValue:{x:0,y:height},
      duration:250
    }).start()
  }

  showLightbox(){
    Animated.timing(this.state.opacity,{
      toValue:1,
      duration:300
    }).start()
  }

  hideLightbox(){
    Animated.timing(this.state.opacity,{
      toValue:0,
      duration:350
    }).start(Actions.pop)
    this.hideContent()
  }

  renderLightBox(){
    return(
      <Animated.View style={[styles.lightBoxContainer,this.state.xy.getLayout()]}>
        <View style={styles.lightBoxContentContainer}>
          <Image style={styles.banner} source={{uri:this.props.item.image.poster}}/>

          <Text style={styles.title}>{this.props.item.title}</Text>
          <View style={styles.infoContainer}>
            <Icon name='info' size={20} style={styles.infoIcon}/>
            <Text style={styles.subTitle}>پس از نهایی شدن فرایند پرداخت شما قادر به مشاهده ی برنامه ی مورد نظر خواهید بود :)</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={()=>this.hideLightbox()} activeOpacity={.8}>
            <Text style={styles.buttonText}>بازگشت</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={()=>this.pay()} activeOpacity={.8}>
            <Text style={styles.buttonText}>پرداخت {this.props.item.price} تومان</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  pay(){

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

    let helper = new PaymentHelper(payment);

    helper.makePayment()
  }

  render(){
    return(
      <Animated.View style={[styles.container,{opacity:this.state.opacity}]}>
          {this.renderLightBox()}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgba(52,52,52,0.7)',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    alignItems:'center',
    justifyContent:'center'
  },
  lightBoxContainer:{
    width:width * .8,
    height:height * .6,
    backgroundColor:'white',
    borderRadius:7,
    overflow:'hidden'
  },
  lightBoxContentContainer:{
    flex:1
  },
  banner:{
    width:width * .8,
    height:height * .6 /2.5,
    backgroundColor:colors.green,
    resizeMode:'cover'
  },
  title:{
    ...fonts.bold,
    color:colors.text,
    textAlign:'right',
    fontSize:16,
    marginVertical:10,
    marginHorizontal:5,
  },
  infoContainer:{
    flexDirection:'row-reverse',
    paddingVertical:5
  },
  infoIcon:{
    color:colors.primary,
    alignSelf:'center',
    padding:10
  },
  subTitle:{
    ...fonts.normal,
    color:colors.textSecondary,
    flex:1,
    textAlign:'right',
    paddingHorizontal:5,
    fontSize:15
  },
  buttonContainer:{
    flexDirection:'row',
    paddingVertical:5
  },
  button:{
    flex:1,
    backgroundColor:colors.green,
    paddingHorizontal:20,
    paddingVertical:12,
    borderTopRightRadius:7,
    borderBottomRightRadius:7,
    shadowColor:'black',
    shadowOpacity:.4,
    shadowOffset:{width:0,height:.7},
    elevation:5,
    marginLeft:5,
    marginRight:5
  },
  cancelButton:{
    backgroundColor:colors.red,
    paddingHorizontal:20,
    paddingVertical:12,
    borderTopLeftRadius:7,
    borderBottomLeftRadius:7,
    shadowColor:'black',
    shadowOpacity:.4,
    shadowOffset:{width:0,height:.7},
    elevation:5,
    marginLeft:5
  },
  buttonText:{
    ...fonts.bold,
    color:'white',
    textAlign:'center'
  }
})
