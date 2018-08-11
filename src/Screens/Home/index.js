import React from "react";
import { Text, StatusBar, Image, StyleSheet, Dimensions, Easing } from "react-native";
import {
    createTransition,
    Fade,
    FlipX,
    FlipY,
    SlideLeft,
    SlideRight,
    SlideUp,
    SlideDown,
} from 'react-native-transition';

import {
    View
} from "native-base";

import LinearGradient from 'react-native-linear-gradient';
import Footer from '../Footer/footer.js';
import HomeScreen from '../Home/Home.js';
import SingScreen from '../BaiHat/index.js';
import SingOptionOverlay from './SingOptionOverlay.js';

// Create Transition component
const Transition = createTransition();

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}
const bg = require("../../../assets/background.png");
export default class Taisao extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    _renderHomeView = () => {
        this.homeScreen = <HomeScreen onOpenSearch={this._onOpenSearch}
            ref={ref => (this._homeScreen = ref)} />;
        return (this.homeScreen);
    }
    a
    _onOpenSearch = () => {
        this._homeScreen.hide();
        this._singScreen.show();
    }
    _onBackHome = () => {
        this._homeScreen.show();
        this._singScreen.hide();
    }
    _onOptionOverlayOpen = () => {
        this._footer.hide();
        this._singOverlay.show();
    }
    _onSingOverlayClose = () => {
        this._footer.show();
    }
    render() {
        //console.warn("SCREEN WIDTH : "+screen.width+" , Height: "+screen.height);
        return (
            <View 
                style={{ flex: 1 }}>
                <Image source={bg} style={style.imageBg} />

                <SingOptionOverlay opacity={0} maxZindex={5} ref={ref => (this._singOverlay = ref)} 
                    onClose ={this._onSingOverlayClose}
                />
                 <SingScreen opacity= {0} maxZindex ={1}
                    onBack={this._onBackHome} ref={ref => (this._singScreen = ref)}
                    onOptionOverlayOpen = {this._onOptionOverlayOpen}
                />
                <HomeScreen zIndex={1} opacity= {1} maxZindex ={1} onOpenSearch={this._onOpenSearch}
                    ref={ref => (this._homeScreen = ref)} />

                <Footer opacity= {1} ref={ref => (this._footer = ref)} maxZindex ={2} />
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="light-content"
                ></StatusBar>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container_center: {
        justifyContent: "center", alignItems: "center"
    },
    container2: {
        width: 55, height: 55, marginTop: 15
    },
    container3: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    bottomView: {

        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex:2
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
    },
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    }
})
