import React from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
import BaseScreen from "../ScreenBase.js"
import PropTypes from 'prop-types';
import {
    View,
    Icon,
    // Tab, Tabs, ScrollableTab
} from "native-base";
import IconRippe from '../../Components/IconRippe.js'
import { Grid, Col } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from '../../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SongTabsView from '../../Views/SongTabsView.js';
import SearchInput from '../../Views/SearchInput.js';


export default class SingScreen extends BaseScreen {
    static propTypes = {
        onOptionOverlayOpen: PropTypes.func,
        onBack: PropTypes.func,
    };
    constructor(props) {
        super(props);
    }
    _onBack = () => {
        const { onBack } = this.props;
        this._searchInput.blur();
        if (onBack) {
            onBack();
        }
    }
    _showCompleted = () =>{
        this._songTabs.loadData(this._searchInput.getValue());
    }

    focusSearchInput = () =>{
        this._searchInput.focus();
    }

    _onChangeTab = (page) =>{
        if(this._isVisible){
            //console.warn("_onChangeTab");
            this._songTabs.loadData(this._searchInput.getValue());
        }
    }
    _onSearch =(value)=> {
        this._songTabs.searchData(value);
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
                    <SearchInput ref={ref=>(this._searchInput = ref)} onSearch={this._onSearch} />
                </View>

                <View style={{ flex: 1}}>
                    <SongTabsView lanTabs={['vn','en','cn','ja','kr']} ref={ref => (this._songTabs = ref)} 
                        onChangeTab = {this._onChangeTab} />
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
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
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

})
