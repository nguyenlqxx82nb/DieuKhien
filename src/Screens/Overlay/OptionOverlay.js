import React from "react";
import { StyleSheet, View,TouchableWithoutFeedback,Platform,Animated} from "react-native";
import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import GLOBALS from '../../DataManagers/Globals.js';
import Emoji from "./Emoji";
import SingerMenu from "./SingerMenu";
import SongMenu from "./SongMenu";
import Utils from "../../Utils/Utils";

export default class OptionOverlay extends React.Component {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        this._data = {};
        this.state = {
            opacityValue : new Animated.Value(0),
            yPos : new Animated.Value(240),
            overlayType : GLOBALS.SING_OVERLAY.NONE,
        }
    }
    _onClose =() => {
        const {onClose} = this.props;
        this.hide();
        if(onClose != null){
            onClose();
        }
    }
    updateView = (type,data) => {
        this._data = data
        this.setState({overlayType:type});
    }

    renderView = () =>{
        //console.warn("overlayType =  "+this.state.overlayType);
        if(this.state.overlayType == GLOBALS.SING_OVERLAY.NONE){
            return(<View></View>);
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.NORMAL){
            return <SongMenu 
                        songId={this._data.songId} 
                        actor={this._data.actor} 
                        onClose= {this._onClose}
                        menuType = {this._data.menuType}
                        />;
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.EMOJI){
            return <Emoji 
                        onClose= {this._onClose}
                    />;
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.SINGER){
            return <SingerMenu 
                        onClose= {this._onClose}
                    />;
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
                        width: Utils.Width(),
                        top:0,
                        height: Utils.Height() - GLOBALS.STATUS_BAR_HEIGHT,opacity:1,zIndex:0 }}
               ref={ref => (this._container = ref)}>

            <TouchableWithoutFeedback  style={styles.overlayContainer} 
                onPress={this._onClose} >
                <Animated.View 
                    ref={ref => (this._overlay = ref)}
                    style={{opacity:opacityValue,flex:1, backgroundColor: "#000"}} />
            </TouchableWithoutFeedback>
            <Animated.View  ref={ref => (this._panel = ref)}
                style={[styles.container,{height:this._data.height, transform:[{translateY: yPos}]}]}>
                {this.renderView()}
                <View style={{height:50,width:'100%', backgroundColor:"#444083"}}>
                    <IconRippe vector={true} name={""}
                        text={{content: "Hủy", layout: 1}} textStyle={styles.text}
                        onPress = {this._onClose}
                    />
                </View>
            </Animated.View>
        </View>
        );
    }
}


const styles = StyleSheet.create({
    innerContainer :{
        flex: 1,
        width:"100%"
    },
    overlayContainer: {
        position:"absolute",
        width: Utils.Width(),
        top:0,
        height: Utils.Height() - GLOBALS.STATUS_BAR_HEIGHT, 
        //opacity:0.6
    },
    container: {
        position:"absolute",
        width:Utils.Width(),
        bottom:0,
        height:240,
        backgroundColor:"#323663",
        opacity:0.85
    },
    text: {
        fontFamily: GLOBALS.FONT.MEDIUM,
        fontSize: 16, 
        color:"#fff"
    },
    
})
