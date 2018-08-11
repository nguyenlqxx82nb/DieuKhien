/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//import {Platform, StyleSheet, Text, View} from 'react-native';
import Test from "./src/Screens/index.js"
import ExamAni from "./src/Animate/App.js"
import UList from "./src/ulist/index.js"
//import FluidExam from "./src/fluid/index.js"

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Test />
    );
  }
}
