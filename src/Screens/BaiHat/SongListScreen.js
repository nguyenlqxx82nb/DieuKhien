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
import Header from '../Header/index';
import SearchInput from '../../Views/SearchInput';

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class SongListScreen extends BaseScreen {
    static propTypes = {
        ...this.props,
        onBack: PropTypes.func,
        listType: PropTypes.number,
        songType: PropTypes.number,
        title: PropTypes.string,
        // songType: PropTypes.number,
    };

    // static defaultProps ={
    //     ...this.defaultProps,
    //     // songType: GLOBALS.SONG_TYPE.ALL,
    //     listType: GLOBALS.SONG_LIST_TYPE.ALL,
    // }

    constructor(props) {
        super(props);

        this.songChanged = false;
        this.reLoad = false;
        this.listType = (this.props.listType == null || this.props.listType == undefined)?GLOBALS.SONG_LIST_TYPE.ALL:this.props.listType
        this.state = {
            singerName : "",
            singerId : -1,
            songType : GLOBALS.SONG_TYPE.ALL,
            title:(this.props.title != null)?this.props.title:"",
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
        this._searchInput.blur();
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
    _onSearch = (value) =>{
       // this._term = value;
       // console.warn("_onSearch = "+value);
        this._songList.searchData(value);
        this._musicOnline.setTerm(value);
    }
    _onSearchChange = (value) =>{
        this._songList.searchData(value);
        this._musicOnline.setTerm(value);
    }
    _onSearchInputShow = () =>{
        this._searchInput.focus();
    }
    updateSinger = (name)=>{
        if(name != this.state.name){
            this.setState({
                singerName:name,
                title: name
            });
            this.reLoad = true;
            this.clear();
        }
    }
    updateSongType = (type,name)=>{
        if(type != this.state.songType){
            this.setState({
                songType:type,
                title:name
            })
            this.reLoad = true;
            this.clear();
        }
    }
    clear = () =>{
        this._songList.clear();
        this._searchInput.clear();
        this._searchHeader.hideSearchInput();
    }
    renderContentView = () => {
        const { singerName, singerId,songType,title } = this.state;
        return (
            <View style={{ flex: 1,width:'100%' }}>
                <View style={styles.headerContainer}>
                    <Header 
                        ref = {ref=>(this._searchHeader = ref)}
                        onBack = {this._onBack}
                        onSearchInputShow = {this._onSearchInputShow}
                        onHideInput = {()=>{
                            this._searchInput.blur();
                        }}
                        searchInput = {
                            <SearchInput style={{marginRight:0}} 
                                onSearch={this._onSearch}
                                onSearchChange = {this._onSearchChange}
                                ref={ref=>(this._searchInput = ref)}  />
                        }
                        onSearch = {this._onSearch}
                       // onSearchChange = {this._onSearchChange}
                        center ={
                            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Text style={[styles.title]}> {title}</Text>
                            </View>
                        }
                    />
                </View>
                <MusicOnline style={{top:50}} 
                    ref={ref =>(this._musicOnline = ref)}
                    onOpenOnline = {()=>{
                        this._searchInput.blur();
                    }}
                    />

                <View style={{ flex: 1, marginTop:40,borderTopWidth: 0.5,borderColor: '#00ECBC'}}>
                    <SongListView 
                        ref={ref=>(this._songList = ref)} 
                        listType = {this.listType} 
                        actor ={singerName} 
                        songType = {songType}
                     />
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
        //marginTop: GLOBALS.STATUS_BAR_HEIGHT, 
        height: 50,
        //backgroundColor :"blue"
    },
    title: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft:5,
        color:"#fff",
        fontFamily:GLOBALS.FONT.BOLD
    },
})