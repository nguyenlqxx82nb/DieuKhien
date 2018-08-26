import React from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
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
        //duration : PropTypes.number
    };
    static defaultProps = {
       
    };

    constructor(props) {
        super(props);

        this.state={
            value: "",
            showRemoveBtn : false
        }
    }

    getValue = ()=>{
        return this.state.value;
    }
    blur = ()=>{
        this._searchInput.blur();
    }
    focus = ()=>{
        this._searchInput.focus();
    }
    _handleTextFocus = () =>{
        EventRegister.emit("HideFooter",{});
    }
    _handleBlur = () =>{
        EventRegister.emit("ShowFooter",{});
    }
    _handleTextSubmit = () =>{
        EventRegister.emit("ShowFooter",{});
        if(this.props.onSearch != null){
            this.props.onSearch(this.state.value);
        }
    }
    _handleClearSearch = () =>{
        this.setState({value:"",showRemoveBtn:false});
        if(this.props.onSearch != null){
            this.props.onSearch("");
        }
    }
    _handleTextChanged = (value) =>{
        var showRemoveBtn = (value == "")?false:true;
        this.setState({value:value,showRemoveBtn:showRemoveBtn});
        if(this.props.onSearch != null){
            this.props.onSearch(value);
        }
    }
    render = () => {
        const {showRemoveBtn} =this.state;
        return (
            <View style={styles.container}>
                <Icon size={15} name="search" style={{ color: "#9197CC", marginLeft: 10 }} />
                <TextInput
                    ref = {ref => (this._searchInput = ref)}
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={'#9192C6'}
                    style={styles.input}
                    placeholder="Tìm kiếm ..."
                    onFocus = {this._handleTextFocus}
                    onBlur = {this._handleBlur}
                    onSubmitEditing = {this._handleTextSubmit}
                    onChangeText={this._handleTextChanged}
                    value={this.state.value}
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
        flex: 1, height: 50, fontSize: 16, color: "white", padding: 0, margin: 0, marginLeft: 10,
        fontFamily:'SF-Pro-Text-Medium'
    },
})
