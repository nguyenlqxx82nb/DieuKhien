import React from "react";
import { StyleSheet, Alert,Dimensions,Animated, Platform} from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import {
    View,
    Text
    // Tab, Tabs, ScrollableTab
} from "native-base";
import IconRippe from '../../Components/IconRippe.js'
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SongOnlineListView from './SongOnlineListView.js';
import CustomIcon from '../../Components/CustomIcon.js';
import LinearGradient from 'react-native-linear-gradient';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}
const HEADER_HEIGHT = 50;
export default class SongOnlineScreen extends BaseScreen {
    static propTypes = {
        //onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
        type : PropTypes.number,
    };
    _offsetY = 0;
    _headerTopY = 0;
    constructor(props) {
        super(props);
        this.state = {
            scrollY : new Animated.Value(this._headerTopY),
        }
        //this.songChanged = false;
    }
    // componentWillMount() {
    //     // selected song changed
    //     this._listenerSongUpdateEvent = EventRegister.addEventListener('SongUpdate', (data) => {
    //         if(this._isVisible){
    //             this._songList.refreshData("");
    //         }
    //         else{
    //             this.songChanged = true;
    //         }
    //     });
    // }
    // componentWillUnmount() {
    //     EventRegister.removeEventListener(this._listenerSongUpdateEvent);
    // }
    _onBack = () => {
        const { onBack } = this.props;
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        this._songList.loadData("");
    }
    _handleScroll = (offsetY) =>{
        if(offsetY > HEADER_HEIGHT){
            if(this._offsetY <= offsetY){
                if(this._headerTopY > -HEADER_HEIGHT){
                    var delta = offsetY - this._offsetY;
                    this._headerTopY = Math.max(this._headerTopY - delta,-HEADER_HEIGHT);
                    this._headerTopY = (this._headerTopY > 0)?0:this._headerTopY;
                    Animated.timing(this.state.scrollY,{toValue:this._headerTopY,duration:0}).start();
                }
            }
            else{
                if(this._headerTopY < 0){
                    this._headerTopY = 0;
                    Animated.timing(this.state.scrollY,{toValue:0,duration:150}).start();
                }
            }
        }
        else{
            if(this._offsetY > HEADER_HEIGHT){
                var delta = offsetY - this._offsetY;
                this._headerTopY = Math.max(this._headerTopY - delta,-HEADER_HEIGHT);
                this._headerTopY = (this._headerTopY > 0)?0:this._headerTopY;
            }
            else{
                this._headerTopY =  Math.max(-offsetY,-HEADER_HEIGHT);
            }
            Animated.timing(this.state.scrollY,{toValue:this._headerTopY,duration:0}).start();
        }

        this._offsetY = offsetY;
    }
    _renderOnlineIcon = ()=>{
        const {type} = this.props;
        if(type == GLOBALS.SONG_ONLINE.YOUTUBE){
            return(
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    style={{marginLeft:5, height:40,width:90,justifyContent:"center",alignItems:"center"}}
                    colors={['#FF6565', '#FF4242', '#FF2C2C', '#FF0404']} >
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <CustomIcon name={"youtube3"} size ={60} style={{color:"#fff"}} />
                    </View>
                </LinearGradient>
            );
        }
        else if(type == GLOBALS.SONG_ONLINE.SOUNDCLOUD){
            return(
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    style={{marginLeft:5, height:40,width:100,justifyContent:"center",alignItems:"center"}}
                    colors={['#FFB223', '#FF9E1D', '#FF8315', '#FF4903']} >
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <CustomIcon name={"soundcloud"} size ={90} style={{color:"#fff"}} />
                    </View>
                </LinearGradient>
            );
        }
        else if(type == GLOBALS.SONG_ONLINE.MIXCLOUD){
            return(
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                    style={{marginLeft:5, height:40,width:100,justifyContent:"center",alignItems:"center"}}
                    colors={['#69A5E5', '#5D9CE1', '#4B90DB', '#3783D4']} >
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <CustomIcon name={"mixcloud"} size ={90} style={{color:"#fff"}} />
                    </View>
                </LinearGradient>
            );
        }
    }
    renderContentView = () => {
        //const { maxZindex } = this.props;
        return (
            <View style={{ flex: 1,width:'100%'}}>
                <Animated.View 
                    style={[styles.headerContainer,{ transform: [{ translateY: this.state.scrollY }]}]}
                    ref = {ref => (this._header = ref)}>
                    <View style={{ width: 40, height: 40, marginLeft: 5 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                        {this._renderOnlineIcon()}
                    </View>
                    <View style={{ width: 40, height: 40, marginRight: 5 }}>
                        <IconRippe vector={true} name="search" size={20} color="#fff" />
                    </View>
                </Animated.View>

                <Animated.View style={styles.bodyContainer}
                    ref={ref => (this._videoListContainer = ref)} >
                    <SongOnlineListView ref={ref=>(this._songList = ref)} 
                        onScroll = {this._handleScroll}
                        onlineType = {this.props.type}  />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
        top: 0, 
        height: HEADER_HEIGHT,
        width:'100%',
        position:"absolute",
        zIndex: 1,
        backgroundColor:"#44498B",
      //  marginTop:GLOBALS.STATUS_BAR_HEIGHT
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft:10,
        color:"#fff",
        flex:1,
        fontFamily:'SF-Pro-Text-Regular'
    },
    bodyContainer : {
        flex:1,
        zIndex:0
        //marginTop:50
    }

})