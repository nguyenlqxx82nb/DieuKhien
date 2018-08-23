import Globals from "./Globals";
import DataInfo from './DataInfo';

const SongDataTemp = [
    {
        id: 1,
        name: "Đến Với Nhau Là Sai",
        singer: "No Phước Thịnh",
        download : 1,
        //status: GLOBAL.SING_STATUS.NORMAL
    },
    {
        id: 2,
        name: "Giac Mơ E Chờ",
        singer: "Chi Dân",
        download : 1,
    },
    {
        id: 3,
        name: "Đến Với Nhau Là Sai",
        singer: "Quang Vinh, Híu",
        download : 1,
    },
    {
        id: 4,
        name: "Em Mới Là Người Anh Yêu",
        singer: "Min",
        download : 1,
    },
    {
        id: 5,
        name: "Chạy Ngay Đi",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 6,
        name: "Sống Như Ta (Forever 20)",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 7,
        name: "Ưu Tư",
        singer: "Phạm Duy Anh, Bảo Uyên, 1DEE",
        download : 2,
    },
    {
        id: 8,
        name: "Người cuối",
        singer: "Chí Thiện, Búp, Ira Hoàng Thy",
        download : 2,
    },

    {
        id: 9,
        name: "Đến Với Nhau Là Sai",
        singer: "No Phước Thịnh",
        download : 3,
    },
    {
        id: 10,
        name: "Giac Mơ E Chờ",
        singer: "Chi Dân",
        download : 1,
    },
    {
        id: 11,
        name: "Đến Với Nhau Là Sai",
        singer: "Quang Vinh, Híu",
        download : 1,
    },
    {
        id: 12,
        name: "Em Mới Là Người Anh Yêu",
        singer: "Min",
        download : 1,
    },
    {
        id: 13,
        name: "Chạy Ngay Đi",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 14,
        name: "Sống Như Ta (Forever 20)",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 15,
        name: "Ưu Tư",
        singer: "Phạm Duy Anh, Bảo Uyên, 1DEE",
        download : 3,
    },
    {
        id: 16,
        name: "Người cuối",
        singer: "Chí Thiện, Búp, Ira Hoàng Thy",
        download : 2,
    },
    {
        id: 17,
        name: "Đến Với Nhau Là Sai",
        singer: "No Phước Thịnh",
        download : 1,
        //status: GLOBAL.SING_STATUS.NORMAL
    },
    {
        id: 18,
        name: "Giac Mơ E Chờ",
        singer: "Chi Dân",
        download : 1,
    },
    {
        id: 19,
        name: "Đến Với Nhau Là Sai",
        singer: "Quang Vinh, Híu",
        download : 1,
    },
    {
        id: 20,
        name: "Em Mới Là Người Anh Yêu",
        singer: "Min",
        download : 1,
    },
    {
        id: 21,
        name: "Chạy Ngay Đi",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 22,
        name: "Sống Như Ta (Forever 20)",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 23,
        name: "Ưu Tư",
        singer: "Phạm Duy Anh, Bảo Uyên, 1DEE",
        download : 2,
    },
    {
        id: 24,
        name: "Người cuối",
        singer: "Chí Thiện, Búp, Ira Hoàng Thy",
        download : 2,
    },

    {
        id: 25,
        name: "Đến Với Nhau Là Sai",
        singer: "No Phước Thịnh",
        download : 3,
    },
    {
        id: 26,
        name: "Giac Mơ E Chờ",
        singer: "Chi Dân",
        download : 1,
    },
    {
        id: 27,
        name: "Đến Với Nhau Là Sai",
        singer: "Quang Vinh, Híu",
        download : 1,
    },
    {
        id: 28,
        name: "Em Mới Là Người Anh Yêu",
        singer: "Min",
        download : 1,
    },
    {
        id: 29,
        name: "Chạy Ngay Đi",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
    {
        id: 30,
        name: "Sống Như Ta (Forever 20)",
        singer: "Sơn Tùng - MTP",
        download : 1,
    },
];

class Databases {
    static fetchSongData(lan,page, pageCount, term,callback){
        //console.warn('fetchSongData0 : '+page+" , "+lan); 
        setTimeout(()=>{
            var retDatas = [];
            const moreId = page*SongDataTemp.length + (Globals.LANGUAGE[lan] - 1)*2000;
            if(page < 50){
                for(var i in SongDataTemp){
                    if(term !="" && SongDataTemp[i].name.indexOf(term) == -1){
                        continue;
                    }
                    var id = SongDataTemp[i].id + moreId ;
                    var data = {
                        id : id,
                        name : id + " - "+ SongDataTemp[i].name,
                        singer : SongDataTemp[i].singer,
                        download : SongDataTemp[i].download
                    };
                    
                    if(data.download == Globals.DOWNLOAD_STATUS.DOWNLOADED){
                        if(DataInfo.PLAY_QUEUE.indexOf(data.id) > -1){
                            data.status = Globals.SING_STATUS.SELECTED;
                        }
                        else{
                            data.status = Globals.SING_STATUS.NORMAL;
                        }
                    }
                    else if(data.download == Globals.DOWNLOAD_STATUS.DOWNLOADING){
                        data.status = Globals.SING_STATUS.DOWNLOADING;
                    }
                    else{
                        data.status = Globals.SING_STATUS.NO_DOWNLOADED;
                    }

                    retDatas.push(data);
                }
            }
            
            callback(retDatas);
        },400);
    }

    static fetchSelectedSong(callback){
        setTimeout(()=>{
            var retDatas = [];
            for(var i =0; i<DataInfo.PLAY_QUEUE.length; i++){
                var songId = DataInfo.PLAY_QUEUE[i];
                var id = (songId % 1000)%30;
                var data = {
                    id : songId,
                    name : songId + " - "+ SongDataTemp[id].name,
                    singer : SongDataTemp[id].singer,
                    download : SongDataTemp[id].download,
                    status : Globals.SING_STATUS.NORMAL
                };
                
                retDatas.push(data);
            }
            callback(retDatas);
        },300);
    }
}

export default Databases;