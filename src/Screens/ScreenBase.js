import React from "react";
import { StyleSheet, Dimensions, Animated, Platform } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
    Left,
    Text
} from "native-base";

const screen = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
}

class BaseScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state1 = {
            opacityValue: new Animated.Value(this.props.opacity)
        };
    }
    show = () => {
        let container = this._container;
        const {maxZindex} = this.props;
        var that = this;
        //console.warn("maxZindex = "+maxZindex);
        //if(maxZindex == '')
        Animated.timing(this.state1.opacityValue, {
            toValue: 1,
            useNativeDriver: Platform.OS === 'android',
            duration: 150,
        }).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: maxZindex
                }
            });

            that.showCompleted();
        });
    }

    showCompleted = () =>{

    }

    hide = () => {
        let container = this._container;
        Animated.timing(this.state1.opacityValue, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
            duration: 100,
        }).start(function onComplete() {
            container.setNativeProps({
                style: {
                    zIndex: 0
                }
            });
        });
    }

    renderContentView = () => {
        return (<View></View>);
    }

    renderView = () => {
        const {opacityValue} = this.state1;
        const {opacity} = this.props;
        //const {zIndex} = this.props;
        return (
            <Animated.View
                ref={ref => (this._container = ref)}
                style={{ opacity: opacityValue, position: "absolute", top: 0,
                        width: screen.width, height: screen.height, zIndex: 0 }}>
                {this.renderContentView()}
            </Animated.View>
        )
    }

    render() {
        const { opacityValue } = this.state1;
        //const {opacity} = this.props;
        //console.warn("render home "+this.state.opacityValue +" opacity = "+opacity);
        return (this.renderView());
    }
}

BaseScreen.propTypes = {
    duration: PropTypes.number,
    opacity: PropTypes.number,
    maxZindex: PropTypes.number,
};

BaseScreen.defaultProps = {
    duration: 200,
    opacity: 0,
    maxZindex: 1,
};

const style = StyleSheet.create({

})

export default BaseScreen;
