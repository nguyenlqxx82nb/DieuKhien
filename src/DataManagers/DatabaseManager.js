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

const songOnlineTemp = [
    {
        id: 1,
        title: "RỢN LẮM Người Mẹ Quỷ - Truyện Ma Có Thật Trường Lê Viết Mà Sợ",
        thumbnails :"https://i.ytimg.com/vi/KVcvvY2kMs4/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 2,
        title: "[Phần 2] RỢN LẮM Người Mẹ Quỷ - Truyện Ma Có Thật Trường Lê Viết Mà Sợ",
        thumbnails :"https://i.ytimg.com/vi/5JAzMDhep7c/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 3,
        title: "[Phần 3] HÃI lẮM Vong Hồn - Truyện Ma Có Thật Trường Lê Viết Quá Hay",
        thumbnails :"https://i.ytimg.com/vi/hI-Z21A-ETk/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 4,
        title: "TRUYỆN MA CÓ THẬT - NGHIỆP ÂM PHẦN 2 [ TẬP 1 ] CON ĐƯỜNG ĐẠO SĨ NGUYỄN NGỌC QUANG - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/lO998TO3kTY/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 5,
        title: "[SỢ LẮM] Đền Tội Cho Ác Nghiệp - Truyện Ma Có Thật Đình Soạn Kể",
        thumbnails :"https://i.ytimg.com/vi/ZmQNyP2gWoY/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 6,
        title: "[TRUYỆN MA] GIA ĐÌNH TRÙNG TANG - TRUYỆN MA CÓ THẬT KHỎI BẢO NÓI ĐIÊU NHÉ!",
        thumbnails :"https://i.ytimg.com/vi/aRQJ2Goku-I/hqdefault.jpg",
        channelTitle: "Truyện Ma 3S"
    },
    {
        id: 7,
        title: "Oan Hồn Về Làm Vợ - Truyện Ma Có Thật hay hấp dẫn nhất hiện nay",
        thumbnails :"https://i.ytimg.com/vi/Bre1p7tBuqQ/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 8,
        title: "TRUYỆN MA CÓ THẬT - THÁNG 7 CỦA AI [ TẬP 1 ] - BÍ ẨN THÁNG CÔ HỒN QUỶ TIẾT - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/jFTEKX9UpkQ/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 9,
        title: "[Phần 4] HÃI lẮM Vong Hồn - Truyện Ma Có Thật Trường Lê Viết Quá Hay",
        thumbnails :"https://i.ytimg.com/vi/bm5RIDO5pxo/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 10,
        title: "Tiếng Rú Vào Đêm Khuya - Truyện Ma Có Thật Ngọc Lâm Kể Hãi Lắm",
        thumbnails :"https://i.ytimg.com/vi/iHJXlTDrFyE/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 11,
        title: "TRUYỆN MA CÓ THẬT - CÔ HỒN THÁNG 7 [ TẬP 1 ] SERI : CHẶNG ĐƯỜNG ĐÃ QUA - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/66sqn4tprY4/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 12,
        title: "TRUYỆN MA CÓ THẬT - NGHIỆP ÂM PHẦN 2 [ TẬP 1 ] CON ĐƯỜNG ĐẠO SĨ NGUYỄN NGỌC QUANG - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/lO998TO3kTY/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 13,
        title: "[SỢ LẮM] Đền Tội Cho Ác Nghiệp - Truyện Ma Có Thật Đình Soạn Kể",
        thumbnails :"https://i.ytimg.com/vi/ZmQNyP2gWoY/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 14,
        title: "[TRUYỆN MA] GIA ĐÌNH TRÙNG TANG - TRUYỆN MA CÓ THẬT KHỎI BẢO NÓI ĐIÊU NHÉ!",
        thumbnails :"https://i.ytimg.com/vi/aRQJ2Goku-I/hqdefault.jpg",
        channelTitle: "Truyện Ma 3S"
    },
    {
        id: 15,
        title: "Oan Hồn Về Làm Vợ - Truyện Ma Có Thật hay hấp dẫn nhất hiện nay",
        thumbnails :"https://i.ytimg.com/vi/Bre1p7tBuqQ/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 16,
        title: "Tiếng Rú Vào Đêm Khuya - Truyện Ma Có Thật Ngọc Lâm Kể Hãi Lắm",
        thumbnails :"https://i.ytimg.com/vi/iHJXlTDrFyE/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 17,
        title: "TRUYỆN MA CÓ THẬT - CÔ HỒN THÁNG 7 [ TẬP 1 ] SERI : CHẶNG ĐƯỜNG ĐÃ QUA - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/66sqn4tprY4/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 18,
        title: "TRUYỆN MA CÓ THẬT - NGHIỆP ÂM PHẦN 2 [ TẬP 1 ] CON ĐƯỜNG ĐẠO SĨ NGUYỄN NGỌC QUANG - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/lO998TO3kTY/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 19,
        title: "[SỢ LẮM] Đền Tội Cho Ác Nghiệp - Truyện Ma Có Thật Đình Soạn Kể",
        thumbnails :"https://i.ytimg.com/vi/ZmQNyP2gWoY/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 20,
        title: "[TRUYỆN MA] GIA ĐÌNH TRÙNG TANG - TRUYỆN MA CÓ THẬT KHỎI BẢO NÓI ĐIÊU NHÉ!",
        thumbnails :"https://i.ytimg.com/vi/aRQJ2Goku-I/hqdefault.jpg",
        channelTitle: "Truyện Ma 3S"
    },
    {
        id: 21,
        title: "Oan Hồn Về Làm Vợ - Truyện Ma Có Thật hay hấp dẫn nhất hiện nay",
        thumbnails :"https://i.ytimg.com/vi/Bre1p7tBuqQ/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 22,
        title: "TRUYỆN MA CÓ THẬT - NGHIỆP ÂM PHẦN 2 [ TẬP 1 ] CON ĐƯỜNG ĐẠO SĨ NGUYỄN NGỌC QUANG - MC QUÀNG A TŨN",
        thumbnails :"https://i.ytimg.com/vi/lO998TO3kTY/hqdefault.jpg",
        channelTitle: "Đọc Truyện Đêm Khuya"
    },
    {
        id: 23,
        title: "[SỢ LẮM] Đền Tội Cho Ác Nghiệp - Truyện Ma Có Thật Đình Soạn Kể",
        thumbnails :"https://i.ytimg.com/vi/ZmQNyP2gWoY/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
    {
        id: 24,
        title: "[TRUYỆN MA] GIA ĐÌNH TRÙNG TANG - TRUYỆN MA CÓ THẬT KHỎI BẢO NÓI ĐIÊU NHÉ!",
        thumbnails :"https://i.ytimg.com/vi/aRQJ2Goku-I/hqdefault.jpg",
        channelTitle: "Truyện Ma 3S"
    },
    {
        id: 25,
        title: "Oan Hồn Về Làm Vợ - Truyện Ma Có Thật hay hấp dẫn nhất hiện nay",
        thumbnails :"https://i.ytimg.com/vi/Bre1p7tBuqQ/hqdefault.jpg",
        channelTitle: "Truyện ma Nguyễn Ngọc Ngạn"
    },
]

class Databases {
    static fetchSongData(lan,page, pageCount, term,songType,callback){
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

    static fetchOnlineSongData(page, pageCount, term,songOln,callback){
        //console.warn('fetchSongData0 : '+page+" , "+lan); 
        setTimeout(()=>{
            var retDatas = [];
            const moreId = page*songOnlineTemp.length + (songOln - 1)*2000;
            if(page < 50){
                for(var i in songOnlineTemp){
                    if(term !="" && songOnlineTemp[i].title.indexOf(term) == -1){
                        continue;
                    }
                    var id = songOnlineTemp[i].id + moreId ;
                    var data = {
                        id : id,
                        title : songOnlineTemp[i].title,
                        thumb : songOnlineTemp[i].thumbnails,
                        channelTitle : songOnlineTemp[i].channelTitle
                    };
                    
                    retDatas.push(data);
                }
            }
            
            callback(retDatas);
        },400);
    }
}

export default Databases;