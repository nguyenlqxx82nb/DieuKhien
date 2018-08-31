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
import { Grid, Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SingerTabsView from '../../Views/SingerTabsView.js';
import SearchInput from '../../Views/SearchInput.js';
import SingerSong from '../BaiHat/SingerSong';
import MusicOnline from '../../Views/MusicOnlineButton'


export default class SingerScreen extends BaseScreen {
    _sex = GLOBALS.SINGER_SEX.ALL;
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // selected song changed
        this._listenerSingerSongEvent = EventRegister.addEventListener('OpenSingerSong', (data) => {
            this.singerSong.updateSinger(data.name,data.id);
            this.singerSong.show();
        });
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerSingerSongEvent);
    }
    _onBack = () => {
        const { onBack } = this.props;
        this._searchInput.blur();
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        this._songTabs.loadData(this._searchInput.getValue(),this._sex);
    }

    focusSearchInput = () =>{
        this._searchInput.focus();
    }

    _onChangeTab = (page) =>{
        if(this._isVisible){
            //console.warn("_onChangeTab");
            this._songTabs.loadData(this._searchInput.getValue(),this._sex);
        }
    }
    _onSearch =(value)=> {
        this._songTabs.searchData(value,this._sex);
    }
    _showOptOverlay = () =>{
        EventRegister.emit('ShowOptOverlay', {id:-1,overlayType:GLOBALS.SING_OVERLAY.SINGER});
    }
    renderContentView = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <View style={{ width: 40, height: 40 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack} />
                    </View>
                    <SearchInput ref={ref=>(this._searchInput = ref)}
                        style = {{marginRight:0}}    
                        onSearch={this._onSearch}  />
                    <View style={{ width: 40, height: 40}}>
                        <IconRippe vector={true} name="menu" size={20} color="#fff"
                            onPress={this._showOptOverlay} />
                    </View>
                </View>

                <View style={{ flex: 1}}>
                    <SingerTabsView lanTabs={['vn','en','cn','ja','kr']} ref={ref => (this._songTabs = ref)} 
                        onChangeTab = {this._onChangeTab} />
                </View>

                <MusicOnline />
                <SingerSong 
                    ref = {ref => (this.singerSong = ref)} 
                    transition={GLOBALS.TRANSITION.SLIDE_LEFT} 
                    maxZindex = {3}
                    type={GLOBALS.SCREEN_TYPE.TOP}
                    onBack = {() => {
                        this.singerSong.hide();
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    headerContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
       // marginTop: GLOBALS.STATUS_BAR_HEIGHT, 
        height: 40
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
