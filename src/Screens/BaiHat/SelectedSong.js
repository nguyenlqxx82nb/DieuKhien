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

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class SelectedSong extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.songChanged = false;
    }
    componentWillMount() {
        // selected song changed
        this._listenerSongUpdateEvent = EventRegister.addEventListener('SongUpdate', (data) => {
            if(this._isVisible){
                this._songList.refreshData("");
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
        if(this.songChanged){
            this._songList.refreshData("");
            this.songChanged = false;
        }
    }
    renderContentView = () => {
        //const { maxZindex } = this.props;
        return (
            <View style={{ flex: 1,width:'100%' }}>
                <View style={styles.headerContainer}>
                    <View style={{ width: 40, height: 40, marginLeft: 10 }}>
                        <IconRippe vector={true} name="listClose" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <Text style={[styles.title]}>
                            Bài đã chọn
                    </Text>
                </View>

                <View style={{ flex: 1}}>
                    <SongListView ref={ref=>(this._songList = ref)} type = {GLOBALS.SONG_LIST_TYPE.SELECTED}  />
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
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        borderColor: '#00ECBC',
    },
    title: {
        fontSize: 20,
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
    }

})