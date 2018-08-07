import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import {
    Left,
    Right,
    View
} from "native-base";

import IconRippe from '../../Components/IconRippe.js'

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
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
        );
    }
}

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex:1, 
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        height: 50,
        overflow:"hidden"
    }
   
})
