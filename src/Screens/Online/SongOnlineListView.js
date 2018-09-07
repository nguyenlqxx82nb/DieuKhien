import React from "react";
import { StyleSheet, ActivityIndicator, Dimensions,Animated,ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import {
    View,
    Text,
} from "native-base";
import GLOBALS from '../../DataManagers/Globals.js';
import Databases from '../../DataManagers/DatabaseManager.js';
import IndicatorView from '../../Views/IndicatorView';
import SongOnlineItem from './SongOnlineItem';

let { width } = Dimensions.get('window');
let height = width*18/32 + 90;
export default class SongOnlineListView extends React.Component {
    static propTypes = {
        onlineType: PropTypes.number,
        onScroll : PropTypes.func,
        top : PropTypes.number
    };
    static defaultProps = {
        onlineType : GLOBALS.SONG_ONLINE.YOUTUBE,
        top: 50
    };
    //page = 0;
    state = {
        datas: [],
        dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    };

    _page = "";
    _offsetPage = 0;
    _dataKey = {}
    _loading = false;
    _loaded = false;
    _hasData = true;
    _pageCount = 25;
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
                        dim.width = width;
                        dim.height = height;
                        break;
                    default:
                        dim.width = width;
                        dim.height = height;
                }
            }
        );

        this._loadData = this._loadData.bind(this);
    }
    searchData = (term)=>{
        if(this._loading || term == this._searchTerm)
            return;
       /// console.warn("searchData "+term);
        this._searchTerm = term;
        this._loaded = false;
        this._page = "";
        this._offsetPage = 0;
        this._loadData(this._pageCount,term,this._offsetPage);
    }

    refreshData = (term) =>{
        //console.warn("type = "+this.props.type);
        if (!this._loading) {
            this._searchTerm = term;
            this._loaded = false;
            this._page = "";
            this._offsetPage = 0;
            this._indicator.show();
            this._loadData(this._pageCount,term,this._offsetPage);
        }
    }

    clear =()=>{
        if (!this._loading) {
            this._searchTerm = "";
            this._loaded = false;
            this._page = "";
            this._offsetPage = 0;
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows([]),
                datas: []
            });
        }
    }

    loadData = (term) => {
        if(this._loading)
            return;
        if (this._loaded && this._searchTerm == term) {
            return;
        }
       // console.warn("loadData "+term);
        this._searchTerm = term;
        this._loaded = false;
        this._page = "";
        this._offsetPage = 0;
        this._indicator.show();
        this._loadData(this._pageCount,term,this._offsetPage);
    }

    async _loadData(pageCount, term,page){
        // if (this._loading)
        //     return;
        this._loading = true;
        var that = this;
        var _page = (this.props.onlineType == GLOBALS.SONG_ONLINE.MIXCLOUD)?page:that._page;
        await Databases.fetchOnlineSongData(_page,pageCount,term,this.props.onlineType,
            function (datas,nextPage) {
                if(that.props.onlineType == GLOBALS.SONG_ONLINE.MIXCLOUD){
                    that._offsetPage = page;
                }
                else{
                    that._page = nextPage;
                }
                
                that._handleFetchDataCompleted(datas);
            },
            function(error){
                this._loading = false;
                this._indicator.hide();
            });
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

    _onPressSong = (id) => {
        // const data = {
        //     songId: id,
        //     cmd: GLOBALS.CONTROL_CMD.SELECT
        // }

        // BoxControl.selectSong(id);
    }

    _onEndReached = () => {
        if (this._hasData && !this._loading && this._loaded) {
            this._loadData(this._pageCount,this._searchTerm,this._offsetPage + 1);
            this.setState({});
        }
    }

    _showOptOverlay = (id,overlayType) =>{
       // EventRegister.emit('ShowOptOverlay', {id:id,overlayType:overlayType});
    }

    _renderFooter = () => {
        return (this._loading && this._loaded) ?
            <View style={{ height: 60, width: '100%', justifyContent: "center", alignContent: "center" }}>
                <IndicatorView isShow ={true} />
            </View> :
            <View style={{ height: 1, width: '100%' }} />;
    }

    _rowRenderer = (type, item) => {
        const {thumb,id,title,channelTitle} = item;
       // console.warn("title "+title +" , channelTitle = "+channelTitle);
        return (
            <SongOnlineItem thumbnail={thumb} id ={id} title={title} channel={channelTitle} height = {height} />
        );
    };

    _handleScroll = (rawEvent, offsetX, offsetY) =>{
       // console.warn("offsetY = "+offsetY);
       if(this.props.onScroll != null){
            this.props.onScroll(offsetY);
       }
    }
    render = () => {
        //const {_loading} = this.state;
        return (
            <View style={{ flex: 1 }}>
                <RecyclerListView
                    style={{ flex: 1 }}
                    //contentContainerStyle={{ margin: 3 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this._onEndReached}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                    rowRenderer={this._rowRenderer}
                    renderFooter={this._renderFooter}
                    onScroll = {this._handleScroll}
                    externalScrollView={this.renderScroll}
                    scrollThrottle = {16}
                    initialOffset= {200}
                    //extendedState={this.state.dataProvider} 
                    />
                <IndicatorView ref={ref => (this._indicator = ref)}/>
            </View>
        );
    }

    renderScroll = (props) => {
    return (
        <ScrollView
       // ref="refs"
        {...props}
        scrollEventThrottle={16}
        contentContainerStyle={{
            paddingTop: this.props.top
        }}
            // Declarative API for animations ->
            // onScroll={Animated.event(
            // [
            //     {
            //     nativeEvent: { contentOffset: { y: this.state.scrollY } }
            //     }
            // ],
            // // { listener: this._handleScroll.bind(this) },
            // {
            //     useNativeDriver: true // <- Native Driver used for animated events
            // }
            // )}
        />
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
