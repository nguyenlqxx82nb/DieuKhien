import GLOBALS from "./Globals";
import DataInfo from './DataInfo';
const format = require('string-format')

const API_KEY = "AIzaSyB5JMptWGXqC7IJT3fTNdbMfthO9YsYkkY";
const CHANNEL_ID = "UCKo00d6hS17XvaJL9-Wzlww";
var SEARCH_API = "https://www.googleapis.com/youtube/v3/search?part=snippet";

export default class YoutubeAPI {
    
    static getSearchQuery(page, pageCount, term){
        var query = SEARCH_API;
        //query += "&channelId="+CHANNEL_ID;
        query += "&maxResults="+pageCount;
        if(page !=""){
            query += "&pageToken="+page;
        }
        if(term == ""){
            query += "&q=karaoke";
        }
        else{
            query += "&q="+term;
        }
        query += "&key="+API_KEY;

        return query;
    }

    static async fetchOnlineSongData(page, pageCount, term,callback,errorCallback){
        let query = this.getSearchQuery(page, pageCount, term);
        //console.warn(query);
        try {
            let response = await fetch(query);
            let responseJson = await response.json();
            let pageToken = responseJson.nextPageToken;
            callback(this.covertDatas(responseJson.items),pageToken);
        } catch (error) {
           // console.warn(error);
           errorCallback(error);
        }
    }

    static covertDatas(rows){
        //console.warn("length = "+rows.length);
        if(rows == null || rows.length == 0){
            return [];
        }
        else{
            var datas= [];

            for(var i=0; i< rows.length; i++){
                var snippet = rows[i].snippet;
                //console.warn("kind = "+rows[i].kind +", id = "+rows[i].id.videoId +" , url = "+snippet.thumbnails.high.url);
                var snippet = rows[i].snippet;
                var data = {
                    id : rows[i].id.videoId,
                    title : snippet.title,
                    thumb : snippet.thumbnails.high.url,
                    channelTitle : snippet.channelTitle
                };
                
                datas.push(data);
            }

            return datas;
        }
    }
}