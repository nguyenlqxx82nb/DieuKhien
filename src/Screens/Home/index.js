import React from "react";
import { Text, StatusBar, Image, StyleSheet, Dimensions, Easing } from "react-native";
import {
    View
} from "native-base";

import Footer from '../Footer/footer.js';
import HomeScreen from './Home.js';
import SingScreen from '../BaiHat/index.js';
import SelectedSong from '../BaiHat/SelectedSong.js';
import SingOptionOverlay from './SingOptionOverlay.js';
import { EventRegister } from 'react-native-event-listeners'
import DataInfo from '../../DataManagers/DataInfo.js';
import Globals from "../../DataManagers/Globals.js";

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class Taisao extends React.Component {
    _currentScreen = null;
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._listenerControlEvent = EventRegister.addEventListener('ControlEvent', (data) => {
            if(data.cmd == Globals.CONTROL_CMD.SELECT){
                if(DataInfo.PLAY_QUEUE.indexOf(data.songId) === -1){
                    DataInfo.PLAY_QUEUE.push(data.songId);
                    setTimeout(()=>{
                        EventRegister.emit('SongUpdate',DataInfo.PLAY_QUEUE);
                    },500);
                }
            }
        });

        // Hide Footer
        this._listenerHideFooterEvent = EventRegister.addEventListener('HideFooter', (data) => {
            this._footer.hide();
        });
        // Show Footer
        this._listenerShowFooterEvent = EventRegister.addEventListener('ShowFooter', (data) => {
            setTimeout(()=>{
                this._footer.show();
            },500);
        });
        // Show overlay
        this._listenerShowOptOverlayEvent = EventRegister.addEventListener('ShowOptOverlay', (data) => {
            this._singOverlay.updateView(data.id,data.overlayType);
            this._footer.hide();
            this._singOverlay.show();
        });
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerControlEvent);
        EventRegister.removeEventListener(this._listenerHideFooterEvent);
        EventRegister.removeEventListener(this._listenerShowFooterEvent);
        EventRegister.removeEventListener(this._listenerShowOptOverlayEvent);
    }

    componentDidMount() {
        this._currentScreen = this._homeScreen; 
    }
    
    _onOpenSearch = () => {
        this._homeScreen.hide();
        this._singScreen.show();
        this._singScreen.focusSearchInput();
        
        this._currentScreen = this._singScreen;
    }
    _onOpenSelectedSong = () => {
        this._currentScreen.hide();
        this._selectedSong.show();

        //this._currentScreen = this._selectedSong;
    }

    _onBackHome = ()=>{
        this._homeScreen.show();
        this._currentScreen.hide();

        this._currentScreen = this._homeScreen; 
    }

    _onCloseSelectedSong = () => {
        this._selectedSong.hide();
        this._currentScreen.show();
    }
    _onSingOverlayClose = () => {
        this._footer.show();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image source={Globals.BackgroundImage} style={style.imageBg} />

                <SingOptionOverlay opacity={0} maxZindex={5} ref={ref => (this._singOverlay = ref)} 
                    onClose ={this._onSingOverlayClose}
                />
                <SingScreen opacity= {0} maxZindex ={1}
                    onBack={this._onBackHome} ref={ref => (this._singScreen = ref)}
                />
                <SelectedSong maxZindex ={2}
                    onBack={this._onCloseSelectedSong} ref={ref => (this._selectedSong = ref)}
                />

                <HomeScreen zIndex={1} opacity= {1} maxZindex ={1} onOpenSearch={this._onOpenSearch}
                    ref={ref => (this._homeScreen = ref)} />

                <Footer ref={ref => (this._footer = ref)} maxZindex ={3} onSelectedSong={this._onOpenSelectedSong} />
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
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    }
})
