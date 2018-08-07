import React from "react";
import { StatusBar, Image, StyleSheet, Dimensions } from "react-native";

import {
    Container,
    View,
    Left
} from "native-base";

import { Col, Grid, Row } from "react-native-easy-grid";
import IconRippe from '../../Components/IconRippe.js'

import LinearGradient from 'react-native-linear-gradient';
import Footer from '../Footer/footer.js';
import Header from '../Header/index.js';

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class SingScreen extends React.Component {
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
                            <View style={style.headerContainer}>
                                <Left>
                                    <View style={{ width: 50, height: 50, marginLeft:0}}>
                                        <IconRippe vector={true} name="back" size={25} color="#fff"
                                            onPress={()=>this.props.navigation.goBack()}
                                        /> 
                                    </View>
                                </Left>
                                
                                {/* <Right>
                                    <View style={{ width: 50, height: 50, marginLeft:0}}>
                                        <IconRippe vector={true} name="menu" size={25} color="#fff"/> 
                                    </View>
                                </Right> */}
                            </View>
                        </Row>

                        <Row style={style.contentContainer}>
                            <View style={{flex:1}}>
                                
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
    container: {
        justifyContent: "center", alignItems: "center"
    },
    contentContainer: {
        justifyContent:"center",alignItems:"center", marginRight:25, marginLeft:25,marginTop:10,marginBottom:10
    },
    headerContainer: {
        justifyContent: "center",
        flex:1, 
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        height: 50,
        overflow:"hidden"
    }
})
