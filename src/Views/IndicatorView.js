import React from "react";
import { StyleSheet,ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';

import {
    View,
    Text,
    // Tab, Tabs, ScrollableTab
} from "native-base";

export default class IndicatorView extends React.Component {
    static propTypes = {
       // lan: PropTypes.string.isRequired,
        //onOptionOverlayOpen: PropTypes.func,
        //onBack: PropTypes.func,
        //duration : PropTypes.number
    };

    static defaultProps = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        //onOptionOverlayOpen: null,
        //onBack: null,
        //duration : 200
    };
    //page = 0;
    state = {
        isShowing : true,
        //opacityValue: new Animated.Value(0)
    };

    _loaded = false;

    constructor(props) {
        super(props);
    }
    
    show = () =>{
        this.state.isShowing = true;
        this.setState({isShowing : true});
    }

    hide = ()=>{
        if(this.state.isShowing){
            this.state.isShowing = false;
            this.setState({isShowing : false});
        }
    }

    render = () => {
        const {isShowing} = this.state;
        return (
            <ActivityIndicator 
            animating={isShowing}
            style={styles.indicator}
            color="#00ECBC"
            size="large" />
        );
    }
}

const styles = StyleSheet.create({
    indicator :{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
