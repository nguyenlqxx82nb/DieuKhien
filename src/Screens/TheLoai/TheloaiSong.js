import React from "react";
import { StyleSheet, Alert, Text } from "react-native";
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


export default class TheloaiScreen extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
        name:PropTypes.string,
        songType: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.state= {
            name : "",
            songType : GLOBALS.SONG_TYPE.ALL
        }
    }
    _onBack = () => {
        const { onBack } = this.props;
        //this._searchInput.blur();
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        this._songTabs.setVisible(true);
        this._songTabs.loadData("");
    }
    _hideCompleted = () =>{
        this._songTabs.setVisible(false);
    }
    _onChangeTab = (page) =>{
        if(this._isVisible){
            //console.warn("_onChangeTab");
            this._songTabs.loadData("");
        }
    }
    _onSearch =(value)=> {
        this._songTabs.searchData(value);
    }
    updateType = (type,name) =>{
        if(type != this.state.type){
            this.setState({type:type,name:name});
            this._songTabs.clear();
        }
    }
    renderContentView = () => {
        const  {songType,name} = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center", justifyContent: "center", marginTop: 25, height: 40
                }}>
                    <View style={{ width: 40, height: 40, marginLeft: 5 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={[styles.title]}>{name}</Text>
                    </View>
                    <View style={{ width: 40, height: 40, marginRight:5}}>
                        <IconRippe vector={true} name="search" size={20} color="#fff" />
                    </View>
                </View>

                <View style={{ flex: 1}}>
                    <SongTabsView lanTabs={['vn','en','cn','ja','kr']} ref={ref => (this._songTabs = ref)} 
                        onChangeTab = {this._onChangeTab} songType = {songType} />
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
        fontSize: 20,
        fontWeight: '300',
        marginLeft:10,
        color:"#fff",
       // flex:1,
        fontFamily:'SF-Pro-Text-Bold'
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
})
