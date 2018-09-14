import React from "react";
import { StyleSheet, View } from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import IconRippe from '../../Components/IconRippe.js'
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SingerTabsView from '../../Views/SingerTabsView.js';
import SearchInput from '../../Views/SearchInput.js';
import SongListScreen from '../BaiHat/SongListScreen.js';
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
        this._listenerSingerSongEvent = EventRegister.addEventListener('FilterSinger', (data) => {
            if(this._isVisible){
                this._singerTabs.searchData(this._searchInput.getValue(),data.sex);
            }
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
        this._singerTabs.loadData(this._searchInput.getValue(),this._sex);
    }

    focusSearchInput = () =>{
        this._searchInput.focus();
    }
    _onChangeTab = (page) =>{
        if(this._isVisible){
            this._singerTabs.loadData(this._searchInput.getValue(),this._sex);
        }
    }
    _onSearch =(value)=> {
        this._singerTabs.searchData(value,this._sex);
        this._musicOnline.setTerm(value);
    }
    _onSearchChange = (value)=>{
        this._singerTabs.searchData(value,this._sex);
        this._musicOnline.setTerm(value);
    }
    _showOptOverlay = () =>{
        EventRegister.emit('ShowOptOverlay', {overlayType:GLOBALS.SING_OVERLAY.SINGER,data:{height:250}});
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
                        onSearch={this._onSearch}
                        onSearchChange = {this._onSearchChange}  />
                    <View style={{ width: 40, height: 40}}>
                        <IconRippe vector={true} name="menu" size={20} color="#fff"
                            onPress={this._showOptOverlay} />
                    </View>
                </View>

                <View style={{ flex: 1}}>
                    <SingerTabsView lanTabs={['vn','en','cn','ja','kr']} 
                        ref={ref => (this._singerTabs = ref)} 
                        onChangeTab = {this._onChangeTab} />
                </View>
                <MusicOnline 
                    ref={ref =>(this._musicOnline = ref)}
                    onOpenOnline = {()=>{
                        this._searchInput.blur();
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
        height: 45
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
