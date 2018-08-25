import React from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';

import Video from 'react-native-video';

import Icon from 'react-native-vector-icons/FontAwesome';

import ProgressBar from "react-native-progress/Bar";

import {Actions} from 'react-native-router-flux';

import {colors} from './../config/Constants';

const {width,height} = Dimensions.get('window');

export default class VideoPlay extends React.Component {

  constructor(){
    super();
    this.state = {
      progress : 0,
      duration : 0,
      paused : true,
      mute : false,
      controllerOpacity : new Animated.Value(1)
    }

    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ progress: data.currentTime / this.state.duration });
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  onEnd(){
    this.setState({ paused : true })
  }

  togglePlay(){
    this.setState({paused:!this.state.paused});

    this.state.paused ?
      Animated.timing(this.state.controllerOpacity, {
        toValue:0,
        duration:350
      }).start():
      Animated.timing(this.state.controllerOpacity, {
        toValue:1,
        duration:250
      }).start()
  }

  handleProgressPress = (e) => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    const isPlaying = !this.state.paused;

    this.player.seek(progress);
  };

  secondsToTime(time) {
    return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
  }

  render(){

    let videoUrl = this.props;
    let {progress, duration, paused} = this.state;

    return(
      <View style={styles.container}>

        <TouchableOpacity style={styles.playerContainer} onPress={()=>this.togglePlay()} activeOpacity={.95}>

          <Video
            style={styles.player}
            ref={(ref) => {this.player = ref}}
            source={require('./../assets/video/video.mp4')}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            paused={this.state.paused}
            muted={this.state.mute}
            resizeMode={'contain'}
            />

        </TouchableOpacity>

        <Animated.View style={[styles.stateController,{opacity:this.state.controllerOpacity}]}>
          <Icon style={styles.stateControllerIcon} name='eye' size={20} />
          <TouchableOpacity onPress={()=>Actions.pop()}>
            <Icon style={styles.stateControllerIcon} name='times' size={20} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.playerControllerContainer,{opacity:this.state.controllerOpacity}]}>
          <TouchableOpacity onPress={()=>{this.togglePlay()}}>
            <Icon style={styles.playerControllerIcon} name={this.state.paused ? 'play' : 'pause'} size={this.state.paused ? 28 : 22} />
          </TouchableOpacity>

          <View style={styles.playerControllerSeekBar}>
            <TouchableWithoutFeedback onPress={this.handleProgressPress}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color="#FFF"
                  unfilledColor="rgba(255,255,255,.5)"
                  width={250}
                  height={10}
                  />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity onPress={()=>this.setState({mute:!this.state.mute})}>
            <Icon style={styles.playerControllerMuteIcon} name={this.state.mute ? 'volume-off' : 'volume-up'} size={this.state.mute ? 24 : 20} />
          </TouchableOpacity>

        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  playerContainer:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
  },
  player:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0
  },
  stateController:{
    width:100,
    height:50,
    flexDirection:'row',
    position:'absolute',
    backgroundColor:colors.primaryHue,
    right:0,
    marginTop:25,
    marginRight:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  stateControllerIcon:{
    paddingHorizontal:10,
    color:colors.darkWhite
  },
  playerControllerContainer:{
    position:'absolute',
    bottom:0,
    marginHorizontal:10,
    marginBottom:10,
    left:0,
    right:0,
    height:55,
    borderRadius:10,
    backgroundColor:colors.primaryHue,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row'
  },
  playerControllerIcon:{
    color:colors.darkWhite,
    marginHorizontal:15,
    width:20
  },
  playerControllerMuteIcon:{
    color:colors.darkWhite,
    padding:10,
    marginRight:5
  },
  playerControllerSeekBar:{
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center'
  }
})
