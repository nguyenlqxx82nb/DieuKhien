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

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class SelectedSong extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
    };
    static defaultProps = {
        onOptionOverlayOpen: null,
        onBack: null,
    };
    constructor(props) {
        super(props);

        this._pos = new Animated.Value(screen.height);
    }

    show = () => {
        let that = this;
        const { maxZindex } = this.props;

        Animated.timing(this._pos, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
            duration: 300,
        }).start(function onComplete() {
            that._songList.refreshData("");
            // container.setNativeProps({
            //     style: {
            //         zIndex: maxZindex
            //     }
            // });
        });
    }

    hide = () => {
        let container = this._container;
        //console.warn("maxZindex = "+maxZindex);
        //if(maxZindex == '')
        Animated.timing(this._pos, {
            toValue: screen.height,
            useNativeDriver: Platform.OS === 'android',
            duration: 250,
        }).start(function onComplete() {
            // container.setNativeProps({
            //     style: {
            //         zIndex: 0
            //     }
            // });
        });
    }

    _onBack = () => {
        const { onBack } = this.props;
        if (onBack) {
            onBack();
        }
    }
    showCompleted = () =>{
        this._songList.refreshData("");
    }
    render = () => {
        //const { maxZindex } = this.props;
        return (
            <Animated.View
                ref={ref => (this._container = ref)}
                style={[styles.container, { transform: [{ translateY: this._pos }] }]}>
                {/* <Image source={GLOBALS.BackgroundImage} style={styles.imageBg} /> */}
                <View style={{ flex: 1,width:'100%' }}>
                    <View style={styles.headerContainer}>
                        <View style={{ width: 40, height: 40, marginLeft: 0 }}>
                            <IconRippe vector={true} name="listClose" size={20} color="#fff"
                                onPress={this._onBack}
                            />
                        </View>
                        <Text style={[styles.title]}>
                                Bài đã chọn
                        </Text>
                    </View>

                    <View style={{ flex: 1, marginBottom: 115 }}>
                        <SongListView ref={ref=>(this._songList = ref)} type = {GLOBALS.SONG_LIST_TYPE.SELECTED}  />
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        top:0,
        position:"absolute",
        height: screen.height,
        width: screen.width,
        zIndex:2,
    },
    
    headerContainer: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
        marginTop: 25, 
        height: 50,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        borderColor: '#00ECBC',
    },
    title: {
        fontSize: 18,
        fontWeight: '300',
        marginLeft:20,
        color:"#fff",
        flex:1
    },
    imageBg:{
        position:"absolute",
        width: screen.width,
        height:screen.height,
        zIndex:0
    }

})
