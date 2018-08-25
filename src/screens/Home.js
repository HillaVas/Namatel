import React from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import CoolImage from './../component/CoolImage'

import {Actions} from 'react-native-router-flux';

import Toolbar from './../component/Toolbar';

import Icon from 'react-native-vector-icons/FontAwesome'

import CommonDataManager from './../config/CommonDataManager'

const {width,height} = Dimensions.get('window');

import {fonts,colors} from './../config/Constants'

class More extends React.Component {
  render(){
    return(
      <TouchableOpacity style={styles.moreContainer} activeOpacity={.8}>
        <Text style={styles.moreTitle}>{this.props.title}</Text>

        <Text style={styles.moreText}>بیشتر</Text>

        <Icon style={styles.moreIcon} name='angle-left' size={20}/>

      </TouchableOpacity>
    )
  }
}

class SpecialCard extends React.Component {

  render(){
    return(
      <TouchableOpacity style={styles.special} activeOpacity={.8} onPress={()=>Actions.video({item:this.props.item})}>
        <CoolImage
          style={styles.specialImage}
          source={this.props.image}
          thumb={this.props.thumb}
        />
      </TouchableOpacity>
    )
  }
}

export default class Main extends React.Component {

  constructor(props){
    super(props)

    this.state={
      series:[
        {
          name:'WestWorld',
          banner:require('./../assets/graphics/west.jpg')
        },{
          name:'13 Reasons Why',
          banner:require('./../assets/graphics/reasons.jpg')
        },{
          name:'The Handmaids Tale',
          banner:require('./../assets/graphics/hand.jpg')
        },{
          name:'Cobra Kai',
          banner:require('./../assets/graphics/cobra.jpg')
        },{
          name:'Safe',
          banner:require('./../assets/graphics/safe.jpg')
        },
      ],
      movies:[
        {
          name:'The Shawshank',
          banner:require('./../assets/graphics/shaw.jpg')
        },{
          name:'The Godfather',
          banner:require('./../assets/graphics/god.jpg')
        },{
          name:'The Dark knight',
          banner:require('./../assets/graphics/dark.jpg')
        },{
          name:'Pulp Fiction',
          banner:require('./../assets/graphics/pulp.jpg')
        },{
          name:'Schindler List',
          banner:require('./../assets/graphics/list.jpg')
        },
      ]
    }
  }

  render(){
    return(
      <View style = {{flex:1}}>

        <Toolbar title={this.props.title}/>

        <ScrollView>

          {this.renderMainComponent()}

        </ScrollView>

      </View>
    )
  }

  // 1 => banner ,0 => specials ,2 => list
  renderMainComponent(){
    let list = CommonDataManager.getInstance().getData().home

    console.log(list)

    let elements = []

    list.map((item)=>{
      switch (item.format) {
        case 0 :

          elements.push(
            <More title={item.title}/>
          )
          console.log(item);
          elements.push(
            <View style={styles.specialsContainer}>
              <SpecialCard item={item.vod[0]} image={item.vod[0].image.main} thumbnail={item.vod[0].image.thumb}/>
              <SpecialCard item={item.vod[1]} image={item.vod[1].image.main} thumbnail={item.vod[1].image.thumb}/>
              <SpecialCard item={item.vod[2]} image={item.vod[2].image.main} thumbnail={item.vod[2].image.thumb}/>
              </View>
          )
          break;
        case 1 :

          elements.push(
            <More title='کنسرتها'/>
          )

          elements.push(
            <TouchableOpacity style={styles.concert} activeOpacity={.8}>
              <Image style={styles.concertImage} source={require('./../assets/graphics/concert.png')}/>

              <View style={styles.concertInfo}>
                <Text style={styles.concertTitle}>{item.title}</Text>
              </View>

            </TouchableOpacity>
          )

          break;
        case 2 :

          elements.push(
            <More title={item.title}/>
          )

          elements.push(
            <FlatList
              style={styles.series}
              data={item.vod}
              horizontal={true}
              renderItem={({item}) => this.renderSeriesItem(item)}
              keyExtractor={item => item.name + ''}
            />
          )

          break;
      }
    })

    elements.push(
      <View style={{marginBottom:30}}/>
    )

    return elements;
  }

  renderSeriesItem=(item)=>{
    return <TouchableOpacity style={styles.seriesItem} activeOpacity={.8}>
      <View style={styles.seriesImageContainer}>
        <CoolImage
          style={styles.seriesImage}
          source={item.image.main}
          thumbnail={item.image.thumb}
          />
      </View>

      <View style={styles.seriesTitleContainer}>
        <Text style={styles.seriesTitle}>{item.title}</Text>
      </View>

    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  moreContainer:{
    width:'100%',
    height:40,
    flexDirection:'row-reverse',
    alignItems:'center',
    marginTop:10,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    borderTopColor:colors.textSecondary,
    borderBottomColor:colors.textSecondary,
    backgroundColor:'white'
  },
  moreTitle:{
    ...fonts.normal,
    marginRight:10,
    flex:1,
    textAlign:'right',
    fontSize:16,
    marginTop:4
  },
  moreText:{
    ...fonts.normal,
    color:colors.primary,
    marginHorizontal:10,
    marginTop:4
  },
  moreIcon:{
    color:colors.text,
    marginLeft:10
  },
  specialsContainer:{
    width:'100%',
    marginTop:10,
    flexDirection:'row'
  },
  special:{
    width:width/3,
    backgroundColor:'black',
    height:height/3
  },
  specialImage:{
    width:width/3,
    height:height/3,
    resizeMode:'cover'
  },
  series:{
    flex:1,
    height:height/3.8 + 60
  },
  seriesItem:{
    flex:1,
    width:width/3,
    height:height/3.8 + 45,
    borderRadius:10,
    overflow:'hidden',
    marginTop:10,
    marginHorizontal:5,
    backgroundColor:'white',
    elevation:4,
  },
  seriesImageContainer:{
    width:width/3,
    height:height/3.8,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
  },
  seriesImage:{
    width:width/3,
    height:height/3.8,
    resizeMode:'cover',
    backgroundColor:'black'
  },
  seriesTitleContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  seriesTitle:{
    ...fonts.normal,
    textAlign:'center',
    alignSelf:'center',
  },
  concert:{
    width:'100%',
    height:height/3,
    marginTop:10
  },
  concertImage:{
    width:'100%',
    height:height/3,
    resizeMode:'cover'
  },
  concertInfo:{
    width:'100%',
    height:height/3,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center'
  },
  concertTitle:{
    ...fonts.bold,
    color:'white',
    fontSize:18
  }
})
