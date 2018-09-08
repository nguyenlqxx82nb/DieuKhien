import React from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import {
    View,
    Icon,
    // Tab, Tabs, ScrollableTab
} from "native-base";
import IconRippe from '../../Components/IconRippe.js'
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SongTabsView from '../../Views/SongTabsView.js';
import SearchInput from '../../Views/SearchInput.js';
import MusicOnline from '../../Views/MusicOnlineButton.js';


export default class SongTabScreen extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
        lsitType: PropTypes.number,
        hasOnlineButton : PropTypes.bool
    };
    constructor(props) {
        super(props);

        this._listType = (this.props._listType != null)? this.props._listType: GLOBALS.SONG_LIST_TYPE.ALL;
        this._hasOnlineButton = (this.props.hasOnlineButton != null)?this.props.hasOnlineButton: true;
    }
    _onBack = () => {
        const { onBack } = this.props;
        this._searchInput.blur();
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        this._songTabs.setVisible(true);
        this._songTabs.loadData(this._searchInput.getValue());
    }

    _hideCompleted = ()=>{
        this._songTabs.setVisible(false);
    }
    
    focusSearchInput = () =>{
        this._searchInput.focus();
    }

    _onChangeTab = (page) =>{
        if(this._isVisible){
            //console.warn("_onChangeTab");
            this._songTabs.loadData(this._searchInput.getValue());
        }
    }
    _onSearch =(value)=> {
        this._songTabs.searchData(value);
        if(this._musicOnline != null)
            this._musicOnline.setTerm(value);
    }
    renderContentView = () => {
        var top = (this._hasOnlineButton)?40:0;
        
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <View style={{ width: 40, height: 40, marginLeft: 0 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <SearchInput ref={ref=>(this._searchInput = ref)} 
                        onSearchChange={this._onSearch}
                        onSearch={this._onSearch} />
                </View>

                <View style={{ flex: 1}}>
                    <SongTabsView 
                        lanTabs={[GLOBALS.LANGUAGE_KEY.vn,GLOBALS.LANGUAGE_KEY.en,GLOBALS.LANGUAGE_KEY.cn,GLOBALS.LANGUAGE_KEY.ja,GLOBALS.LANGUAGE_KEY.kr]} 
                        ref={ref => (this._songTabs = ref)} 
                        songListType = {this._listType}
                        onChangeTab = {this._onChangeTab} 
                        top={top}/>
                </View>
                { 
                    this._hasOnlineButton && 
                    <MusicOnline 
                        ref={ref =>(this._musicOnline = ref)}
                        onOpenOnline = {()=>{
                            this._searchInput.blur();
                        }}
                    />
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        //marginTop: GLOBALS.STATUS_BAR_HEIGHT,
        height: 45,
        overflow: "hidden"
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
})
