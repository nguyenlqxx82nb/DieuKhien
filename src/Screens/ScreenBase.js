import React from "react";
import { StyleSheet, Dimensions, Animated, Platform,Image } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
    Left,
    Text
} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from '../DataManagers/Globals.js';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

class BaseScreen extends React.Component {
    static propTypes = {
        duration: PropTypes.number,
        opacity: PropTypes.number,
        maxZindex: PropTypes.number,
        posX : PropTypes.number,
        posY : PropTypes.number,
        transition : PropTypes.number,
        bottom :  PropTypes.number,
        type: PropTypes.number
    };
     
    static defaultProps = {
        duration: 250,
        opacity: 1,
        maxZindex: 1,
        posX : screen.width,
        posY : screen.height,
        transition : GLOBALS.TRANSITION.FADE,
        bottom : 115,
        type : GLOBALS.SCREEN_TYPE.BOTTOM
    };
    _songTabs = null;
    constructor(props) {
        super(props);

        const {transition} = this.props;
        var opacity = (transition == GLOBALS.TRANSITION.FADE)?this.props.opacity:1;
        var posX = (transition == GLOBALS.TRANSITION.SLIDE_LEFT)?this.props.posX:0;
        var posY = (transition == GLOBALS.TRANSITION.SLIDE_TOP)?this.props.posY:0;

        this.animate = {
            opacity: new Animated.Value(opacity),
            posX : new Animated.Value(posX),
            posY : new Animated.Value(posY),
        };

        this._isVisible = false;
        this._processing = false;
    }
    show = () => {
        if(this._processing)
            return;
        if(this._isVisible){
            this.hide();
            return;
        }
        this._processing = true;

        let container = this._container;
        const {maxZindex,transition,duration} = this.props;
        var that = this;
        
        this._isVisible = true;
        if(transition == GLOBALS.TRANSITION.FADE){
            Animated.timing(this.animate.opacity, {
                toValue: 1,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                container.setNativeProps({
                    style: {
                        zIndex: maxZindex
                    }
                });
    
                that.showCompleted();
            });
        }
        else if(transition == GLOBALS.TRANSITION.SLIDE_LEFT){
            container.setNativeProps({
                style: {
                    zIndex: maxZindex
                }
            });
            Animated.timing(this.animate.posX, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                that.showCompleted();
            });
        }
        else if(transition == GLOBALS.TRANSITION.SLIDE_TOP){
            container.setNativeProps({
                style: {
                    zIndex: maxZindex
                }
            });
            Animated.timing(this.animate.posY, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                that.showCompleted();
            });
        }
    }
    hide = () => {
       // console.warn("hide = "+this._processing +" , "+this._isVisible);
        if(this._processing)
            return;

        if(!this._isVisible){
            this.show();
            return;
        }
        this._processing = true;

        let container = this._container;
        const {maxZindex,transition,duration} = this.props;
        var that = this;
        this._isVisible = false;
        if(transition == GLOBALS.TRANSITION.FADE){
            Animated.timing(this.animate.opacity, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                container.setNativeProps({
                    style: {
                        zIndex: 0
                    }
                });
    
                that.hideCompleted();
            });
        }
        else if(transition == GLOBALS.TRANSITION.SLIDE_LEFT){
            Animated.timing(this.animate.posX, {
                toValue: screen.width,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                that.hideCompleted();
                container.setNativeProps({
                    style: {
                        zIndex: 0
                    }
                });
            });
        }
        else if(transition == GLOBALS.TRANSITION.SLIDE_TOP){
            Animated.timing(this.animate.posY, {
                toValue: screen.height,
                useNativeDriver: Platform.OS === 'android',
                duration: duration,
            }).start(function onComplete() {
                that.hideCompleted();
                container.setNativeProps({
                    style: {
                        zIndex: 0
                    }
                });
            });
        }
    }

    showCompleted = () =>{
        this._processing = false;
        this._showCompleted();
    }
    _showCompleted = () =>{}
    hideCompleted = () =>{
        this._processing = false;
        this._hideCompleted();
    }
    _hideCompleted = () =>{}

    renderContentView = () => {
        return (<View></View>);
    }

    render() {
        const {opacity,posX,posY} = this.animate;
        const { bottom,type } = this.props;
        var style = {};
        // if(type == GLOBALS.SCREEN_TYPE.BOTTOM){
        //     style.top = 0;
        // }
        // else{
        //     style.top = 0;
        // }
        style.top = 0;
        style.height = screen.height - GLOBALS.STATUS_BAR_HEIGHT;
        return (
            <Animated.View
                ref={ref => (this._container = ref)}
                style={[styles.container,style,{opacity : opacity,transform: [{translateY: posY},{translateX:posX}]}]}>
                {/* <Image source={GLOBALS.BackgroundImage} style={styles.imageBg} /> */}
                <LinearGradient 
                    start={{x: 0.1, y: 0.1}} end={{x: 1, y: 1}} 
                    colors={['#444284', '#434B8C', '#445D9D', '#436BA8', '#2C87A2', '#1F98A1', '#05BA9B']} 
                    style={{flex:1, width:'100%'}}>
                    <View style={{flex:1, marginBottom:bottom, width:'100%'}}>
                        {this.renderContentView()}
                    </View>
                </LinearGradient>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        width: screen.width,
        zIndex:0
    },
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    }
})

export default BaseScreen;
