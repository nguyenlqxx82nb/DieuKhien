import React from "react";
import {AppRegistry, Image, StatusBar,Text,StyleSheet,View} from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import ListItem from '../Components/ListItem';
import CustomIcon from '../Components/CustomIcon';
import { EventRegister } from 'react-native-event-listeners'

import {
    Container,
   // ListItem,
    List
} from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from "../DataManagers/Globals";

const datas = [
    {
        title:"Chưa tải",
        icon:"singOpt",
        event:"OpenSecondScreen",
        color:"#00ECBB",
        screenType: GLOBALS.SECOND_SCREEN.SONG.UNDOWNLOAD
    },
    {
        title:"Đang tải",
        icon:"tuychon",
        event:"OpenSecondScreen",
        color:"#00ECBB",
        screenType: GLOBALS.SECOND_SCREEN.SONG.DOWNLOADING
    },
    {
        title:"Đã hát",
        icon:"mic2",
        event:"OpenSecondScreen",
        color:"#00ECBB",
        screenType: GLOBALS.SECOND_SCREEN.SONG.SING
    },
    {
        title:"Bài USB",
        icon:"uutien",
        event:"OpenSecondScreen",
        color:"#00ECBB",
        screenType: GLOBALS.SECOND_SCREEN.SONG.USB
    },
    {
        title:"Ngôn ngữ",
        icon:"ngonngu",
        event:"OpenSecondScreen",
        color:"#00ECBB",
        screenType: GLOBALS.SECOND_SCREEN.NGONNGU
    },
    {
        title:"Cài đặt",
        icon:"setting",
        event:"OpenSecondScreen",
        color:"#00ECBC",
        screenType: GLOBALS.SECOND_SCREEN.SECURE
    },
    {
        title:"Khởi động lại",
        icon:"restart",
        event:"Restart",
        color:"#0093FF",
        screenType: GLOBALS.SECOND_SCREEN.NONE
    },
    {
        title:"Tắt máy",
        icon:"shutdown",
        event:"Shutdown",
        color:"#FF2626",
        screenType: GLOBALS.SECOND_SCREEN.NONE
    },
];
export default class SideBar extends React.Component
{
    constructor(props) {
        super(props);
    }
    renderRow =(item)=>{
        const {title,icon,color,event,screenType} =item;
        return(
            <ListItem 
                onPress ={()=>{
                    this.props.navigation.closeDrawer(); 
                    setTimeout(()=>{
                        EventRegister.emit(event,{type:screenType});
                    },10); 
                }}
                style={{height:60,width:"100%"}}>
                <View style={{flex:1, marginLeft:25,marginRight:10,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <CustomIcon name={icon} size ={30} style={{color:color}} />
                    <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                        <Text style={{fontSize:16,fontFamily:"SF-Pro-Text-Medium",color:"#fff",marginLeft:10}}>{title}</Text>
                    </View>
                    <CustomIcon name={"goPage"} size ={20} style={{color:"#fff"}} />
                </View>
            </ListItem>
        );
    }

    render(){
        return(
            <Container>
                <View style={styles.headerContainer}>
                </View>
                <LinearGradient 
                    start={{x: 0.1, y: 0.1}} end={{x: 1, y: 1}} 
                    colors={['#434B8F', '#435A9D', '#436BA8', '#4780B1', '#55BFC8']} 
                    style={[styles.listContainer]}>
                    <List
                        dataArray = {datas}
                        contentContainerStyle = {{ marginTop: 10 }}
                        renderRow={this.renderRow}
                    /> 
                </LinearGradient>   
            </Container>
        );
    }
} 

const styles = StyleSheet.create({
    headerContainer : {
        width:"100%",
        height:60,
        backgroundColor:"#444083"
    },

    listContainer :{
        flex:1,
    }
})
