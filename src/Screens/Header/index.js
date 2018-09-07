import React from "react";
import { Image, StyleSheet, Dimensions,Animated,Easing,Platform,TextInput } from "react-native";
import {
     View,
     Icon
} from "native-base";
import IconRippe from '../../Components/IconRippe.js'
import GLOBALS from "../../DataManagers/Globals.js";
import PropTypes from 'prop-types';

const screen = {
    width : Dimensions.get("window").width,
    height : Dimensions.get("window").height
}

export default class Header extends React.Component {
    static propTypes = {
        onBack: PropTypes.func,
        onSearchInputShow: PropTypes.func,
        onHideInput : PropTypes.func
        //onSearch: PropTypes.func,
       // onSearchChange : PropTypes.func,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.isSearchVisible = false;
        this.state = {
            opacity1 : new Animated.Value(1),
            opacity2 : new Animated.Value(0),
        }
    }
    // getSearchValue = () =>{
    //     return this._searchInput.getValue();
    // }
    // _onSearch = (value) =>{
    //     if(this.props.onSearch != null)
    //         this.props.onSearch(value);
    // }
    // _onSearchChange = (value) =>{
    //     if(this.props.onSearchChange != null)
    //         this.props.onSearchChange(value);
    // }
    showSearchInput = ()=>{
        if(this.isSearchVisible){
            this._showSearchComplete();
            return;
        } 

        Animated.timing(this.state.opacity1, {
            toValue: 0,
            duration: 250,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start(()=>{
        });    

        Animated.timing(this.state.opacity2, {
            toValue: 1,
            duration: 350,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start(()=>{
            this._inputSearchView.setNativeProps({
                style:{
                    zIndex:1
                }
            })
            this._searchIconView.setNativeProps({
                style:{
                    zIndex:0
                }
            })
            this._centerView.setNativeProps({
                style:{
                    zIndex:0
                }
            })
            this.isSearchVisible = true;
            this._showSearchComplete();
        }); 
    }
    searchShow = () =>{
        return this.isSearchVisible;
    }
    _showSearchComplete = () =>{
        if(this.props.onSearchInputShow != null){
            this.props.onSearchInputShow();
        }
    }
    hideSearchInput = () =>{
        Animated.timing(this.state.opacity1, {
            toValue: 1,
            duration: 350,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start(()=>{
            this._inputSearchView.setNativeProps({
                style:{
                    zIndex:0
                }
            })
            
            this._searchIconView.setNativeProps({
                style:{
                    zIndex:1
                }
            })
            this._centerView.setNativeProps({
                style:{
                    zIndex:1
                }
            })
            this.isSearchVisible = false;
            if(this.props.onHideInput != null){
                this.props.onHideInput();
            }
        });    

        Animated.timing(this.state.opacity2, {
            toValue: 0,
            duration: 250,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start(()=>{
            
        }); 
    }
    render() {
        const {opacity1,opacity2}= this.state;
        var searchWidth = screen.width-40;
        return (
            <View style={styles.container}>
                <View style={{ width: 40, height: 40, marginLeft: 0 }}>
                    <IconRippe vector={true} name="back" size={20} color="#fff"
                        onPress={()=>{
                            if(this.props.onBack != null){
                                //this._searchInput.blur();
                                this.props.onBack();
                            }
                        }}
                    />
                </View>
                <Animated.View
                    ref = {ref =>(this._centerView = ref)}
                    style={{flex:1,justifyContent:"center",alignItems:"flex-start",
                             opacity: opacity1
                        }}>
                    {this.props.center}
                </Animated.View>

                <Animated.View
                    ref = {ref => (this._searchIconView = ref)}
                    style={{
                        zIndex:1,
                        width: 40, height: 40, marginRight: 5,
                        opacity: opacity1}}
                    >
                    <IconRippe
                        vector={true} name="search" size={20} color="#fff"
                        onPress={()=>{
                            this.showSearchInput();
                        }}
                    />
                </Animated.View>  

                <Animated.View 
                    ref = {ref => (this._inputSearchView = ref)}
                    style={{
                        zIndex:0,
                        position: 'absolute',
                        //backgroundColor:"red",
                        right : 0,
                        //top:0,
                        height:40,
                        width: searchWidth,
                        opacity : opacity2
                    }}>
                    <View style={{flex:1,flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                        {this.props.searchInput}
                        <View style={{ width: 40, height: 40 }}>
                            <IconRippe vector={true} name="closeMenu" size={15} color="#fff"
                                onPress={()=>{
                                    this.hideSearchInput();
                                }}
                            />
                        </View>
                    </View>
                    
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
        flex:1,
        width:'100%',
        
    },

   
})
