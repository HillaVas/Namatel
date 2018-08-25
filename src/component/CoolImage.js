import React from 'react';

import {
  View,
  Image,
  Animated,
  Alert
} from 'react-native';

export default class CoolImage extends React.Component {

  constructor(){
    super();
    this.state = {
      thumbnailOpacity: new Animated.Value(0)
    }
  }

  onLoad(){
    Animated.timing(this.state.thumbnailOpacity, {
      toValue:0,
      duration:250
    }).start()
  }

  onThumbnailLoad(){
    Animated.timing(this.state.thumbnailOpacity, {
      toValue:1,
      duration:250
    }).start()
  }

  render(){

    let props = this.props;

    return(
      <View width={props.style.width} height={props.style.height}>

        <Animated.Image
          resizeMode={'contain'}
          key={props.key}
          style={[{position:'absolute'}, props.style]}
          source={{uri : props.source}}
          onLoad={this.onLoad()}
          />

        <Animated.Image
          resizeMode={'contain'}
          key={props.key}
          style={[{opacity:this.state.thumbnailOpacity},props.style]}
          source={{uri : props.thumbnail}}
          onLoad={this.onThumbnailLoad()}
          />

      </View>
    )
  }
}
