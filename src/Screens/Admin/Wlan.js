import React from "react";
import {Text,StyleSheet,TextInput, View} from "react-native";
import InputAdmin from "./InputAdmin";
import ButtonAdmin from "./ButtonAdmin";
import { EventRegister } from 'react-native-event-listeners'

export default class WlanScreen extends React.Component
{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this._listenerSubAdminBackEvent = EventRegister.addEventListener('SubAdminBack', (data) => {
            this.blur();
        });
    }
    componentWillUnmount(){
        EventRegister.removeEventListener(this._listenerSubAdminBackEvent);
    }
    componentDidMount(){
        //this._text1.setText("taisao");
    }
    onPressButton = ()=>{
        console.warn(" tai sao "+this._text1.getValue()+" , "+this._text2.getValue());
    }
    blur = ()=>{
        this._text2.blur();
        this._text1.blur();
    }
    render() {
        return(
            <View style={{flex:1,margin:15,justifyContent:"flex-start",alignItems:"center"}} >
                <InputAdmin 
                    //ref = {ref = (this._input = ref)}
                    ref = {ref => (this._text1 = ref)}
                    placeholder="Nhập mang Wlan"
                />

                <InputAdmin 
                    ref = {ref => (this._text2 = ref)}
                    placeholder="Nhập mật khẩu"
                />

                <ButtonAdmin onPress={this.onPressButton} />

            </View>
        );
    }
} 

const styles = StyleSheet.create({
})
