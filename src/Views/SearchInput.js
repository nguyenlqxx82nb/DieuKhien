import React from "react";
import { StyleSheet, Alert, TextInput,Text } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
    Icon,
    // Tab, Tabs, ScrollableTab
} from "native-base";
import IconRippe from '../Components/IconRippe.js'
import { EventRegister  } from 'react-native-event-listeners';


export default class SearchInput extends React.Component {
    static propTypes = {
       // onClear: PropTypes.func,
        onSearch: PropTypes.func,
        style : Text.propTypes.style,
        onSearchChange : PropTypes.func,
        //duration : PropTypes.number
    };
    static defaultProps = {
        style : {}
    };

    constructor(props) {
        super(props);

        this.state={
            value: "",
            showRemoveBtn : false
        }
    }

    getValue = ()=>{
        if(this._searchInput._lastNativeText == undefined)
            return "";
        else
            return this._searchInput._lastNativeText;
    }
    blur = ()=>{
        this._searchInput.blur();
    }
    focus = ()=>{
        this._searchInput.focus();
    }
    focusSearch = (term)=>{
        this._searchInput.setNativeProps({ text: term });
        setTimeout(() => {
            this._searchInput.setNativeProps({ text: term });
        });
        this._searchInput._lastNativeText = term;
        this.setState({showRemoveBtn:true});
        this._searchInput.focus();
    }
    _handleTextFocus = () =>{
        EventRegister.emit("HideFooter",{});
        if(this.props.onSearch != null){
            this.props.onSearch(this.getValue());
        }
    }
    _handleBlur = () =>{
        EventRegister.emit("ShowFooter",{});
        if(this.props.onSearch != null){
            this.props.onSearch(this.getValue());
        }
    }
    _handleTextSubmit = () =>{
        EventRegister.emit("ShowFooter",{});
        if(this.props.onSearch != null){
            this.props.onSearch(this.getValue());
        }
    }
    _handleClearSearch = () =>{
        this.setState({showRemoveBtn:false});
        this.clear();
        if(this.props.onSearch != null){
            this.props.onSearch("");
        }
    }
    _handleTextChanged = (value) =>{
        var showRemoveBtn = (value == "")?false:true;
        if(this.state.showRemoveBtn != showRemoveBtn){
            this.setState({showRemoveBtn:showRemoveBtn});
        }

        if(this.props.onSearchChange != null){
            this.props.onSearchChange(this.getValue());
        }
    }
    clear = ()=>{
        this._searchInput.setNativeProps({ text: '' });
        setTimeout(() => {
            this._searchInput.setNativeProps({ text: '' });
        });
        //this._searchInput.clear();
        this._searchInput._lastNativeText = '';
    }
    render = () => {
        const {showRemoveBtn} =this.state;
        const {style} = this.props;
        return (
            <View style={[styles.container,style]}>
                <Icon size={15} name="search" style={{ color: "#9197CC", marginLeft: 10 }} />
                <TextInput
                   // secureTextEntry = {true}
                    ref = {ref => (this._searchInput = ref)}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={'#9192C6'}
                    style={[styles.input]}
                    placeholder="Tìm kiếm ..."
                    onFocus = {this._handleTextFocus}
                    onBlur = {this._handleBlur}
                    onSubmitEditing = {this._handleTextSubmit}
                    onChangeText={this._handleTextChanged}
                    //value={this.state.value}
                />
                {showRemoveBtn && 
                (<View style={{ width: 30, height: 30 }}>
                    <IconRippe vector={true} size={15} name="close" color={"#fff"} 
                        onPress = {this._handleClearSearch} />
                </View>) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        marginRight: 10, borderRadius: 10, backgroundColor: "#565BAC", height: 35, paddingRight: 3
    },
    input: {
        flex: 1, height: 35, fontSize: 16, color: "white", padding: 0, margin: 0, marginLeft: 10,
        fontFamily:'SF-Pro-Text-Medium'
    },
})
