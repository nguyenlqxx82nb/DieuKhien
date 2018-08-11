import React from "react";
import { StyleSheet, ScrollView, TouchableWithoutFeedback,TouchableHighlight, TextInput } from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import { FlatList } from "react-native";
import {
    View,
    
    // Left,
    // Text,
    Icon,
    ListItem,
    Text,
    Left,
    Right,
    Body
    // Tab, Tabs, ScrollableTab
} from "native-base";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import CustomScrollableTabBar from '../../Components/CustomScrollableTabBar.js'
import IconRippe from '../../Components/IconRippe.js'
import { Grid, Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';

const datas = [
    {
        name:"Đến Với Nhau Là Sai",
        singer:"No Phước Thịnh",
        status: 1
    },
    {
        name:"Giac Mơ E Chờ",
        singer:"Chi Dân",
        status: 1
    },
    {
        name:"Đến Với Nhau Là Sai",
        singer:"Quang Vinh, Híu",
        status: 2
    },
    {
        name:"Em Mới Là Người Anh Yêu",
        singer:"Min",
        status: 2
    },
    {
        name:"Chạy Ngay Đi",
        singer:"Sơn Tùng - MTP",
        status: 2
    },
    {
        name:"Sống Như Ta (Forever 20)",
        singer:"Sơn Tùng - MTP",
        status: 3
    },
    {
        name:"Ưu Tư",
        singer:"Phạm Duy Anh, Bảo Uyên, 1DEE",
        status: 4
    },
    {
        name:"Người cuối",
        singer:"Chí Thiện, Búp, Ira Hoàng Thy",
        status: 4
    },

    {
        name:"Đến Với Nhau Là Sai",
        singer:"No Phước Thịnh",
        status: 1
    },
    {
        name:"Giac Mơ E Chờ",
        singer:"Chi Dân",
        status: 1
    },
    {
        name:"Đến Với Nhau Là Sai",
        singer:"Quang Vinh, Híu",
        status: 2
    },
    {
        name:"Em Mới Là Người Anh Yêu",
        singer:"Min",
        status: 2
    },
    {
        name:"Chạy Ngay Đi",
        singer:"Sơn Tùng - MTP",
        status: 2
    },
    {
        name:"Sống Như Ta (Forever 20)",
        singer:"Sơn Tùng - MTP",
        status: 3
    },
    {
        name:"Ưu Tư",
        singer:"Phạm Duy Anh, Bảo Uyên, 1DEE",
        status: 4
    },
    {
        name:"Người cuối",
        singer:"Chí Thiện, Búp, Ira Hoàng Thy",
        status: 4
    },
];

export default class SingScreen extends BaseScreen {
    static propTypes = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onOptionOverlayOpen: PropTypes.func,
        onBack :  PropTypes.func,
        //duration : PropTypes.number
    };
    static defaultProps = {
        //number: PropTypes.number.isRequired,
        //color: PropTypes.string.isRequired,
        onOptionOverlayOpen: null,
        onBack : null,
        //duration : 200
    };

    state = {
        datas,
        selected: "Simon Mignolet",
        //opacityValue: new Animated.Value(0)
    };

    constructor(props) {
        super(props);

        this._onOptionBaiHatClick = this._onOptionBaiHatClick.bind(this);

    }

    _onBack = () => {
        const { onBack } = this.props;

        if (onBack) {
            onBack();
        }
    }

    _onOptionBaiHatClick() {
        const {onOptionOverlayOpen} = this.props;
        if(onOptionOverlayOpen != null){
            onOptionOverlayOpen();
        }
    }
    
    renderContentView = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center", justifyContent: "center", marginTop: 25, height: 40
                }}>

                    <View style={{ width: 40, height: 40, marginLeft: 0 }}>
                        <IconRippe vector={true} name="back" size={20} color="#fff"
                            onPress={this._onBack}
                        />
                    </View>
                    <View style={{
                        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
                        marginRight: 10, borderRadius: 10, backgroundColor: "#565BAC", height: 35, paddingRight: 3
                    }}>
                        <Icon size={15} name="search" style={{ color: "#9197CC", marginLeft: 10 }} />
                        <TextInput 
                            underlineColorAndroid = {'transparent'}
                            placeholderTextColor = {'#9192C6'}
                            style={{ flex: 1,height:50,fontSize:14,color:"white",padding:0,margin:0, marginLeft:10}}
                            placeholder="Tìm kiếm ..."
                        />
                        <View style={{width:30,height:30}}>
                            <IconRippe vector={true} size={15} name="close" color={"#9197CC" } />
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, marginBottom: 115 }}>
                    <ScrollableTabView
                        style={{ marginTop: 0, }}
                        initialPage={0}
                        renderTabBar={() => <CustomScrollableTabBar
                            underlineStyle={{ height: 0 }}
                            activeTextColor={"#0ECAB1"}
                            inactiveTextColor={"#fff"}
                            textStyle={{ fontSize: 14, color: "#fff" }}
                            style={{ borderWidth: 0 }}
                        />}
                    >
                        <View style={[styles.tabContent]} tabLabel='VIỆT NAM'>
                            <FlatList
                                data={this.state.datas}
                                extraData={this.state}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableHighlight
                                            selected={this.state.selected === item}
                                            onPress={() => this.setState({ selected: item })}
                                            style={styles.listItem}
                                        >
                                            <View style={{ flex: 1,flexDirection:"row", justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ flex: 1,marginLeft:15 }}>
                                                    <Text style={[styles.listText,{fontSize:17}]}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={[styles.listText,{fontSize:12,color:"#B6BACC"}]}>
                                                        {item.singer}
                                                    </Text>
                                                </View>
                                                <View style={{ width: 40, height: 40,marginRight:10 }}>
                                                    <IconRippe vector={true} name="tuychon" size={20} onPress={this._onOptionBaiHatClick} />
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    );
                                }}
                            />
                        </View>
                        <View style={[styles.tabContent, { backgroundColor: "blue" }]} tabLabel='ENGLISH'>
                        </View>
                        <View style={[styles.tabContent]} tabLabel='CHINESE'>
                        </View>
                        <View style={[styles.tabContent, { backgroundColor: "#e5678f" }]} tabLabel='JAPANESE'>
                        </View>
                        <View style={[styles.tabContent, { backgroundColor: "violet" }]} tabLabel='KOREAN'>
                        </View>
                    </ScrollableTabView>
                </View>

                <View style={styles.onlineContainer}>
                    <Grid>
                        <Col size={1} >
                            <LinearGradient colors={['#FF2626', '#FF2626', '#FF2626']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="youtube3" size={60} />
                            </LinearGradient>
                        </Col>
                        <Col size={1}>
                            <LinearGradient colors={['#F78B10', '#F78B10', '#F8570E']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="soundcloud" size={120} />
                            </LinearGradient>
                        </Col>
                        <Col size={1}>
                            <LinearGradient colors={['#3481D3', '#3481D3', '#3481D3']}
                                style={styles.onlineButton}>
                                <IconRippe vector={true} name="mixcloud" size={110} />
                            </LinearGradient>
                        </Col>
                    </Grid>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center", alignItems: "center"
    },
    contentContainer: {
        justifyContent: "center", alignItems: "center", marginRight: 25,
        marginLeft: 25, marginTop: 10, marginBottom: 10
    },
    headerContainer: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        height: 50,
        overflow: "hidden"
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
    },

    tabContent: {
        flex: 1,
        marginTop: 50,
        borderTopWidth:0.5,
        borderColor: '#00ECBC',
    },

    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    onlineButton: {
        flex: 1,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 2,
    },

    onlineContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 110,
        zIndex: 2,
        paddingLeft: 5,
        paddingRight: 5
    },

    listItem: {
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth:0.5,
        borderColor: '#00ECBC',
    },

    listText:{
        color:"#fff"
    },


})
