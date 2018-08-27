import React from "react";
import { StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import PropTypes from 'prop-types';
import ListItem from '../Components/ListItem.js';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import {
    View,
    Text,
} from "native-base";
import IconRippe from '../Components/IconRippe.js'
import GLOBALS from '../DataManagers/Globals.js';
import { EventRegister } from 'react-native-event-listeners';
import Databases from '../DataManagers/DatabaseManager.js';
import DataInfo from '../DataManagers/DataInfo.js';
import IndicatorView from './IndicatorView.js';
import BoxControl from '../DataManagers/BoxControl.js';
import LayoutUtils from '../Utils/LayoutUtils.js';
import ImageRender from '../Views/ImageRenderer.js'


let { height, width } = Dimensions.get('window');
export default class SingerListView extends React.Component {
    static propTypes = {
        lan: PropTypes.string,
    };
    static defaultProps = {
        lan : 'vn',
    };
    //page = 0;
    state = {
        datas: [],
        dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    };

    _page = 0;
    _sex = GLOBALS.SINGER_SEX.ALL;
    _loading = false;
    _loaded = false;
    _hasData = true;
    _pageCount = 30;
    _searchTerm = "";
    _hasChanged = false;

    constructor(props) {
        super(props);
        this._layoutProvider = new LayoutProvider(
            index => {
                return "FULL";
            },
            (type, dim) => {
                switch (type) {
                    case "FULL":
                        dim.width = (width-15 -1) /3;
                        dim.height = dim.width*4/3;
                        break;
                    default:
                        dim.width = width;
                        dim.height = 60;
                }
            }
        );
    }
    
    componentWillMount() {
    }
    
    componentWillUnmount() {
    }


    searchData = (term)=>{
        if(this._loading)
            return;
            
        this._searchTerm = term;
        this._loaded = false;
        this._page = 0;
        this._loadData(this.props.lan, this._page, this._pageCount,term);
    }

    refreshData = (term) =>{
        //console.warn("type = "+this.props.type);
        if (!this._loading) {
            this._searchTerm = term;
            this._loaded = false;
            this._page = 0;
            this._indicator.show();
            this._loadData(this.props.lan, this._page, this._pageCount,term);
        }
    }

    loadData = (term,sex) => {
        if(this._loading)
            return;
        if (this._loaded && this._searchTerm == term
            && sex == this._sex) {
            return;
        }
       // console.warn("loadData "+term);
        this._searchTerm = term;
        this._sex = sex;
        this._loaded = false;
        this._page = 0;
        this._indicator.show();
        this._loadData(this.props.lan, this._page, this._pageCount,term,sex);
    }

    _loadData = (lan, page, pageCount, term,sex) => {
        if (this._loading)
            return;
      //  console.warn("_loadData term = "+term);
        this._loading = true;
        var that = this;
        Databases.fetchSingerData(lan,page, pageCount, term,sex,function (datas) {
            that._page = page;
            that._handleFetchDataCompleted(datas);
        });
    }

    _handleFetchDataCompleted = (datas) =>{
        this._loading = false;
        var startId = 0;
        var newDatas = [];
        newDatas = this.state.datas.concat(datas);
       // console.warn(" newDatas = "+newDatas.length+", index 0 : "+newDatas[0].name);
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(newDatas),
            datas: newDatas
        });

        if(datas.length <this._pageCount){
            this._hasData = false;
        }
        else{
            this._hasData = true;
        }

        this._indicator.hide();
        this._loaded = true;
    }

    _onEndReached = () => {
        if (this._hasData && !this._loading && this._loaded) {
            this._loadData(this.props.lan, this._page + 1,this._pageCount,this._searchTerm,this._sex);
            this.setState({});
        }
    }

    _renderFooter = () => {
        return (this._loading && this._loaded) ?
            <View style={{ height: 60, width: '100%', justifyContent: "center", alignContent: "center" }}>
                <IndicatorView isShow ={true} />
            </View> :
            <View style={{ height: 1, width: '100%' }} />;
    }

    rowRenderer = (type, item) => {
        const id = item.id;
        const source = item.source;
        return (
            
            <ImageRender
                id = {id} source = {source}
                //style={styles.listItem}
                //onPress={this._onPressSong.bind(this, item.id, item.status)}
                />
        );
      };

    render = () => {
        //console.warn("singer render = "+this._sex + ", length = "+this.state.datas.length);
        return (
            <View style={{ flex: 1,marginLeft:10, marginRight:5,marginTop:5,marginBottom:5, borderRadius:5}}>
                <RecyclerListView
                    style={{ flex: 1 , borderRadius:5}}
                    //contentContainerStyle={{ margin: 3 }}
                    onEndReached={this._onEndReached}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                    rowRenderer={this.rowRenderer}
                    renderFooter={this._renderFooter} 
                    //extendedState={this.state.dataProvider} 
                    />
                <IndicatorView ref={ref => (this._indicator = ref)}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        margin: 20,
    },
    listItem: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.5,
        borderColor: '#00ECBC',
    },

    listText: {
        color: "#fff",
        fontFamily:'SF-Pro-Text-Regular'
    },

    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
