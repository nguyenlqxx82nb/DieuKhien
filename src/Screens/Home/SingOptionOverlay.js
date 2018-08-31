import React from "react";
import { StyleSheet, Dimensions, TouchableWithoutFeedback,Platform,Animated} from "react-native";
import {
    View
} from "native-base";

import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import GLOBALS from '../../DataManagers/Globals.js';
import { Col, Grid, Row } from "react-native-easy-grid";

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class SingOptionOverlay extends React.Component {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onClose: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            opacityValue : new Animated.Value(0),
            yPos : new Animated.Value(240),
            overlayType : GLOBALS.SING_OVERLAY.NONE,
            height : 240
        }
    }

    _onClose =() => {
        const {onClose} = this.props;
        this.hide();
        if(onClose != null){
            onClose();
        }
    }
    updateView = (id,type) => {
        //console.warn(" renderView " + id);
        this._songId = id;
        var height = 0;
        if(type == GLOBALS.SING_OVERLAY.NORMAL){
            height = 200;
        }
        else if(type == GLOBALS.SING_OVERLAY.EMOJI){
            height = 220;
        }
        else if(type == GLOBALS.SING_OVERLAY.SINGER){
            height = 250;
        }

        this.setState({overlayType:type,height:height});
    }

    renderView = () =>{
        //console.warn("overlayType =  "+this.state.overlayType);
        if(this.state.overlayType == GLOBALS.SING_OVERLAY.NONE){
            return(<View></View>);
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.NORMAL){
            return this.renderSongOptionNormal();
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.EMOJI){
            return this.renderEmoji();
        }
        else if(this.state.overlayType == GLOBALS.SING_OVERLAY.SINGER){
            return this.renderSingerOption();
        }
    }

    renderSongOptionNormal = () =>{
        return(
            <View style={styles.innerContainer}>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="play2" size={30} 
                        text={{content: "Hát Ngay", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="uutien" size={30} 
                        text={{content: "Ưu Tiên", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="delete" size={30} 
                        text={{content: "Xóa", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
                <View style={{height:50,width:'100%', backgroundColor:"#444083"}}>
                    <IconRippe vector={true} name={""}
                        text={{content: "Hủy", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
        </View>);
    }

    renderSingerOption = () =>{
        return(
            <View style={styles.innerContainer}>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="all" size={25} 
                        text={{content: "Tất cả", layout: 1}} textStyle={[styles.textButton,styles.singerText]}
                    />
                </View>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="male" size={25} 
                        text={{content: "Nam ca sỹ", layout: 1}} textStyle={[styles.textButton,styles.singerText]}
                    />
                </View>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="famale" size={25} 
                        text={{content: "Nữ ca sỹ", layout: 1}} textStyle={[styles.textButton,styles.singerText]}
                    />
                </View>
                <View style={{height:50,width:'100%'}}>
                    <IconRippe vector={true} name="nhomnhac" size={25} 
                        text={{content: "Nhóm nhạc", layout: 1}} textStyle={[styles.textButton,styles.singerText]}
                    />
                </View>
                <View style={{height:50,width:'100%', backgroundColor:"#444083"}}>
                    <IconRippe vector={true} name={""}
                        text={{content: "Hủy", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
        </View>);
    }

    renderEmoji = () =>{
        return(
            <View style={styles.innerContainer}>
                <View style={{height:170,width:'100%'}}>
                    <Grid>
                        <Row size={1}>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo1} size = {50}
                                    text={{content: "Huýt Sáo", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo2} size = {50}
                                    text={{content: "Nụ Hôn", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo3} size = {50}
                                    text={{content: "Cười", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo4} size = {50}
                                    text={{content: "Hò Reo", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                        </Row>
                        <Row size={1}>
                        <Col size = {1}>
                            <IconRippe vector={false} iconSource = {GLOBALS.Emo5} size = {50}
                                    text={{content: "Chấm Điểm", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo6} size = {50}
                                    text={{content: "Vỗ Tay", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo7} size = {50}
                                    text={{content: "Tặng Hoa", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                            <Col size = {1}>
                                <IconRippe vector={false} iconSource = {GLOBALS.Emo8} size = {50}
                                    text={{content: "Triệu Like", layout: 2}} textStyle={styles.textEmoji} />
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <View style={{height:50,width:'100%', backgroundColor:"#444083"}}>
                    <IconRippe vector={true} name={""}
                        text={{content: "Hủy", layout: 1}} textStyle={styles.textButton}
                    />
                </View>
        </View>);
    }

    show = () => {
        const {maxZindex} = this.props;
        this._container.setNativeProps({
            style: {
                zIndex: maxZindex
            }
        });
        
        Animated.parallel([
            Animated.timing(this.state.opacityValue, {
                toValue: 0.6,
                useNativeDriver: Platform.OS === 'android',
                duration: 500,
            }),
            Animated.timing(this.state.yPos, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: 250,
            }),
        ]).start(function onComplete() {
        });
    }

    hide = () => {
        const {maxZindex} = this.props;
        let container = this._container;
        Animated.parallel([
            Animated.timing(this.state.opacityValue, {
                toValue: 0,
                useNativeDriver: Platform.OS === 'android',
                duration: 500,
            }),
            Animated.timing(this.state.yPos, {
                toValue: 240,
                useNativeDriver: Platform.OS === 'android',
                duration: 250,
            }),
        ]).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });
    }

    render = () => {
        const {opacityValue,yPos,height} = this.state;
        return (
        <View style={{position:"absolute",
                        width: screen.width,
                        top:0,
                        height: screen.height - GLOBALS.STATUS_BAR_HEIGHT,opacity:1,zIndex:0 }}
               ref={ref => (this._container = ref)}>

            <TouchableWithoutFeedback  style={styles.overlayContainer} 
                onPress={this._onClose} >
                <Animated.View 
                    ref={ref => (this._overlay = ref)}
                    style={{opacity:opacityValue,flex:1, backgroundColor: "#000"}} />
            </TouchableWithoutFeedback>
            <Animated.View  ref={ref => (this._panel = ref)}
                style={[styles.container,{height:height, transform:[{translateY: yPos}]}]}>
                {this.renderView()}
            </Animated.View>
        </View>
        );
    }
}


const styles = StyleSheet.create({
    innerContainer :{
        flex: 1,
        width:"100%"
    },
    overlayContainer: {
        position:"absolute",
        width: screen.width,
        top:0,
        height: screen.height - GLOBALS.STATUS_BAR_HEIGHT, 
        //opacity:0.6
    },
    container: {
        position:"absolute",
        width:screen.width,
        bottom:0,
        height:240,
        backgroundColor:"#323663",
        opacity:0.85
    },
    textButton: {
        fontFamily: "SF-Pro-Text-Medium",
        fontSize: 18, 
        marginLeft: 15,
        color:"#fff"
    },
    singerText : {
        fontSize: 14,
        marginLeft:25
    },
    textEmoji:{
        fontFamily: "SF-Pro-Text-Medium",
        fontSize: 12, 
        marginTop: 2,
        color:"#fff"
    }
})
