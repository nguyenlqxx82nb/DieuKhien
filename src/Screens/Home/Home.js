import React from "react";
import { StatusBar, ImageBackground, Image, StyleSheet, Dimensions } from "react-native";

import {
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right,
    View,
    Footer,
    FooterTab
} from "native-base";

import CustomIcon from '../../Components/CustomIcon.js'
import AutoHeightImage from 'react-native-auto-height-image';
import { Col, Grid, Row } from "react-native-easy-grid";
import TextTicker from 'react-native-text-ticker'

import styles from "./styles";
import IconRippe from '../../Components/IconRippe.js'

import LinearGradient from 'react-native-linear-gradient';

const screenBg = require("../../../assets/background.png");
const logo = require("../../../assets/logo.png");
const playSrc = require("../../../assets/play3x.png");
const replaySrc = require("../../../assets/replay3x.png");
const nextSrc = require("../../../assets/next3x.png");
const micSrc = require("../../../assets/mic3x.png");
const emojiSrc = require("../../../assets/emoji3x.png");
const volmSrc = require("../../../assets/volume3x.png");
const listSrc = require("../../../assets/iconList3x.png");
const arrowLeftSrc = require("../../../assets/arrowLeft.png");
const arrowRightSrc = require("../../../assets/arrowRight.png");
const marqBgSrc = require("../../../assets/marqBg.png");
const singerOptSrc = require("../../../assets/singer.png");
const hotOptSrc = require("../../../assets/hot.png");
const onlineOptSrc = require("../../../assets/online.png");
const singOptSrc = require("../../../assets/sing.png");
const typeOptSrc = require("../../../assets/type.png");

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.warn("SCREEN WIDTH : "+screen.width+" , Height: "+screen.height);
        return (

            <Container>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1, y: 0.7}} locations={[0.4,0.6,1]} colors={['#444083', '#435EA0', '#59D3CF']} 
                    style={{flex:1}}>
                    <Grid>
                        <Row style={{ height: 75 }}>
                            <View style={{justifyContent: "center",flex:1, flexDirection: "row", backgroundColor: 'rgba(52, 52, 52, 0.0)',
                                            alignItems: "center", marginTop: 25, height: 55 }}>
                                <Left>
                                    <Button rounded transparent onPress={() => this.props.navigation.goBack()}
                                        style={{ width: 50, height: 50 }} >
                                        <Icon name="search" style={styles.icon} /> 
                                        {/* <CustomIcon name="clubs" size ={30} style={{color:"#ffffff"}} /> */}
                                    </Button>
                                </Left>
                                <View>
                                    <AutoHeightImage source={logo} width={70} ></AutoHeightImage>
                                </View>
                                <Right>
                                    <Button rounded transparent>
                                        <Icon name="menu" style={styles.icon} />
                                    </Button>
                                </Right>
                            </View>
                        </Row>

                        <Row style={{justifyContent:"center",alignItems:"center", marginRight:25, marginLeft:25,marginTop:10,marginBottom:10}}>
                            <View style={{flex:1}}>
                                <Grid>
                                    <Row size={1}>
                                        <Grid>
                                            <Col size={1}>
                                                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0.9, y: 0.7}} colors={['#FF8888', '#EE4B4C', '#DB0909']} style={[style.container3, { backgroundColor: "#DE1313" }]}>
                                                    <IconRippe square={false} width={75} height={103} iconSource={hotOptSrc} /> 
                                                </LinearGradient>
                                            </Col>
                                            <Col size={1}>
                                                <LinearGradient  start={{x: 0.0, y: 0}} end={{x: 0.9, y: 0.7}}
                                                    locations={[0.3,0.6,1]} colors={['#FFF70A', '#FFBB06', '#FF5A01']} style={[style.container3, { backgroundColor: "#FF7B03" }]}>
                                                    <IconRippe square={false} width={75} height={103} iconSource={singOptSrc} />
                                                </LinearGradient>
                                            </Col>
                                        </Grid>
                                    </Row>
                                    <Row size={1}>
                                        <Col size={1}>
                                            <LinearGradient colors={['#D1EB3F', '#6DCD34', '#0AAF29']}  style={[style.container3, { backgroundColor: "#52C531" }]}>
                                                <IconRippe square={false} width={75} height={103} iconSource={singerOptSrc} />
                                            </LinearGradient>
                                        </Col>
                                        <Col size={1}>
                                            <LinearGradient colors={['#FF99CC', '#BD4ED4', '#7F08DC']}  style={[style.container3, { backgroundColor: "#A230D8" }]}>
                                                <IconRippe square={false} width={75} height={103} iconSource={typeOptSrc} />
                                            </LinearGradient>
                                        </Col>
                                    </Row>
                                    <Row size={1}>
                                        <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0.9, y: 0.7}}
                                                    locations={[0.1,0.4,1]} colors={['#7DC4E3', '#59A3DB', '#3481D3']}  style={[style.container3, { backgroundColor: "#4994D8" }]}>
                                            <IconRippe square={false} width={223} height={80} iconSource={onlineOptSrc} />
                                        </LinearGradient>
                                    </Row>
                                </Grid>
                            </View>
                        </Row>

                        <Row style={{ height: 120, justifyContent:"center",alignItems:"center"}}>
                            <View style={{opacity:1, flex:1, backgroundColor: "#444083", flexDirection: "row", height: 120, paddingTop: 5, paddingBottom: 5 }}>
                                <Grid>
                                    <Row size={1}>
                                        <Grid>
                                            <Col style={{ width: 60, alignItems: "flex-start" }}>
                                                <View style={{ flex: 1, width: 40, marginLeft: 10 }}>
                                                    <IconRippe size={25} iconSource={volmSrc} />
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
                                                        marqueeDelay={0}
                                                    >
                                                        Super long piece of text is long. The quick brown fox jumps over the lazy dog.
                                            </TextTicker>
                                                    <Image source={marqBgSrc} style={{ position: "absolute", left: 0, top: 0, width: 190, height: 25 }} />
                                                    <Image source={arrowRightSrc} style={{ position: "absolute", right: -20, top: 5, width: 16, height: 16 }} />
                                                </View>
                                            </Col>
                                            <Col style={{ width: 60, alignItems: "flex-end" }}>
                                                <View style={{ flex: 1, width: 40, marginRight: 10 }}>
                                                    <IconRippe size={25} iconSource={listSrc} />
                                                </View>
                                            </Col>
                                        </Grid>
                                    </Row>
                                    <Row size={2}>
                                        <Grid>
                                            <Col size={1} style={[style.container_center]}>
                                                <View style={style.container2}>
                                                    <IconRippe size={30} iconSource={emojiSrc} />
                                                </View>
                                            </Col>
                                            <Col size={1} style={[style.container_center]}>
                                                <View style={style.container2}>
                                                    <IconRippe size={30} iconSource={replaySrc} />
                                                </View>
                                            </Col>
                                            <Col size={1}>
                                                <IconRippe size={50} iconSource={playSrc} />
                                            </Col>
                                            <Col size={1} style={[style.container_center]}>
                                                <View style={style.container2}>
                                                    <IconRippe size={25} iconSource={nextSrc} />
                                                </View>
                                            </Col>
                                            <Col size={1} style={[style.container_center]}>
                                                <View style={style.container2}>
                                                    <IconRippe size={25} iconSource={micSrc} />
                                                </View>
                                            </Col>
                                        </Grid>
                                    </Row>
                                </Grid>
                            </View>
                        </Row>
                    </Grid>
                    {/* 

                    <Content padder>
                       
                    </Content>

                     */}
                </LinearGradient>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="light-content"
                ></StatusBar>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container_center: {
        justifyContent: "center", alignItems: "center"
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
    }
})
