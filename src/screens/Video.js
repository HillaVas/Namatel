import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Toolbar from './../component/BackToolbar';

import {colors,fonts} from './../config/Constants';

import Icon from 'react-native-vector-icons/FontAwesome';

const {width,height} = Dimensions.get('window');

export default class Video extends React.Component {
  constructor(){
    super()
    this.state={
      loaded:false,
      loadingMessage:'در حال دریافت اطلاعات :)',
      loadingFetchMessage:'در حال دریافت اطلاعات :)',
      loadingFailMessage:'مشکل در دریافت اطلاعات برای تلاش مجدد کلیک کنید',
      loadingFetchStatus:true,
      progressOpacity:1,
      data:{},
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
      ],
      gallery:[
        {
          banner:require('./../assets/graphics/cobra.jpg')
        },{
          banner:require('./../assets/graphics/culture.jpg')
        },{
          banner:require('./../assets/graphics/horror.jpeg')
        },{
          banner:require('./../assets/graphics/love.jpg')
        },{
          banner:require('./../assets/graphics/pulp.jpg')
        },{
          banner:require('./../assets/graphics/sad.jpg')
        },{
          banner:require('./../assets/graphics/reasons.jpg')
        },{
          banner:require('./../assets/graphics/safe.jpg')
        },
      ]
    }
  }

  componentWillMount(){
    this.makeRequest()
  }

  render(){
    return(
      <View style={{flex:1}}>

        <Toolbar title={this.props.item.type.title}/>

        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

          {this.renderMainComponent()}

        </View>

      </View>
    )
  }

  renderMainComponent(){
    if (!this.state.loaded) {
      return this.renderLoadingComponent()
    }else {
      return this.renderContent()
    }
  }

  renderLoadingComponent(){
    return(
      <View>

        <ActivityIndicator style={{opacity:this.state.progressOpacity}} size='large' color={colors.primaryDark}/>

        <TouchableOpacity onPress={()=>this.handleReloadPress()} activeOpacity={.8}>
          <Text style={styles.loadingMessage}>{this.state.loadingMessage}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  handleReloadPress(){
    if (!this.state.loadingFetchStatus)
      this.makeRequest()
  }

  makeRequest(){

    let url = 'https://api.namatel.com/api-vod.php?action=full&id='+2

    if (this.state.progressOpacity === 0) {
      this.setState({
        progressOpacity:1,
      })
    }

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control' : 'none'
      },
    }).then((response) => response.json())
      .then((responseJson) => {

        //todo : we need to do some error handling here

        this.setState({
          data : responseJson.result_vod_full,
          loaded:true
        })


    }).catch((error) => {
      this.setState({
        loadingFetchStatus:false,
        loadingMessage:this.state.loadingFailMessage,
        progressOpacity:0
      })
    });
  }

  renderContent(){

    let item = this.props.item;

    return(
      <ScrollView>
      <View style={styles.header}>
        <Image style={styles.videoImage} source={{uri:item.image.poster}}/>

        <View style={styles.headerDetail}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.headerSub}>محصول قزوین</Text>
          <Text style={styles.headerSub}>کارگردان : فریبرز چقدرجالب</Text>

          <TouchableOpacity style={styles.purchaseContainer} onPress={()=>Actions.payment({item})}
            onLongPress={()=>Actions.video_play()} activeOpacity={.8}>
            <Text style={styles.purchaseText}>خرید {item.price} تومان</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.desc}>
        <Text style={styles.descText}>اندی (رابینز)، بانکدار محترم و پولدار ایالت نیوانگلند، به اتهام قتل همسرش و فاسق او به حبس ابد در زندان ایالتی شاوشنک محکوم می شود و اندکی بعد با Red (فریمن)، زندانی سیاه پوست، دوست می شود. پس از هجده سال، اندی ردی از قاتل اصلی پیدا می کند و تصمیم می گیرد برای آزادی تلاش کند…</Text>
      </View>

      <View style={styles.relatedMovies}>
        <View style={styles.relatedMoviesHeader}>
          <Icon name='camera' size={20}/>
          <Text style={styles.relatedMoviesTitle}>برنامه‌های مشابه:</Text>
        </View>

        <FlatList
          style={styles.relatedMoviesList}
          data={this.state.movies}
          horizontal={true}
          renderItem={({item}) => this.renderMoviesItem(item)}
          keyExtractor={item => item.name + ''}
        />

      </View>

      <View style={styles.relatedMovies}>
        <View style={styles.relatedMoviesHeader}>
          <Icon name='camera' size={20}/>
          <Text style={styles.relatedMoviesTitle}>گالری تصاویر:</Text>
        </View>

        <FlatList
          style={styles.relatedMoviesList}
          data={this.state.gallery}
          numColumns={4}
          renderItem={({item}) => this.renderGalleryItem(item)}
          keyExtractor={item => item.banner + ''}
        />

      </View>

      <View style={{marginBottom:20}}/>
      </ScrollView>
    )
  }

  renderMoviesItem=(item)=>{
    return <TouchableOpacity style={styles.moviesItem} activeOpacity={.8}>
      <View style={styles.moviesImageContainer}>
        <Image style={styles.moviesImage} source={item.banner} />
      </View>

      <View style={styles.moviesTitleContainer}>
        <Text style={styles.moviesTitle}>{item.name}</Text>
      </View>

    </TouchableOpacity>
  }

  renderGalleryItem=(item)=>{
      return <View styel={styles.galleryItem}>
        <Image style={styles.galleryImage} source={item.banner}/>
      </View>
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection:'row-reverse',
    marginTop:5,
    backgroundColor:'white',
  },
  videoImage:{
    width:width/3,
    height:height/4.2,
    resizeMode:'cover'
  },
  headerDetail:{
    flexDirection:'column',
    marginHorizontal:10,
    marginTop:20,
    alignItems:'flex-end',
    flex:1
  },
  headerTitle:{
    ...fonts.bold,
    color:colors.text,
    textAlign:'right',
    fontSize:18
  },
  headerSub:{
    ...fonts.normal,
    color:colors.text,
    textAlign:'right',
  },
  loadingMessage:{
    ...fonts.bold,
    marginVertical:10,
    fontSize:16,
    color:colors.textSecondary
  },
  purchaseContainer:{
    backgroundColor:colors.primary,
    height:40,
    paddingHorizontal:5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    overflow:'hidden',
    shadowColor:'black',
    shadowOffset:{width:0,height:.2},
    shadowOpacity:.8,
    marginBottom:10,
    marginTop:10,
    elevation:4
  },
  purchaseText:{
    ...fonts.normal,
    color:'white',
  },
  desc:{
    backgroundColor:'white',
    marginTop:10,
    flex:1,
    padding:10
  },
  descText:{
    ...fonts.normal,
    color:colors.text,
    textAlign:'right'
  },
  relatedMovies:{
    marginTop:10,
  },
  relatedMoviesHeader:{
    flexDirection:'row-reverse',
    backgroundColor:'white',
    padding:10,
    alignItems:'center'
  },
  relatedMoviesTitle:{
    marginHorizontal:10,
    ...fonts.bold,
    color:colors.text
  },
  relatedMoviesList:{
    paddingVertical:10
  },
  moviesItem:{
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
  moviesImageContainer:{
    width:width/3,
    height:height/3.8,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
  },
  moviesImage:{
    width:width/3,
    height:height/3.8,
    resizeMode:'cover',
  },
  moviesTitleContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  moviesTitle:{
    ...fonts.normal,
    textAlign:'center',
    alignSelf:'center',
  },
  galleryItem:{
    width:width/4,
    height:width/4
  },
  galleryImage:{
    resizeMode:'cover',
    width:width/4,
    height:width/4
  }
})
