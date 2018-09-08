import React from "react";
import { StyleSheet, Text } from "react-native";
import BaseScreen from "../Screens/ScreenBase"
import PropTypes from 'prop-types';
import {
    View,
} from "native-base";
import IconRippe from '../Components/IconRippe.js'
import { Grid, Col , Row} from "react-native-easy-grid";
import GLOBALS from '../DataManagers/Globals.js';
import Ngonngu from '../SideBar/Ngonngu';
import Secure from '../SideBar/Secure';
import SongTabScreen from '../Screens/BaiHat/SongTabScreen';

import { EventRegister  } from 'react-native-event-listeners';

export default class SecondScreen extends BaseScreen {
    static propTypes = {
        onBack: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            type : GLOBALS.SECOND_SCREEN.NONE
        }
    }
    
    _onBack = () => {
        const { onBack } = this.props;
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        //this._songTabs.loadData(this._searchInput.getValue(),this._sex);
    }
    _onSearch =(value)=> {
        //this._songTabs.searchData(value,this._sex);
    }
    _showOptOverlay = () =>{
       // EventRegister.emit('ShowOptOverlay', {id:-1,overlayType:GLOBALS.SING_OVERLAY.SINGER});
    }

    open = (type) => {
        if(this._isVisible){
            this.hide(()=>{
                //console.warn("hide callback");
                this.setState({type:type});
                this.show();
            });
        }
        else{
            this.setState({type:type});
            this.show();
        }
        
    }
    
    renderContentView = () => {
        const {type} = this.state;
        if(type == GLOBALS.SECOND_SCREEN.NGONNGU){
            this._maxIndex = 11;
            return <Ngonngu onBack = {this._onBack} />
        }
        else if(type == GLOBALS.SECOND_SCREEN.SECURE){
            this._maxIndex = 11;
            return <Secure onBack = {this._onBack} />
        }
        else if(type == GLOBALS.SECOND_SCREEN.SONG.UNDOWNLOAD){
            this._maxIndex = 6;
            return <SongTabScreen 
                        //hasOnlineButton={false}
                        listType= {GLOBALS.SONG_LIST_TYPE.UNDOWNLOAD}
                        opacity= {1} 
                        maxZindex ={1} 
                        onBack={this._onBack} 
                        ref={ref => (this._songScreen = ref)} />
        }
        else  if(type == GLOBALS.SECOND_SCREEN.SONG.DOWNLOADING){
            this._maxIndex = 6;
            return <SongTabScreen 
                       // hasOnlineButton={false}
                        listType= {GLOBALS.SONG_LIST_TYPE.DOWNLOADING}
                        opacity= {1} 
                        maxZindex ={1} 
                        onBack={this._onBack} 
                        ref={ref => (this._songScreen = ref)} />
        }
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor:GLOBALS.COLORS.HEADER,
        height: 60
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        //paddingLeft:20,
        marginLeft:10,
        color:"#fff",
       // flex:1,
        fontFamily:'SF-Pro-Text-Regular'
    },
    textFlag: {
        fontFamily: "SF-Pro-Text-Regular",
        fontSize: 13, 
        //marginLeft: 15,
        color:"#fff",
        marginTop:5
    },

    containerFlag:{
        width:240,
        height:155,
        justifyContent:"center",
        alignItems:"center",
        
    }

})
