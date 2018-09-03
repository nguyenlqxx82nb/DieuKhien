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
        this.setState({type:type});
        this.show();
    }

    renderView = () =>{
        const {type} = this.state;
        if(type == GLOBALS.SECOND_SCREEN.NGONNGU){
            return <Ngonngu />
        }
        else if(type == GLOBALS.SECOND_SCREEN.SECURE){
            return <Secure />
        }
    }
    
    renderContentView = () => {
        var title = "";
        const {type} = this.state;
        if(type == GLOBALS.SECOND_SCREEN.NGONNGU){
            title = "Ngôn ngữ";
        }
        else if(type == GLOBALS.SECOND_SCREEN.SECURE){
            title = "Mật Khẩu";    
        }
        return (
            <View style={{ flex: 1}}>
                <View style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <View style={{ width: 40, height: 40 , marginLeft:5}}>
                            <IconRippe vector={true} name="back" size={20} color="#fff"
                                onPress={this._onBack} />
                        </View>
                        <View style={{flex:1, justifyContent:"center",alignItems:"flex-start"}}>
                            <Text style={[styles.title]}>{title}</Text>
                        </View>
                    </View>

                    {this.renderView()}
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
