import React, { Component } from "react";

import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

// screens
import HomeScreen from "./Home.js";
import SideBar from "../../SideBar/SideBar.js";
import SingScreen from "../BaiHat/index.js"



const Drawer = DrawerNavigator(
    {
        Home: { screen: HomeScreen },
        Sing: { screen: SingScreen }
    },
    {
        initialRouteName: "Home",
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        //Header1: { screen: Header1 }
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
