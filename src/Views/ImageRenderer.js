import React from 'react';
import { Image, Platform, View, Animated,Easing } from 'react-native';
import PropTypes from 'prop-types';
import GLOBALS from '../DataManagers/Globals.js';
import ListItem from '../Components/ListItem.js'
import Button from '../Components/Button';

const isIOS = Platform.OS === 'ios';

export default class ImageRenderer extends React.Component {
  static propTypes = {
    source: PropTypes.number,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    maxOpacity: PropTypes.number,
    onPress: PropTypes.func
  }

  static defaultProps = {
    maxOpacity: 0.25
  }

  shouldComponentUpdate(newProps) {
    return this.props.id !== newProps.id;
  }
  constructor(props, context) {
    super(props, context);

    const { maxOpacity } = this.props;
    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity)
    };
  }
  componentWillUpdate() {
    //On iOS while recycling till the new image is loaded the old one remains visible. This forcefully hides the old image.
    //It is then made visible onLoad
    if (isIOS && this.imageRef) {
      this.imageRef.setNativeProps({
        opacity: 0,
      });
    }
  }
  handleOnLoad = () => {
    if (isIOS && this.imageRef) {
      this.imageRef.setNativeProps({
        opacity: 1,
      });
    }
  }
  onPressedIn = () => {
    const { maxOpacity, onPress } = this.props;
    
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      Animated.timing(this.state.opacityValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: Platform.OS === 'android',
      }).start(() => {
        this.state.scaleValue.setValue(0.01);
        this.state.opacityValue.setValue(maxOpacity);
      });
    });

    if(onPress != null){
      onPress();
    }
  }
  
  find_dimesions = (layout) =>{
    const {x, y, width, height} = layout;
    this._rippleView.setNativeProps({style:{
        width: height,
        height: height,
        left: (width - height)/2,
        borderRadius: height/2}});
  }

  renderRippleView() {
    const { scaleValue, opacityValue } = this.state;

    return (
      <Animated.View
        ref={component => this._rippleView = component}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          borderRadius: 50,
          zIndex :2,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
          backgroundColor: 'white',
        }}
      />
    );
  }
  render() {
    //console.warn(" url = "+GLOBALS.SINGER_SEX[1]);
    return (
      <Button onPress = {this.onPressedIn}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgrey',
            borderRadius: 5,
            marginRight: 5,
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            elevation: 2,
          }}>
          <View style={{ flex: 1 }}
            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }} >
            {/* <TouchableWithoutFeedback onPress = {this.onPressedIn} onPressOut={this.onPressedOut} > */}
              {this.renderRippleView()}
              <Image
                ref={ref => {
                  this.imageRef = ref;
                }}
                //resizeMode={'contain'}
                style={{
                  flex: 1,
                  borderRadius: 5,
                }}
                onLoad={this.handleOnLoad}
                //source={{ uri: GLOBALS.SINGER_TEST[this.props.source] }} 
                source={{ uri:this.props.imageUrl}} 
                />
              {/* </TouchableWithoutFeedback> */}
            </View>
                  
        </View>
      </Button>
    );
  }
}
