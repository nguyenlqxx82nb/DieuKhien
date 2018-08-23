import React from "react";
import { StyleSheet, Dimensions, TouchableWithoutFeedback,Platform,Animated} from "react-native";
import {
    View
} from "native-base";

import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import Globals from '../../DataManagers/Globals.js';

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class SingOptionOverlay extends React.Component {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        //this.onPlayPress = this.onPlayPress.bind(this);

        this.state = {
            opacityValue : new Animated.Value(0),
            yPos : new Animated.Value(240),
            overlayType : Globals.SING_OVERLAY.NONE
        }
    }

    _onClose =() => {
        const {onClose} = this.props;
        this.hide();
        if(onClose != null){
            onClose();
        }
    }
    updateView = (id,type) => {
        //console.warn(" renderView " + id);
        this._singId = id;
        this.setState({overlayType:type});
    }

    renderView = () =>{
        const {opacityValue,yPos} = this.state;
        if(this.state.overlayType == Globals.SING_OVERLAY.NONE){
            return(<View></View>);
        }
        else if(this.state.overlayType == Globals.SING_OVERLAY.NORMAL){
            return(
            <Animated.View 
                ref={ref => (this._panel = ref)}
                style={[styles.container,{transform:[{translateY: yPos}]}]}>
                <View style={{height:60,width:'100%'}}>
                    <IconRippe vector={true} name="play2" size={30} 
                        text={{content: "Hát Ngay", layout: 1,
                                fontFamily: "Arial", fontSize: 18, left: 10}}
                     />
                </View>
                <View style={{height:60,width:'100%'}}>
                    <IconRippe vector={true} name="uutien" size={30} 
                        text={{content: "Ưu Tiên", layout: 1,
                                fontFamily: "Arial", fontSize: 18, left: 10}}
                     />
                </View>
                <View style={{height:60,width:'100%'}}>
                    <IconRippe vector={true} name="delete" size={30} 
                        text={{content: "Xóa", layout: 1,
                                fontFamily: "Arial", fontSize: 18, left: 10}}
                     />
                </View>
                <View style={{height:60,width:'100%', backgroundColor:"#444083"}}>
                    <IconRippe vector={true} name={""}
                        text={{content: "Hủy", layout: 1,
                                fontFamily: "Arial", fontSize: 18, left: 10}}
                     />
                </View>
            </Animated.View>);
        }
    }

    show = () => {
        const {maxZindex} = this.props;
        this._container.setNativeProps({
            style: {
                zIndex: maxZindex
            }
        });
        
        Animated.parallel([
            Animated.timing(this.state.opacityValue, {
                toValue: 0.6,
                useNativeDriver: Platform.OS === 'android',
                duration: 500,
            }),
            Animated.timing(this.state.yPos, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: 250,
            }),
        ]).start(function onComplete() {
        });
    }

    hide = () => {
        const {maxZindex} = this.props;
        let container = this._container;
        Animated.parallel([
            Animated.timing(this.state.opacityValue, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: 500,
            }),
            Animated.timing(this.state.yPos, {
                toValue: 240,
                useNativeDriver: Platform.OS === 'android',
                duration: 250,
            }),
        ]).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });
    }

    render = () => {
        const {opacityValue,yPos} = this.state;
        return (
        <View style={{position:"absolute",
                        width: screen.width,
                        top:0,
                        height: screen.height,opacity:1,zIndex:0 }}
               ref={ref => (this._container = ref)}>

            <TouchableWithoutFeedback  style={styles.overlayContainer} 
                onPress={this._onClose} >
                <Animated.View 
                    ref={ref => (this._overlay = ref)}
                    style={{opacity:opacityValue,flex:1, backgroundColor: "#000"}} />
            </TouchableWithoutFeedback>
            {this.renderView()}
        </View>
        );
    }
}


const styles = StyleSheet.create({
    
    overlayContainer: {
        position:"absolute",
        width: screen.width,
        top:0,
        height: screen.height, 
        //opacity:0.6
    },
    container: {
        position:"absolute",
        width:screen.width,
        bottom:0,
        height:240, 
        //justifyContent:"center",
        //alignItems:"center",
        backgroundColor:"#323663",
        opacity:0.75
    },
})
