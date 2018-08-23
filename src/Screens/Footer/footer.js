import React from "react";
import { Image, StyleSheet, Dimensions, Animated, Platform } from "react-native";
import {
    Right,
    View
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";
import TextTicker from 'react-native-text-ticker'
import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import BTELib from 'react-native-bte-lib';
import GLOBALS from "../../DataManagers/Globals.js";
import DATA_INFO from '../../DataManagers/DataInfo.js';
import BoxControl from '../../DataManagers/BoxControl.js';
import { EventRegister } from 'react-native-event-listeners';
import Slider from 'react-native-slider';

const arrowLeftSrc = require("../../../assets/arrowLeft.png");
const arrowRightSrc = require("../../../assets/arrowRight.png");
const marqBgSrc = require("../../../assets/marqBg.png");

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

export default class FooterHome extends React.Component {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onSelectedSong: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        //this.onPlayPress = this.onPlayPress.bind(this);

        this._state = {
            bottomValue: new Animated.Value(0),
        }

        this._topViewOpacity = {
            text : new Animated.Value(1),
            volume : new Animated.Value(0),
        }

        this.state = {
            volume : DATA_INFO.PLAYBACK_INFO.Volume,
        }
    }

    componentWillMount() {
        // Update playback info
        this._listenerPlaybackInfoEvent = EventRegister.addEventListener('PlaybackInfoUpdate', (data) => {
            this._playBtn.setIconType(DATA_INFO.PLAYBACK_INFO.IsPlaying ? 2 : 1);
            this._micBtn.setIconType(DATA_INFO.PLAYBACK_INFO.IsMute ? 2 : 1);
            this.setState({volume:DATA_INFO.PLAYBACK_INFO.Volume});
        });
    }
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerPlaybackInfoEvent);
    }

    _onPlayPress = () => {
        const { onTest } = this.props;
        if (onTest != null) {
            onTest();
        }

        // BTELib.getPlaybackInfo((volume)=>{
        //     BTELib.alert('volume = '+volume);
        // });
        BoxControl.play();
    }

    _onMicPress = () => {
        BoxControl.mic();
    }

    _openSongList = () =>{
        const { onSelectedSong } = this.props;
        if(onSelectedSong != null){
            onSelectedSong();
        }
    }

    show = () => {
        let container = this._container;
        const { maxZindex } = this.props;

        Animated.timing(this._state.bottomValue, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
            duration: 150,
        }).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: maxZindex
                }
            });
        });
    }

    hide = () => {
        let container = this._container;
        const { maxZindex } = this.props;
        //console.warn("maxZindex = "+maxZindex);
        //if(maxZindex == '')
        Animated.timing(this._state.bottomValue, {
            toValue: 120,
            useNativeDriver: Platform.OS === 'android',
            duration: 150,
        }).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });
    }

    _openVolumeView = () =>{
        let that = this;
        Animated.timing(this._topViewOpacity.text, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
            duration: 200,
        }).start(function onComplete() {
            that._textView.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });

        Animated.timing(this._topViewOpacity.volume, {
            toValue: 1,
            useNativeDriver: Platform.OS === 'android',
            duration: 400,
        }).start(function onComplete() {
            that._volmView.setNativeProps({
                style: {
                    zIndex: 1
                }
            });
        });
    }
    _closeVolumeView = () =>{
        let that = this;
        Animated.timing(this._topViewOpacity.text, {
            toValue: 1,
            useNativeDriver: Platform.OS === 'android',
            duration: 400,
        }).start(function onComplete() {
            that._textView.setNativeProps({
                style: {
                    zIndex: 1
                }
            });
        });

        Animated.timing(this._topViewOpacity.volume, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
            duration: 200,
        }).start(function onComplete() {
            that._volmView.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });
    }

    _onVolumeChange = () =>{
        //console.warn("_onVolumeChange = "+this.state.volume);
        BoxControl.volumeChange(this.state.volume);
    }

    render() {
        const { bottomValue } = this._state;

        var playIconType = (DATA_INFO.PLAYBACK_INFO.IsPlaying) ? 2 : 1;
        var micIconType = (DATA_INFO.PLAYBACK_INFO.IsMute) ? 2 : 1;

        return (
            <Animated.View
                ref={ref => (this._container = ref)}
                style={[styles.footerContainer, { transform: [{ translateY: bottomValue }] }]}>
                <Grid>
                    <Row style={{ height: 35 }}>
                        <Animated.View style={[styles.topContainer,{zIndex:1,opacity:this._topViewOpacity.text}]} ref={ref => (this._textView=ref)}>
                            <Grid>
                                <Col style={{ width: 60, alignItems: "flex-start" }}>
                                    <View style={{ flex: 1, width: 40, marginLeft: 10 }}>
                                        <IconRippe vector={true} size={25} name="volumnOn"
                                            onPress ={this._openVolumeView} />
                                    </View>
                                </Col>
                                <Col style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ width: 190, position: "relative" }}>
                                        <Image source={arrowLeftSrc} style={{ position: "absolute", left: -20, top: 5, width: 16, height: 16 }} />
                                        <TextTicker
                                            style={{ fontSize: 16, color: 'white', width: 190 }}
                                            duration={20000}
                                            loop
                                            scroll
                                            repeatSpacer={0}
                                            marqueeDelay={0}>
                                            Super long piece of text is long. The quick brown fox jumps over the lazy dog.
                                        </TextTicker>
                                        <Image source={marqBgSrc} style={{ position: "absolute", left: 0, top: 0, width: 190, height: 25 }} />
                                        <Image source={arrowRightSrc} style={{ position: "absolute", right: -20, top: 5, width: 16, height: 16 }} />
                                    </View>
                                </Col>
                                <Col style={{ width: 60, alignItems: "flex-end" }}>
                                    <View style={{ flex: 1, width: 40, marginRight: 10 }}>
                                        <IconRippe vector={true} size={25} name="list" onPress={this._openSongList} />
                                    </View>
                                </Col>
                            </Grid>
                        </Animated.View>
                        <Animated.View style={[styles.topContainer,{zIndex:0,opacity:this._topViewOpacity.volume}]} 
                            ref={ref => (this._volmView = ref)}>
                            <View style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection: "row"}}>
                                <View style={{width: 40, marginLeft: 10,height:35 }}>
                                    <IconRippe vector={true} size={25} name="volumn"
                                            onPress ={this._closeVolumeView} />
                                </View>
                                <View style={{flex: 1,
                                                height:35,
                                                alignItems: 'stretch',
                                                justifyContent: 'center',}}>
                                    <Slider
                                        thumbTintColor ="#fff"
                                        minimumTrackTintColor = "#fff"
                                        maximumTrackTintColor ="#69669C"
                                        value={this.state.volume} 
                                        onValueChange={(value) => this.setState({volume : value})}
                                        onSlidingComplete = {this._onVolumeChange}
                                        /> 
                                </View>
                                
                                <View style={{width: 40, marginRight: 10,height:35 }}>
                                    <IconRippe vector={true} size={25} name="volumnOn" 
                                    onPress ={this._closeVolumeView} />
                                </View>
                            </View>
                        </Animated.View>
                    </Row>
                    <Row style={{ height: 80, paddingBottom: 5 }}>
                        <Grid>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe vector={true} size={30} name="emoji" />
                                </View>
                            </Col>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe vector={true} size={30} name="replay" />
                                </View>
                            </Col>
                            <Col size={1}>
                                <IconRippe ref={ref => (this._playBtn = ref)} vector={true} size={50} name="play" name1="pause" iconType={playIconType} onPress={this._onPlayPress} />
                            </Col>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe vector={true} size={25} name="next" />
                                </View>
                            </Col>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe ref={ref => (this._micBtn = ref)} vector={true} size={30} name="micOn" name1="micOff" iconType={micIconType} onPress={this._onMicPress} />
                                </View>
                            </Col>
                        </Grid>
                    </Row>
                </Grid>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container_center: {
        justifyContent: "center",
        alignItems: "center"
    },
    footerContainer: {
        position: "absolute",
        width: screen.width,
        backgroundColor: "#444083",
        height: 115,
        paddingTop: 5,
        paddingBottom: 5,
        zIndex: 2,
        bottom: 0
    },
    container2: {
        width: 55, height: 55, marginTop: 15
    },
    container3: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        borderRadius: 5,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    topContainer:{
        width:"100%",
        height:35,
        position:"absolute",
        top:0,
        justifyContent:"center",
        alignItems:"center"
    }
})
