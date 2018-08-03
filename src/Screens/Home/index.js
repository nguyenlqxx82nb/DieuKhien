import React, {Component} from "react";
import HomeScreen from "./Home.js";
import SideBar from "../../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
    {
        Home : {screen : HomeScreen}
    },
    {
        contentComponent: props => <SideBar {...props}/>
    }
);
export default HomeScreenRouter;
