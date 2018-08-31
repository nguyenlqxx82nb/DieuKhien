import React from "react";
import { StyleSheet, Alert,Dimensions,Animated, Platform,LinearGradient} from "react-native";
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
import SongOnlineListView from './SongOnlineListView';
import CustomIcon from '../../Components/CustomIcon';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class YoutubeScreen extends BaseScreen {
    static propTypes = {
        //onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
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
        if(offsetY > 50){
            if(this._offsetY <= offsetY){
                if(this._headerTopY > -50){
                    var delta = offsetY - this._offsetY;
                    this._headerTopY = Math.max(this._headerTopY - delta,-50);
                    Animated.timing(this.state.scrollY,{toValue:this._headerTopY,duration:0}).start();
                }
            }
            else{
                if(this._headerTopY > 0){
                    this._headerTopY = 0;
                    Animated.timing(this.state.scrollY,{toValue:0,duration:150}).start();
                }
            }
        }
        else{
            this._headerTopY = Math.max(-offsetY,-50);
            Animated.timing(this.state.scrollY,{toValue:this._headerTopY,duration:0}).start();
        }

        this._offsetY = offsetY;
    }
    renderContentView = () => {
        //const { maxZindex } = this.props;
        var bodyHeight  = screen.height- 75;
        var width = screen.width;
        return (
            <View style={{ flex: 1,width:'100%' }}>
                <Animated.View 
                    style={[styles.headerContainer,{ transform: [{ translateY: this.state.scrollY }]}]}
                    ref = {ref => (this._header = ref)}>
                    <View style={{ width: 40, height: 40, marginLeft: 5 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                        {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                            style={{marginLeft:15, height:40,width:90,justifyContent:"center",alignItems:"center"}}
                            colors={['#FF6565', '#FF4242', '#FF2C2C', '#FF0404']} >
                            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <CustomIcon name={"youtube3"} size ={60} style={{color:"#fff"}} />
                            </View>
                        </LinearGradient> */}
                    </View>
                    <View style={{ width: 40, height: 40, marginRight: 5 }}>
                        <IconRippe vector={true} name="search" size={20} color="#fff" />
                    </View>
                </Animated.View>

                <Animated.View style={styles.bodyContainer}
                    ref={ref => (this._videoListContainer = ref)} >
                    <SongOnlineListView ref={ref=>(this._songList = ref)} 
                        onScroll = {this._handleScroll}
                        onlineType = {GLOBALS.SONG_ONLINE.YOUTUBE}  />
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
        height: 50,
        width:'100%',
        position:"absolute",
        zIndex: 1,
        backgroundColor:"#44498B"
        // borderTopWidth: 0,
        // borderLeftWidth: 0,
        // borderRightWidth: 0,
        // borderBottomWidth: 0.5,
        // borderColor: '#00ECBC',
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft:10,
        color:"#fff",
        flex:1,
        fontFamily:'SF-Pro-Text-Regular'
    },
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    },
    bodyContainer : {
        flex:1,
        zIndex:0
        //marginTop:50
    }

})