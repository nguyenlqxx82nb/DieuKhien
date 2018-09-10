import React from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
    // Tab, Tabs, ScrollableTab
} from "native-base";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import CustomScrollableTabBar from '../Components/CustomScrollableTabBar.js'
import GLOBALS from '../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SongListView from './SongListView.js';


export default class SongTabsView extends React.Component {
    static propTypes = {
        lanTabs: PropTypes.array.isRequired,
        onChangeTab : PropTypes.func,
        songType : PropTypes.number,
        songListType : PropTypes.number,
        top : PropTypes.number
    };
    static defaultProps = {
        songType : GLOBALS.SONG_TYPE.ALL,
        songListType : GLOBALS.SONG_LIST_TYPE.ALL,
        top : 40
    };

    _tabs = [];
    _currPage = 0;
    _searchTerm = "";
    _isVisible = false;
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._listenerSongUpdateEvent = EventRegister.addEventListener('SongUpdate', (data) => {
            if(this._isVisible)
                this._tabs[this._currPage].updateSong();
        });

        this._listenerDownloadSongEvent = EventRegister.addEventListener('SongDownloadUpdate', () => {
            if(this.props.songListType == GLOBALS.SONG_LIST_TYPE.UNDOWNLOAD){
                if(this._isVisible)
                    this._tabs[this._currPage].updateDownloadSong();
            }
        });
    }
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerSongUpdateEvent);
        EventRegister.removeEventListener(this._listenerDownloadSongEvent);
    }

    _onOptionBaiHatClick = (id, overlayType) => {
        const { onOptionOverlayOpen } = this.props;
        if (onOptionOverlayOpen != null) {
            onOptionOverlayOpen(id,overlayType);
        }
    }

    _onChangeTab = (page) => {
        this._currPage = page.i;
        if(this.props.onChangeTab != null){
            this.props.onChangeTab(page.i);
        }
    }

    setVisible = (isVisible) =>{
        this._isVisible = isVisible;
    }

    loadData = (term) =>{
        this._searchTerm = term;
        this._tabs[this._currPage].loadData(term);
    }

    clear = () =>{
        this._tabs[this._currPage].clear();
    }

    searchData = (term) =>{
        this._searchTerm = term;
        this._tabs[this._currPage].searchData(term);
    }

    refreshData = () =>{
        this._tabs[this._currPage].refreshData("");
    }
    
    render() {
        return (
            <ScrollableTabView
                        style={{ marginTop: 0, }}
                        initialPage={0}
                        onChangeTab = {this._onChangeTab}
                        renderTabBar={() => 
                        <CustomScrollableTabBar
                            underlineStyle={{ height: 0 }}
                            activeTextColor={"#0ECAB1"}
                            inactiveTextColor={"#fff"}
                            textStyle={{ fontSize: 13, color: "#fff", fontFamily:GLOBALS.FONT.BOLD }}
                            style={{ borderWidth: 0}}
                        />}
                    >
                    {this.props.lanTabs.map((lan, index) => {
                       return (
                            <View key={index} style={[styles.tabContent,{marginTop:this.props.top}]} tabLabel={GLOBALS.LANGUAGE_NAME[lan]}>
                                <SongListView 
                                    listType = {this.props.songListType}
                                    lan={lan} 
                                    songType={this.props.songType} 
                                    ref={ref => (this._tabs[index] = ref)} />
                            </View>) ;
                    })}
                    </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        borderTopWidth: 0.5,
        borderColor: '#00ECBC',
    },
})
