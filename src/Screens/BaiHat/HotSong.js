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


export default class HotScreen extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
    };
    constructor(props) {
        super(props);
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
    _hideCompleted = () =>{
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
    }
    renderContentView = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center", justifyContent: "center", marginTop: 25, height: 40
                }}>

                    <View style={{ width: 40, height: 40, marginLeft: 0 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <SearchInput ref={ref=>(this._searchInput = ref)} onSearch={this._onSearch} />
                </View>

                <View style={{ flex: 1}}>
                    <SongTabsView 
                            lanTabs={['vn','en','cn','ja','kr']} 
                            ref={ref => (this._songTabs = ref)} 
                            songListType = {GLOBALS.SONG_LIST_TYPE.HOT}
                            onChangeTab = {this._onChangeTab} />
                </View>

                <MusicOnline />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center", alignItems: "center"
    },
    contentContainer: {
        justifyContent: "center", alignItems: "center", marginRight: 25,
        marginLeft: 25, marginTop: 10, marginBottom: 10
    },
    headerContainer: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        height: 50,
        overflow: "hidden"
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
})
