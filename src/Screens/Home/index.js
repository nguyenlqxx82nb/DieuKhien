import React from "react";
import { StatusBar,StyleSheet, Dimensions} from "react-native";
import {
    View,
    Container
} from "native-base";

// screens
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
import SecondScreen from '../../SideBar/SecondScreen';

import { EventRegister } from 'react-native-event-listeners'
import GLOBALS from "../../DataManagers/Globals.js";
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
        console.ignoredYellowBox = ['Warning: Stateless'];
        GLOBALS.INFO.VERSION = GLOBALS.BOX_VERSION.S650;
        GLOBALS.INFO.CONNECT = GLOBALS.DATABASE_CONNECT.HTTP;

        BTElib.checkConnectToWifiBox();
        BTElib.syncPlaybackQueue();
        BTElib.syncPlaybackInfo();

        DeviceEventEmitter.addListener('ConnectToBox', this.handleConnectToBox);
        DeviceEventEmitter.addListener('PlaybackInfoUpdate', this.handlePlaybackChange);
        DeviceEventEmitter.addListener('SongQueueChange', this.handleSongQueueChange);
    }

    componentDidMount() {
        //console.warn("componentDidMount");
        this._currentScreen = this._homeScreen; 
        //BoxControl.syncPlaybackQueue();
        setTimeout(()=>{
            //this.ping();
        },1000);
    }

    handleConnectToBox = (e) =>{
       // console.warn("event leng = "+e['isConnected']);
        GLOBALS.IS_BOX_CONNECTED = e['isConnected'];
        GLOBALS.IS_NO_WIFI_CHECKED = false;
        // connect to box event
        EventRegister.emit("ConnectToBox",e);
        // Refresh song list
        EventRegister.emit("SongUpdate",{});
    }

    handlePlaybackChange = (e) =>{
        console.warn("volume "+e['volume']);
        console.warn("play "+e['play']);
        console.warn("mute "+e['mute']);
        console.warn("original "+e['original']);
    }
    handleSongQueueChange = (e) =>{
        console.warn("queue length "+e['queue'].length);
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

        // Open Second screen
        this._listenerOpenSecondScreenEvent = EventRegister.addEventListener('OpenSecondScreen', (data) => {
            this._secondScreen.open(data.type);
        });
    }
    componentWillUnmount() {
        //EventRegister.removeEventListener(this._listenerControlEvent);
        EventRegister.removeEventListener(this._listenerHideFooterEvent);
        EventRegister.removeEventListener(this._listenerShowFooterEvent);
        EventRegister.removeEventListener(this._listenerShowOptOverlayEvent);
        EventRegister.removeEventListener(this._listenerOpenSecondScreenEvent);
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
        this._singOverlay.updateView(-1,GLOBALS.SING_OVERLAY.EMOJI);
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
            <Container style={{ flex: 1 }}>
                <SecondScreen 
                    bottom = {0}
                    opacity= {0} 
                    maxZindex ={11} 
                    transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={()=>{
                        this._secondScreen.hide();
                    }} 
                    ref={ref => (this._secondScreen = ref)} />

                <SingOptionOverlay opacity={0} maxZindex={10} ref={ref => (this._singOverlay = ref)} 
                    onClose ={this._onSingOverlayClose}
                />
                <OnlineScreen  opacity= {0} maxZindex ={2} 
                    transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._onlineScreen = ref)} />
                <SearchScreen opacity= {0} maxZindex ={5} transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._searchScreen = ref)}
                />
                <SongScreen opacity= {0} maxZindex ={5} transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._songScreen = ref)}
                />
                <HotScreen opacity= {0} maxZindex ={5} transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} ref={ref => (this._hotScreen = ref)}
                />
                <TheloaiScreen opacity= {0} maxZindex ={2} 
                    transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._theloaiScreen = ref)}/>
                <SingerScreen opacity= {0} maxZindex ={2} 
                    transition = {GLOBALS.TRANSITION.SLIDE_LEFT}
                    duration={250}
                    onBack={this._onBackHome} 
                    ref={ref => (this._singerScreen = ref)}/>
                <SelectedSong maxZindex ={6} transition = {GLOBALS.TRANSITION.SLIDE_TOP}
                    onBack={this._onCloseSelectedSong} ref={ref => (this._selectedSong = ref)}
                />
                <HomeScreen zIndex={1}  
                    opacity= {1} maxZindex ={1} 
                    onOpenSearch={this._onOpenSearch}
                    onOpenSinger = {this._onOpenSinger}
                    onOpenTheloai = {this._onOpenTheloai}
                    onOpenSong = {this._onOpenSong}
                    onOpenHotSong = {this._onOpenHotSong}
                    onOnlineScreen = {this._onOnlineScreen}
                    onOpenMenu = {() =>{
                        this.props.navigation.openDrawer();        
                    }}
                    ref={ref => (this._homeScreen = ref)} />

                <Footer ref={ref => (this._footer = ref)} maxZindex ={8} 
                    onOpenEmoji = {this._onOpenEmoji} 
                    onSelectedSong={this._onOpenSelectedSong} />
                <StatusBar
                    backgroundColor={GLOBALS.COLORS.STATUS_BAR}
                    // translucent={true}
                    barStyle="light-content"
                ></StatusBar>
            </Container>
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
            //this.ping();
        },1000);
    }
}

const styles = StyleSheet.create({
    
})
