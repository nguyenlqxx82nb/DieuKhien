import React from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
import PropTypes from 'prop-types';
import {
    View,
    // Tab, Tabs, ScrollableTab
} from "native-base";
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import CustomScrollableTabBar from '../Components/CustomScrollableTabBar.js'
import GLOBALS from '../DataManagers/Globals.js';
import { EventRegister  } from 'react-native-event-listeners';
import SingerListView from './SingerListView.js';


export default class SingerTabsView extends React.Component {
    static propTypes = {
        lanTabs: PropTypes.array.isRequired,
        onChangeTab : PropTypes.func,
    };
    // static defaultProps = {
    //     //number: PropTypes.number.isRequired,
    //     //color: PropTypes.string.isRequired,
    //     onOptionOverlayOpen: null,
    //     onBack: null,
    //     //duration : 200
    // };

    _tabs = [];
    _currPage = 0;
    _searchTerm = "";
    _sex = GLOBALS.SINGER_SEX.ALL;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        
    }
    
    componentWillUnmount() {
        
    }

    _onOptionBaiHatClick = (id, overlayType) => {
        // const { onOptionOverlayOpen } = this.props;
        // if (onOptionOverlayOpen != null) {
        //     onOptionOverlayOpen(id,overlayType);
        // }
    }

    _onChangeTab = (page) => {
        this._currPage = page.i;
        if(this.props.onChangeTab != null){
            this.props.onChangeTab(page.i);
        }
    }

    loadData = (term,sex) =>{
        this._searchTerm = term;
        this._sex = sex;
        this._tabs[this._currPage].loadData(term,sex);
    }

    searchData = (term,sex) =>{
        this._searchTerm = term;
        this._tabs[this._currPage].searchData(term,sex);
    }

    render() {
        return (
            <ScrollableTabView
                        style={{ marginTop: 0, }}
                        initialPage={0}
                        onChangeTab = {this._onChangeTab}
                        renderTabBar={() => 
                        <CustomScrollableTabBar
                            underlineStyle={{ height: 0 }}
                            activeTextColor={"#0ECAB1"}
                            inactiveTextColor={"#fff"}
                            textStyle={{ fontSize: 13, color: "#fff", fontFamily:"SF-Pro-Text-Bold" }}
                            style={{ borderWidth: 0 }}
                        />}
                    >
                    {this.props.lanTabs.map((lan, index) => {
                       // console.warn("lanTabs lan = "+lan +" , page = "+index);
                       return (
                            <View key={index} style={[styles.tabContent]} tabLabel={GLOBALS.LANGUAGE_NAME[lan]}>
                                <SingerListView lan={lan} ref={ref => (this._tabs[index] = ref)} />
                            </View>) ;
                    })}
                    </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        marginTop: 40,
        borderTopWidth: 0.5,
        borderColor: '#00ECBC',
    },
})
