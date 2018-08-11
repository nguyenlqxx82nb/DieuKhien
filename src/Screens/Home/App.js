import React from "react";
import {Text, StatusBar, Image, StyleSheet, Dimensions, Easing } from "react-native";
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
//import HomeScreen from '../Home/Home.js'
//import SingScreen from '../BaiHat/index.js'

// Create Transition component
const Transition = createTransition(SlideRight);

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        //this._onTest = this._onTest.bind(this);
    }

    transitionRef = null;
    componentWillMount(){
        
    }

    _onTest = () => {
        this.child.setNativeProps({
            style: {
              color: "red",
            },
        });
    }

    render() {
        //console.warn("SCREEN WIDTH : "+screen.width+" , Height: "+screen.height);
        return (
            <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 1, y: 0.7 }} locations={[0.4, 0.6, 1]} colors={['#444083', '#435EA0', '#59D3CF']}
                style={{ flex: 1 }}>
                {/* <HomeScreen onOpenSearch={this._onOpenSearch()} 
                    onRef={ref => (this.child = ref)} /> */}
                    <Text ref={ref => (this.child = ref)} style={style.title}>
                        Animatable Explorer
                    </Text>
                <View style={style.bottomView}>
                    <Footer onTest={this._onTest} />
                </View>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="light-content"
                ></StatusBar>
            </LinearGradient>
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
        bottom: 0
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
      },
})
