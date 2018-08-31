import React from "react";
import { Text, StatusBar, Image, StyleSheet, Dimensions, Easing } from "react-native";
import {
    View
} from "native-base";

import Footer from '../Footer/footer.js';
import HomeScreen from './Home.js';
import SearchScreen from '../BaiHat/Search.js';
import SelectedSong from '../BaiHat/SelectedSong.js';
import SingerScreen from '../Singer/index.js';
import SingOptionOverlay from './SingOptionOverlay.js';
import TheloaiScreen from '../TheLoai/index.js'
import SongScreen from '../BaiHat/Songs';
import HotScreen from '../BaiHat/HotSong';
import OnlineScreen from '../Online/index.js'
import { EventRegister } from 'react-native-event-listeners'
import Globals from "../../DataManagers/Globals.js";
import BoxControl from "../../DataManagers/BoxControl.js";
import DATA_INFO from "../../DataManagers/DataInfo.js";
import BTElib from 'react-native-bte-lib';
import { DeviceEventEmitter } from 'react-native';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

var songPlaying = null;
var song_queue = [];

export default class Taisao extends React.Component {
    _currentScreen = null;
    constructor(props) {
        super(props);
        //console.ignoredYellowBox = true;
        //console.disableYellowBox = true;
    }

    componentDidMount() {
        //console.warn("componentDidMount");
        this._currentScreen = this._homeScreen; 
        //BoxControl.syncPlaybackQueue();
        setTimeout(()=>{
            this.ping();
        },1000);

       // BTElib.synsPlaybackQueue();
        DeviceEventEmitter.addListener('test', this.test);
        
    }

    test = (e) =>{
        console.warn("event leng = "+e['taisao'].length);
    }

    componentWillMount() {
        // Hide Footer
        this._listenerHideFooterEvent = EventRegister.addEventListener('HideFooter', (data) => {
            this._footer.hide();
        });
        // Show Footer
        this._listenerShowFooterEvent = EventRegister.addEventListener('ShowFooter', (data) => {
            setTimeout(()=>{
                this._footer.show();
            },300);
        });
        // Show overlay
        this._listenerShowOptOverlayEvent = EventRegister.addEventListener('ShowOptOverlay', (data) => {
            this._singOverlay.updateView(data.id,data.overlayType);
            this._footer.hide();
            this._singOverlay.show();
        });
    }
    componentWillUnmount() {
        //EventRegister.removeEventListener(this._listenerControlEvent);
        EventRegister.removeEventListener(this._listenerHideFooterEvent);
        EventRegister.removeEventListener(this._listenerShowFooterEvent);
        EventRegister.removeEventListener(this._listenerShowOptOverlayEvent);
    }
    
    _onOpenSearch = () => {
        this._searchScreen.show();
        setTimeout(()=>{
            this._searchScreen.focusSearchInput();
        },300);

        this._currentScreen = this._searchScreen;
    }
    _onOpenSinger = () =>{
        this._singerScreen.show();
        this._currentScreen = this._singerScreen;
    }
    _onOpenSong = () =>{
        this._songScreen.show();
        this._currentScreen = this._songScreen;
    }
    _onOpenHotSong = () =>{
        this._hotScreen.show();
        this._currentScreen = this._hotScreen;
    }
    _onOpenTheloai = () =>{
        this._theloaiScreen.show();
        this._currentScreen = this._theloaiScreen;
    }
    _onOnlineScreen = () => {
        this._onlineScreen.show();
        this._currentScreen = this._onlineScreen;
    }
    _onOpenSelectedSong = () => {
       // this._currentScreen.hide();
        this._selectedSong.show();
    }
    _onOpenEmoji = () =>{
        this._singOverlay.updateView(-1,Globals.SING_OVERLAY.EMOJI);
        this._footer.hide();
        this._singOverlay.show();
    }
    _onBackHome = ()=>{
        this._currentScreen.hide();
        this._currentScreen = this._homeScreen; 
    }
    _onCloseSelectedSong = () => {
        this._selectedSong.hide();
        //this._currentScreen.show();
    }
    _onSingOverlayClose = () => {
        this._footer.show();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SingOptionOverlay opacity={0} maxZindex={10} ref={ref => (this._singOverlay = ref)} 
                    onClose ={this._onSingOverlayClose}
                />
                <OnlineScreen  opacity= {0} maxZindex ={2} 
                    transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._onlineScreen = ref)} />
                <SearchScreen opacity= {0} maxZindex ={5} transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._searchScreen = ref)}
                />
                <SongScreen opacity= {0} maxZindex ={5} transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._songScreen = ref)}
                />
                <HotScreen opacity= {0} maxZindex ={5} transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._hotScreen = ref)}
                />

                <TheloaiScreen opacity= {0} maxZindex ={2} 
                    transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._theloaiScreen = ref)}/>

                <SingerScreen opacity= {0} maxZindex ={2} 
                    transition = {Globals.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._singerScreen = ref)}/>
                <SelectedSong maxZindex ={6} transition = {Globals.TRANSITION.SLIDE_TOP}
                    onBack={this._onCloseSelectedSong} ref={ref => (this._selectedSong = ref)}
                />
                <HomeScreen zIndex={1} opacity= {1} maxZindex ={1} 
                    onOpenSearch={this._onOpenSearch}
                    onOpenSinger = {this._onOpenSinger}
                    onOpenTheloai = {this._onOpenTheloai}
                    onOpenSong = {this._onOpenSong}
                    onOpenHotSong = {this._onOpenHotSong}
                    onOnlineScreen = {this._onOnlineScreen}
                    ref={ref => (this._homeScreen = ref)} />

                <Footer ref={ref => (this._footer = ref)} maxZindex ={8} 
                    onOpenEmoji = {this._onOpenEmoji} 
                    onSelectedSong={this._onOpenSelectedSong} />
                <StatusBar
                    backgroundColor="#444083"
                    // translucent={true}
                    barStyle="light-content"
                ></StatusBar>
            </View>
        );
    }

    ping = () => {
        if(DATA_INFO.PLAY_QUEUE.length > 0){
            var timeDiff = 0;
            var date = new Date();
            var isChange = false;
    
            if(songPlaying != null){
                timeDiff = date.getTime() - songPlaying.time;
            }
    
            if(songPlaying == null || timeDiff > 30*1000){
                let id = DATA_INFO.PLAY_QUEUE.shift();
                songPlaying = {}
                songPlaying.id = id;
                songPlaying.time = date.getTime();
    
                song_queue = DATA_INFO.PLAY_QUEUE.slice(0);
                isChange = true;
            }
            else {
                if(song_queue.length != DATA_INFO.PLAY_QUEUE.length){
                    song_queue = DATA_INFO.PLAY_QUEUE.slice(0);
                    isChange = true;
                }
                else {
                    for(var i =0; i<DATA_INFO.PLAY_QUEUE.length; i++ ){
                        if(song_queue[i].id == DATA_INFO.PLAY_QUEUE[i].id){
                            continue;
                        }
    
                        song_queue =  DATA_INFO.PLAY_QUEUE.slice(0);
                        isChange = true;
                        break;
                    }
                }
            }
    
            if(isChange){
                EventRegister.emit("SongUpdate",{});
            }
        }

        setTimeout(()=>{
            this.ping();
        },1000);
    }
}

const styles = StyleSheet.create({
    
})
