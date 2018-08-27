import GLOBALS from "./Globals";
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


const SingerDataTemp = [
    {
        id: 1,
        source : 0,
        name : "Chí Dân",
        sex : GLOBALS.SINGER_SEX.MALE,
        //status: GLOBAL.SING_STATUS.NORMAL
    },
    {
        id: 2,
        source : 1,
        name : "Đàm Vĩnh Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 3,
        source : 2,
        name : "Đan Trường",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 4,
        source : 3,
        name : "Hồ Ngọc Hà",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id: 5,
        source : 4,
        name : "Hương Tràm",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:6,
        source : 5,
        name : "No Phước Thịnh",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:7,
        source : 6,
        name : "Sơn Tùng - MTP",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:8,
        source : 7,
        name : "Tố My",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:9,
        source : 8,
        name : "Tuấn Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 10,
        source : 0,
        name : "Chí Dân",
        sex : GLOBALS.SINGER_SEX.MALE,
        //status: GLOBAL.SING_STATUS.NORMAL
    },
    {
        id: 11,
        source : 1,
        name : "Đàm Vĩnh Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 12,
        source : 2,
        name : "Đan Trường",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 13,
        source : 3,
        name : "Hồ Ngọc Hà",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id: 14,
        source : 4,
        name : "Hương Tràm",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:15,
        source : 5,
        name : "No Phước Thịnh",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:16,
        source : 6,
        name : "Sơn Tùng - MTP",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:17,
        source : 7,
        name : "Tố My",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:18,
        source : 8,
        name : "Tuấn Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:19,
        source : 6,
        name : "Sơn Tùng - MTP",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:20,
        source : 7,
        name : "Tố My",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:21,
        source : 8,
        name : "Tuấn Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 22,
        source : 0,
        name : "Chí Dân",
        sex : GLOBALS.SINGER_SEX.MALE,
        //status: GLOBAL.SING_STATUS.NORMAL
    },
    {
        id: 23,
        source : 1,
        name : "Đàm Vĩnh Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 24,
        source : 2,
        name : "Đan Trường",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id: 25,
        source : 3,
        name : "Hồ Ngọc Hà",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id: 26,
        source : 4,
        name : "Hương Tràm",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:27,
        source : 5,
        name : "No Phước Thịnh",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:28,
        source : 6,
        name : "Sơn Tùng - MTP",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
    {
        id:29,
        source : 7,
        name : "Tố My",
        sex : GLOBALS.SINGER_SEX.FEMALE,
    },
    {
        id:30,
        source : 8,
        name : "Tuấn Hưng",
        sex : GLOBALS.SINGER_SEX.MALE,
    },
];

class Databases {
    static fetchSongData(lan,page, pageCount, term,callback){
        //console.warn('fetchSongData0 : '+page+" , "+lan); 
        setTimeout(()=>{
            var retDatas = [];
            const moreId = page*SongDataTemp.length + (GLOBALS.LANGUAGE[lan] - 1)*2000;
            if(page < 50){
                for(var i in SongDataTemp){
                    if(term !="" && SongDataTemp[i].name.indexOf(term) == -1){
                        continue;
                    }
                    var id = SongDataTemp[i].id + moreId ;
                    var data = {
                        id : id,
                        name : SongDataTemp[i].name,
                        singer : SongDataTemp[i].singer,
                        download : SongDataTemp[i].download
                    };
                    
                    if(data.download == GLOBALS.DOWNLOAD_STATUS.DOWNLOADED){
                        if(DataInfo.PLAY_QUEUE.indexOf(data.id) > -1){
                            data.status = GLOBALS.SING_STATUS.SELECTED;
                        }
                        else{
                            data.status = GLOBALS.SING_STATUS.NORMAL;
                        }
                    }
                    else if(data.download == GLOBALS.DOWNLOAD_STATUS.DOWNLOADING){
                        data.status = GLOBALS.SING_STATUS.DOWNLOADING;
                    }
                    else{
                        data.status = GLOBALS.SING_STATUS.NO_DOWNLOADED;
                    }

                    retDatas.push(data);
                }
            }
            
            callback(retDatas);
        },400);
    }

    static fetchSingerData(lan,page, pageCount, term,sex,callback){
        //console.warn("fetchSingerData sex = "+sex);
        setTimeout(()=>{
            var retDatas = [];
            const moreId = page*SingerDataTemp.length + (GLOBALS.LANGUAGE[lan] - 1)*2000;
            if(page < 50){
                for(var i in SingerDataTemp){
                    if(term !="" && SingerDataTemp[i].name.indexOf(term) == -1){
                        continue;
                    }

                    if(sex != GLOBALS.SINGER_SEX.ALL && sex != SingerDataTemp[i].sex){
                        continue;
                    }

                    var id = SingerDataTemp[i].id + moreId ;
                    var data = {
                        id : id,
                        name : SingerDataTemp[i].name,
                        sex : SingerDataTemp[i].sex,
                        source : SingerDataTemp[i].source
                    };
                    retDatas.push(data);
                }
            }
            //console.warn("fetchSingerData retDatas = "+retDatas.length);
            callback(retDatas);
        },200);
    }

    static fetchSelectedSong(callback){
        setTimeout(()=>{
            var retDatas = [];
            for(var i =0; i<DataInfo.PLAY_QUEUE.length; i++){
                var songId = DataInfo.PLAY_QUEUE[i];
                var id = (songId % 1000)%30 - 1;
                id = (id < 0)?29:id;
                var data = {
                    id : songId,
                    name : SongDataTemp[id].name,
                    singer : SongDataTemp[id].singer,
                    download : SongDataTemp[id].download,
                    status : GLOBALS.SING_STATUS.NORMAL
                };
                
                retDatas.push(data);
            }
            callback(retDatas);
        },300);
    }

    static getSong(songId,callback){
        setTimeout(()=>{
            var id = (songId % 1000)%30 - 1;
            id = (id < 0)?29:id;
            var data = {
                id : songId,
                name : SongDataTemp[id].name,
                singer : SongDataTemp[id].singer,
                download : SongDataTemp[id].download,
                status : GLOBALS.SING_STATUS.NORMAL
            };
            callback(data);
        },100);
    }
}

export default Databases;