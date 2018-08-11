import React from "react";
import { Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import {
    Right,
    View
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";
import TextTicker from 'react-native-text-ticker'
import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import BaseScreen from '../ScreenBase.js';

const arrowLeftSrc = require("../../../assets/arrowLeft.png");
const arrowRightSrc = require("../../../assets/arrowRight.png");
const marqBgSrc = require("../../../assets/marqBg.png");

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class SingOptionOverlay extends BaseScreen {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        //this.onPlayPress = this.onPlayPress.bind(this);
    }

    _onClose =() => {
        const {onClose} = this.props;
        this.hide();
        if(onClose != null){
            onClose();
        }
    }

    renderContentView = () => {
        return (
        <View style={{flex:1}}>
            <TouchableWithoutFeedback  style={styles.overlayContainer} 
                onPress={this._onClose} >
                <View style={{opacity:0.6,flex:1, backgroundColor: "#000"}} />
            </TouchableWithoutFeedback>

            <View style={styles.container}>
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
            </View>
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
