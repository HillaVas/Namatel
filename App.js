/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Router, Scene, ActionConst, Lightbox, Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome'

import Home from './src/screens/Home';
import Category from './src/screens/Category';
import User from './src/screens/User';

import Video from './src/screens/Video';
import VideoPlay from './src/screens/VideoPlay';
import Login from './src/screens/Login'
import Splash from './src/screens/Splash';

import ComponentTest from './src/screens/ComponentTest';
import PaymentLightbox from './src/screens/PaymentLightbox';

import {colors} from './src/config/Constants'

class TabIcon extends Component {
  render() {
    var color = this.props.focused ? colors.primary : 'grey';
    var size = this.props.focused ? 28 : 19;
    var iconName = this.props.iconName;

    return (
      <View style={{
        flex: 1,
        width: 120,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon name={iconName} size={size} style={{color: color}}/>
          <Text style={{
            color: color,
            fontSize: 11,
            fontFamily:'IRANSansMobile',
            marginBottom: -9
        }}>{this.props.title}</Text>
      </View>
    );
  }
}

const App=()=>{
  return(
    <Router>
      <Lightbox>
        <Scene key='root'>
          <Scene key='home' tabs={true} type={ActionConst.RESET} tabBarPosition='bottom' showLabel={false} animationEnabled={false} swipeEnabled={false} tabBarStyle={{backgroundColor:'white',height:60}}>                
            <Scene hideNavBar component={User} tabBarIcon={TabIcon} title='پروفایل' iconName='user'/>
            <Scene initial key='tab_home' hideNavBar component={Home} tabBarIcon={TabIcon} title='خانه‌' iconName='home'/>
            <Scene hideNavBar component={Category} tabBarIcon={TabIcon} title='دسته‌بندی‌ها' iconName='cube'/>
          </Scene>

          <Scene key='test' component={ComponentTest} hideNavBar/>

          <Scene key='video_play' component={VideoPlay} hideNavBar/>
          <Scene key='video' component={Video} hideNavBar/>
          <Scene key='login' type={ActionConst.RESET} component={Login} hideNavBar/>
          <Scene initial key='splash' type={ActionConst.RESET} component={Splash} hideNavBar/>
        </Scene>
        <Scene key='payment' component={PaymentLightbox} hideNavBar/>
      </Lightbox>
    </Router>
  );
};

export default App;
