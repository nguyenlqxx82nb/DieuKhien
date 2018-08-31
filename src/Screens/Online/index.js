import React from "react";
import { StyleSheet, Text } from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import {
    View,
} from "native-base";
import IconRippe from '../../Components/IconRippe.js'
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import YoutubeScreen from './YoutubeScreen';

export default class OnlineScreen extends BaseScreen {
    static propTypes = {
        onBack: PropTypes.func,
    };
    constructor(props) {
        super(props);
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
    _openTheloaiSong = (type,name) =>{
        this.theloaiSong.updateType(type,name);
        this.theloaiSong.show();
    }
    renderContentView = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <View style={{ width: 40, height: 40 , marginLeft:5}}>
                            <IconRippe vector={true} name="back" size={20} color="#fff"
                                onPress={this._onBack} />
                        </View>
                        <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
                            <Text style={[styles.title]}>Nhạc Online</Text></View> 
                        <View style={{ width: 40, height: 40, marginRight:5}}>
                            <IconRippe vector={true} name="search" size={20} color="#fff" />
                        </View>
                    </View>

                    <View style={{ flex: 1,margin:5,backgroundColor:"transparent", justifyContent:"center",alignItems:"center"}}>
                        <View style={styles.onlineContainer}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF6565', '#FF4242', '#FF2C2C', '#FF0404']} style={[styles.button]}>
                                <IconRippe vector={true} name="youtube3" size={100}
                                    onPress = {()=>{
                                        this.youtubeSong.show();
                                    }}
                                />
                            </LinearGradient>
                        </View>
                        <View style={styles.onlineContainer}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FFB223', '#FF9E1D', '#FF8315', '#FF4903']} style={[styles.button]}>
                                <IconRippe vector={true} name="soundcloud" size={190} />
                            </LinearGradient>
                        </View>
                        <View style={styles.onlineContainer}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#69A5E5', '#5D9CE1', '#4B90DB', '#3783D4']} style={[styles.button]}>
                                <IconRippe vector={true} name="mixcloud" size={190} />
                            </LinearGradient>
                        </View>
                    </View>
                </View>

                <YoutubeScreen 
                    ref = {ref => (this.youtubeSong = ref)} 
                    transition={GLOBALS.TRANSITION.SLIDE_LEFT} 
                    maxZindex = {3}
                    onBack = {() => {
                        this.youtubeSong.hide();
                    }}
                />

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
        height: 50
    },
    button :{
        margin:0,
        flex: 1,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },

    title: {
        fontSize: 20,
        fontWeight: '300',
        paddingLeft:20,
      //  marginLeft:5,
        color:"#fff",
       // flex:1,
        fontFamily:'SF-Pro-Text-Bold'
    },

    textButton: {
        fontFamily: "SF-Pro-Text-Bold",
        fontSize: 19, 
        //marginLeft: 15,
        color:"#fff"
    },
    onlineContainer :{
        width:240,
        height:90,
         marginBottom:40
    }

})
