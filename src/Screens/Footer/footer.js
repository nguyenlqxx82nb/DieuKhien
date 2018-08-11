import React from "react";
import { Image, StyleSheet, Dimensions, Animated } from "react-native";
import {
    Right,
    View
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";
import TextTicker from 'react-native-text-ticker'
import IconRippe from '../../Components/IconRippe.js'
import PropTypes from 'prop-types';
import BaseScreen from '../ScreenBase.js';

const arrowLeftSrc = require("../../../assets/arrowLeft.png");
const arrowRightSrc = require("../../../assets/arrowRight.png");
const marqBgSrc = require("../../../assets/marqBg.png");

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class FooterHome extends BaseScreen {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onTest: PropTypes.func,
        //duration : PropTypes.number
    };

    constructor(props) {
        super(props);
        //this.onPlayPress = this.onPlayPress.bind(this);
    }

    onPlayPress =() => {
        const {onTest} = this.props;
        if(onTest != null){
            onTest();
        }
    }

    render() {
        const {opacityValue} = this.state1;
        return (
            <Animated.View
                ref={ref => (this._container = ref)} 
                style={[styles.footerContainer,{opacity:opacityValue}]}>
                <Grid>
                    <Row style={{height:40}}>
                        <Grid>
                            <Col style={{ width: 60, alignItems: "flex-start" }}>
                                <View style={{ flex: 1, width: 40, marginLeft: 10 }}>
                                    <IconRippe vector={true} size={25} name="volumnOn" />
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
                                    <IconRippe vector={true} size={25} name="list" />
                                </View>
                            </Col>
                        </Grid>
                    </Row>
                    <Row style={{height:75}}>
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
                                <IconRippe vector={true} size={50} name="play" onPress={this.onPlayPress} />
                            </Col>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe vector={true} size={25} name="next" />
                                </View>
                            </Col>
                            <Col size={1} style={[styles.container_center]}>
                                <View style={styles.container2}>
                                    <IconRippe vector={true} size={30} name="micOn" />
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
    container_center :{
        justifyContent:"center",
        alignItems:"center"
    },
    footerContainer: {
        position:"absolute",
        width: screen.width,
        bottom:0,
        backgroundColor: "#444083", 
        height: 115, 
        paddingTop: 5, 
        paddingBottom: 5,
        zIndex:2,
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
