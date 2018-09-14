/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component,} from 'react';
import {Dimensions} from "react-native";
//import {Platform, StyleSheet, Text, View} from 'react-native';
import Portrail from "./src/Screens/index.js"
import Landscape from "./src/Screens/index.landscape.js"
import Orientation from 'react-native-orientation';
// import ScrollScreen from "./src/Test/scroll";
// import ScrollSwagger from './src/Test/ScrollSwagger'
//import RTCSocket from './RctSockets.js'
import GLOBALS from './src/DataManagers/Globals';

type Props = {};
const screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
}
export default class App extends Component<Props> {
  orientation = GLOBALS.ORIENTATION_TYPE.LANDSCAPE;
  componentWillMount(){
    var maxSize = Math.max(screen.width,screen.height);
    if(maxSize > 800){
        Orientation.lockToLandscape();
        this.orientation = GLOBALS.ORIENTATION_TYPE.LANDSCAPE;
    }
    else{
        Orientation.lockToPortrait();
        this.orientation = GLOBALS.ORIENTATION_TYPE.PORTRAIT;
    }
  }
  render() {
    if(this.orientation == GLOBALS.ORIENTATION_TYPE.LANDSCAPE){
      return (
        <Landscape />
      );
    }
    else{
      return (
        <Portrail />
      );
    }
    
  }
}
