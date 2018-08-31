import React from "react";
import { StyleSheet, Alert,Dimensions,Animated, Image, Platform} from "react-native";
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
import SongListView from '../../Views/SongListView.js';
import MusicOnline from '../../Views/MusicOnlineButton.js';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class SingerSong extends BaseScreen {
    static propTypes = {
        onBack: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.songChanged = false;
        this.reLoad = false;
        this.state = {
            singerName : "",
            id : -1,
        }
    }
    componentWillMount() {
        // selected song changed
        this._listenerSongUpdateEvent = EventRegister.addEventListener('SongUpdate', (data) => {
            if(this._isVisible){
                this._songList.updateSong();
            }
            else{
                this.songChanged = true;
            }
        });
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerSongUpdateEvent);
    }
    _onBack = () => {
        const { onBack } = this.props;
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        if(this.reLoad){
            this._songList.refreshData("");
            this.reLoad = false;
        }
        else if(this.songChanged){
            this._songList.updateSong();
            this.songChanged = false;
        }
    }
    updateSinger = (name,id)=>{
        if(id != this.state.id){
            this.setState({
                singerName:name,
                id:id
            });
            this.reLoad = true;
            this._songList.clear();
        }
    }
    renderContentView = () => {
        const { singerName, id } = this.state;
        return (
            <View style={{ flex: 1,width:'100%' }}>
                <View style={styles.headerContainer}>
                    <View style={{ width: 40, height: 40}}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <Text style={[styles.title]}>
                            {singerName}
                    </Text>
                </View>
                <MusicOnline style={{top:75}} />

                <View style={{ flex: 1, marginTop:50,borderTopWidth: 0.5,borderColor: '#00ECBC'}}>
                    <SongListView ref={ref=>(this._songList = ref)} type = {GLOBALS.SONG_LIST_TYPE.SINGER} singer ={singerName}  />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
        marginTop: 25, 
        height: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft:5,
        color:"#fff",
        flex:1,
        fontFamily:'SF-Pro-Text-Regular'
    },
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    }

})