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
import BTElib from 'react-native-bte-lib';

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
                        dim.height = dim.width*3.5/3;
                        break;
                    default:
                        dim.width = width;
                        dim.height = 60;
                }
            }
        );

        this.getAvatarUrl = this.getAvatarUrl.bind(this);
        this._loadData = this._loadData.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }
    
    componentWillMount() {
    }
    
    componentWillUnmount() {
    }


    searchData = (term,sex)=>{
        if(this._loading)
            return;
        //console.warn("searchData term = "+term+", sex = "+sex);
        if(sex != this._sex || term != this._searchTerm){
            this._searchTerm = term;
            this._sex = sex;
            this._loaded = false;
            this._page = 0;
            this._loadData(this.props.lan, this._page, this._pageCount,term,sex);
        }
    }

    refreshData = (term) =>{
        //console.warn("type = "+this.props.type);
        if (!this._loading) {
            this._searchTerm = term;
            this._loaded = false;
            this._page = 0;
            this._indicator.show();
            this._loadData(this.props.lan, this._page, this._pageCount,term,sex);
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

    async _loadData(lan, page, pageCount, term,sex){
        if (this._loading)
            return;

        this._loading = true;
        var that = this;
        await Databases.fetchSingerData(lan,page,pageCount,term,sex,
            function (datas) {
                that._page = page;
                that._handleFetchDataCompleted(datas);
            },
            function(error){
                that._indicator.hide();
                that._loading = false;
            });
       // this._page = page;
        //that._convertData(singers);
    }

    _convertData = (datas)=>{
        var newDatas = [];
        for(var i=0; i<datas.length; i++){
            const {Singer_ID,Singer_Name} = datas[i];
            var item ={
                id : Singer_ID,
                name : Singer_Name,
                url : ""
            };
            var index = i;
            newDatas.push(item);
            BTElib.getUrlActorAvatar(Singer_Name,index,(url,_index)=>{
                newDatas[_index].url = url;
                item.url = url;
                if(_index == datas.length - 1){
                    this._handleFetchDataCompleted(newDatas);
                }
            });
        }

        //this._handleFetchDataCompleted(newDatas);
    }

    _handleFetchDataCompleted = (datas) =>{
        this._loading = false;
        var newDatas = [];
        if(this._loaded){
            newDatas = this.state.datas.concat(datas);
        }
        else{
            newDatas = datas;
        }
        
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

    rowRenderer(type, item){
        const {id,name,url} = item;
        return (
            <ImageRender
                id = {id} 
                imageUrl = {url}
                name = {name}
                onPress={this._onPressSinger.bind(this, id, name)}
                />
        );
      };

    _onPressSinger = (id,name) =>{
        EventRegister.emit("OpenSingerSong",{id:id,name:name});
    }

    async getAvatarUrl(singerName) {
        var singerUrl = await  BTElib.getUrlActorAvatar(singerName);   
        //console.warn("source url= "+source['url']);
        return singerUrl;
    }

    render = () => {
        return (
            <View style={{ flex: 1,marginLeft:10, marginRight:0,marginBottom:5, borderRadius:5}}>
                <RecyclerListView
                    style={{ flex: 1 , borderRadius:5}}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this._onEndReached}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                    rowRenderer={this.rowRenderer}
                    renderFooter={this._renderFooter} 
                    onScroll = {(rawEvent, offsetX, offsetY)=>{
                        //console.warn("onScroll "+offsetY);
                    }}
                    //extendedState={this.state.dataProvider} 
                    />
                <IndicatorView ref={ref => (this._indicator = ref)}/>
            </View>

        );
    }
}

