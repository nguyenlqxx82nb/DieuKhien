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

let { height, width } = Dimensions.get('window');
export default class SongListView extends React.Component {
    static propTypes = {
        lan: PropTypes.string,
        actor : PropTypes.string,
        songType : PropTypes.number,
        listType : PropTypes.number
        //onOptionOverlayOpen: PropTypes.func,
        //onBack: PropTypes.func,
        //duration : PropTypes.number

    };
    static defaultProps = {
        lan : GLOBALS.LANGUAGE_KEY.ALL,
        songType : GLOBALS.SONG_TYPE.ALL,
        listType: GLOBALS.SONG_LIST_TYPE.ALL,
        actor : ""
    };
    //page = 0;
    state = {
        datas: [],
        dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    };

    _page = 0;
    _dataKey = {}
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
                        dim.width = width;
                        dim.height = 60;
                        break;
                    default:
                        dim.width = width;
                        dim.height = 60;
                }
            }
        );

        this._loadData = this._loadData.bind(this);
    }
    componentWillMount() {
        this._listenerSongUpdateEvent = EventRegister.addEventListener('SongUpdate', (data) => {
            this.hasChanged = true;
        })
    }
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this._listenerSongUpdateEvent)
    }

    updateSong = () => {
        this.hasChanged = false;
        var isChange = false;
        for(i = 0; i < this.state.datas.length; i++){
            if(DataInfo.PLAY_QUEUE.indexOf(this.state.datas[i].id) > -1){
                this.state.datas[i].status = GLOBALS.SING_STATUS.SELECTED;
                isChange = true;
            }
            else if(this.state.datas[i].status == GLOBALS.SING_STATUS.SELECTED){
                this.state.datas[i].status = GLOBALS.SING_STATUS.NORMAL;
                isChange = true;
            }
        }

        if(isChange)
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(this.state.datas)
            });
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
        if (!this._loading) {
            this._searchTerm = term;
            this._loaded = false;
            this._page = 0;
            this._indicator.show();
            this._loadData(this.props.lan, this._page, this._pageCount,term);
        }
    }

    clear =()=>{
        if (!this._loading) {
            this._searchTerm = "";
            this._loaded = false;
            this._page = 0;
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
            if(this.hasChanged)
                setTimeout(() => {
                    this.updateSong();
                }, 50);
            return;
        }
       // console.warn("loadData "+term);
        this._searchTerm = term;
        this._loaded = false;
        this._page = 0;
        this._indicator.show();
        this._loadData(this.props.lan, this._page, this._pageCount,term);
    }

    async _loadData(lan, page, pageCount, term)  {
        const {songType,listType,actor} = this.props;
        if (this._loading)
            return;
      //  console.warn("_loadData term = "+term);
        this._loading = true;
        var that = this;
        if(this.props.listType == GLOBALS.SONG_LIST_TYPE.SELECTED){
            Databases.fetchSelectedSong(function (datas) {
                that._handleFetchDataCompleted(datas);
            });
        }
        else{
            await Databases.fetchSongData(lan,page,pageCount,term,songType,listType,actor,
                function (datas) {
                    //console.warn("callback") ;
                    that._page = page;
                    that._handleFetchDataCompleted(datas);
                },
                function(error){
                    that._indicator.hide();
                    that._loading = false;    
                });

           // console.warn(" songs length = "+songs.length);
           // that._page = page;
            //that._handleFetchDataCompleted(songs);
        }
    }

    _handleFetchDataCompleted = (datas) =>{
        this._loading = false;
        var startId = 0;
        var newDatas = [];
        //console.warn("data length = "+datas.length);
        if(this._loaded){
            startId = this.state.datas.length;
            newDatas = this.state.datas.concat(datas);
        }
        else{
            newDatas = datas;
        }

        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(newDatas),
            datas: newDatas
        });

        if(this.props.listType !== GLOBALS.SONG_LIST_TYPE.SELECTED){
            if(datas.length <this._pageCount){
                this._hasData = false;
            }
            else{
                this._hasData = true;
            }

            this._indicator.hide();
            this._loaded = true;
        }
        else{
            this._indicator.hide();
            this._loaded = true;
            this._hasData = false;
        }
        
    }

    _onPressSong = (id, status) => {
        const data = {
            songId: id,
            cmd: GLOBALS.CONTROL_CMD.SELECT
        }

        BoxControl.selectSong(id);
    }

    _onEndReached = () => {
        if (this._hasData && !this._loading && this._loaded) {
            this._loadData(this.props.lan, this._page + 1,this._pageCount,this._searchTerm);
            this.setState({});
        }
    }

    _showOptOverlay = (id,overlayType) =>{
        EventRegister.emit('ShowOptOverlay', {id:id,overlayType:overlayType});
    }

    _renderFooter = () => {
        return (this._loading && this._loaded) ?
            <View style={{ height: 60, width: '100%', justifyContent: "center", alignContent: "center" }}>
                <IndicatorView isShow ={true} />
            </View> :
            <View style={{ height: 1, width: '100%' }} />;
    }

    _rowRenderer = (type, item) => {
        var status =  GLOBALS.SING_STATUS['NORMAL'];
        const singColor = GLOBALS.SING_COLORS[status];
        const singerColor = GLOBALS.SINGER_COLORS[status];
        let singPrefix = GLOBALS.SING_PREFIX[status];
        let overlayType = GLOBALS.SING_OVERLAY.NORMAL;
       // console.warn("Name = "+item["Name"]+" , item = "+item);
       // singPrefix = (singPrefix != "") ? (" (" + singPrefix + ")") : "";
        //const singTitle = item.Name ; //+ //singPrefix;
        const {id,name,actor,singerName} = item;
        return (
            <ListItem
                style={styles.listItem}
                onPress={this._onPressSong.bind(this, item.id, item.status)}
                underlayColor="white">
                <View style={{
                    flex: 1, flexDirection: "row", justifyContent: "center",
                    alignItems: "center", height: 60, marginLeft: 17, marginRight: 5}}>
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={[styles.songText, {color: singColor }]}>
                            {name}
                        </Text>
                        <Text style={[styles.singerText, {color: singerColor }]}>
                            {singerName}
                        </Text>
                    </View>
                    <View style={{ width: 40, height: 40 }}>
                        <IconRippe vector={true} name="tuychon" size={20} onPress={this._showOptOverlay.bind(id,overlayType)} />
                    </View>
                </View>
            </ListItem>
        );
    };

    render = () => {
        //const {_loading} = this.state;
        return (
            <View style={{ flex: 1 }}>
                <RecyclerListView
                    style={{ flex: 1 }}
                    //contentContainerStyle={{ margin: 3 }}
                    showsHorizontalScrollIndicator={false}
                    //showsVerticalScrollIndicator={false}
                    onEndReached={this._onEndReached}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                    rowRenderer={this._rowRenderer}
                    renderFooter={this._renderFooter}
                    extendedState={this.state.dataProvider} 
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

    songText: {
        color: "#fff",
        fontFamily:GLOBALS.FONT.MEDIUM,
        fontSize: 18, 
        lineHeight: 25, 
    },

    singerText:{
        color: "#fff",
        fontFamily:GLOBALS.FONT.REGULAR,
        fontSize: 13
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
