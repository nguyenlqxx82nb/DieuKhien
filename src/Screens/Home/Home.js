import React from "react";
import { StatusBar, Image, StyleSheet, Dimensions } from "react-native";

import {
    Button,
    Text,
    Container,
    Left,
    Right,
    View
} from "native-base";

import AutoHeightImage from 'react-native-auto-height-image';
import { Col, Grid, Row } from "react-native-easy-grid";
import IconRippe from '../../Components/IconRippe.js'

import LinearGradient from 'react-native-linear-gradient';
import Footer from '../Footer/footer.js';


const logo = require("../../../assets/logo.png");
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
        //console.warn("SCREEN WIDTH : "+screen.width+" , Height: "+screen.height);
        return (

            <Container>
                <LinearGradient start={{x: 0.0, y: 0}} end={{x: 1, y: 0.7}} locations={[0.4,0.6,1]} colors={['#444083', '#435EA0', '#59D3CF']} 
                    style={{flex:1}}>
                    <Grid>
                        <Row style={{ height: 75 }}>
                            <View style={{justifyContent: "center",flex:1, flexDirection: "row", backgroundColor: 'rgba(52, 52, 52, 0.0)',
                                            alignItems: "center", marginTop: 25, height: 55 }}>
                                <Left>
                                    {/* <CustomIcon name="search" size ={30} style={{color:"#ffffff"}} />  */}
                                    <View style={{ width: 50, height: 50, marginLeft:0}}>
                                        <IconRippe vector={true} name="search" size={25} color="#fff"/> 
                                    </View>
                                </Left>
                                <View>
                                    <AutoHeightImage source={logo} width={70} ></AutoHeightImage>
                                </View>
                                <Right>
                                    <View style={{ width: 50, height: 50, marginLeft:0}}>
                                        <IconRippe vector={true} name="menu" size={25} color="#fff"/> 
                                    </View>
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
                                                    <IconRippe vector={true} name="hotOpt" size={80} text={{content:"BÀI HOT",layout : 2,
                                                                                                fontFamily: "Arial",fontSize : 20}} /> 
                                                </LinearGradient>
                                            </Col>
                                            <Col size={1}>
                                                <LinearGradient  start={{x: 0.0, y: 0}} end={{x: 0.9, y: 0.7}}
                                                    locations={[0.3,0.6,1]} colors={['#FFF70A', '#FFBB06', '#FF5A01']} style={[style.container3, { backgroundColor: "#FF7B03" }]}>
                                                        <IconRippe vector={true} name="singOpt" size={77} text={{content:"BÀI HÁT",layout : 2,
                                                                                                fontFamily: "Arial",fontSize : 20}} /> 
                                                </LinearGradient>
                                            </Col>
                                        </Grid>
                                    </Row>
                                    <Row size={1}>
                                        <Col size={1}>
                                            <LinearGradient colors={['#D1EB3F', '#6DCD34', '#0AAF29']}  style={[style.container3, { backgroundColor: "#52C531" }]}>
                                                <IconRippe vector={true} name="singerOpt" size={77} text={{content:"CA SỸ",layout : 2,
                                                                                                fontFamily: "Arial",fontSize : 20}} /> 
                                            </LinearGradient>
                                        </Col>
                                        <Col size={1}>
                                            <LinearGradient colors={['#FF99CC', '#BD4ED4', '#7F08DC']}  style={[style.container3, { backgroundColor: "#A230D8" }]}>
                                                <IconRippe vector={true} name="theloai" size={77} text={{content:"THỂ LOẠI",layout : 2,
                                                                                                fontFamily: "Arial",fontSize : 20}} /> 
                                            </LinearGradient>
                                        </Col>
                                    </Row>
                                    <Row size={1}>
                                        <LinearGradient start={{x: 0.0, y: 0}} end={{x: 0.9, y: 0.7}}
                                                    locations={[0.1,0.4,1]} colors={['#7DC4E3', '#59A3DB', '#3481D3']}  style={[style.container3, { backgroundColor: "#4994D8" }]}>
                                            <IconRippe vector={true} name="musicOnline" size={80} text={{content:"NHẠC ONLINE",layout : 1,
                                                                                                fontFamily: "Arial",fontSize : 20}} />
                                        </LinearGradient>
                                    </Row>
                                </Grid>
                            </View>
                        </Row>

                        <Row style={{ height: 120, justifyContent:"center",alignItems:"center"}}>
                            <Footer />
                        </Row>
                    </Grid>
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
