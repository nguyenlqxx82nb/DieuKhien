import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
} from "native-base";
import IconRippe from '../Components/IconRippe.js'
import { Grid, Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import { EventRegister  } from 'react-native-event-listeners';
import GLOBALS from '../DataManagers/Globals'

export default class MusicOnlineButton extends React.Component {
    static propTypes = {
        style : Text.propTypes.style,
        onOpenOnline : PropTypes.func
    };
    constructor(props) {
        super(props);

        this._term = "";
    }
    setTerm = (term)=>{
        this._term = term;
    }  
    _onOpenOnline = (type) =>{
        (this.props.onOpenOnline != null)
            this.props.onOpenOnline();
        EventRegister.emit("ShowOnlineScreen",{type:type, term:this._term})
    } 
    render = () => {
        return (
                <View style={[styles.onlineContainer,this.props.style]}>
                    <Grid>
                        <Col size={1} >
                            <LinearGradient colors={['#FF2626', '#FF2626', '#FF2626']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="youtube3" size={60} 
                                    onPress = {this._onOpenOnline.bind(this,GLOBALS.SONG_ONLINE.YOUTUBE)}
                                />
                            </LinearGradient>
                        </Col>
                        <Col size={1}>
                            <LinearGradient colors={['#F78B10', '#F78B10', '#F8570E']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="soundcloud" size={120} 
                                     onPress = {this._onOpenOnline.bind(this,GLOBALS.SONG_ONLINE.SOUNDCLOUD)}
                                />
                            </LinearGradient>
                        </Col>
                        <Col size={1}>
                            <LinearGradient colors={['#3481D3', '#3481D3', '#3481D3']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="mixcloud" size={110} 
                                     onPress = {this._onOpenOnline.bind(this,GLOBALS.SONG_ONLINE.MIXCLOUD)}
                                />
                            </LinearGradient>
                        </Col>
                    </Grid>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    
    onlineButton: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 5,
        marginLeft: 3,
        marginRight: 3
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 2,
    },

    onlineContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 85,
        zIndex: 2,
        paddingLeft: 5,
        paddingRight: 5
    },

})
