export default {
    STORE_KEY: 'a56z0fzrNpl^2',
    BASE_URL: 'http://someurl.com',

    CONTROL_CMD :{
        SELECT : 1,
        REMOVE : 2,
        DOWNLOAD : 3,
        PRIORITY : 4,
        PLAY : 5,
        PAUSE : 6,
        VOLUMN : 7,
        NEXT : 8,
    },

    COLOR: {
      ORANGE: '#C50',
      DARKBLUE: '#0F3274',
      LIGHTBLUE: '#6EA8DA',
      DARKGRAY: '#999',
    },

    SING_STATUS :{
        NORMAL : 'NORMAL',
        SELECTED : 'SELECTED',
        NO_DOWNLOADED : 'NO_DOWNLOADED',
        DOWNLOADING : 'DOWNLOADING'
    },

    SINGER_COLORS :{
        'NORMAL' : "#B6BACC",
        'SELECTED' : "#00ECBC",
        'NO_DOWNLOADED' : "#8FA1A7",
        'DOWNLOADING' : "#FF2626"
    },
    
    SING_COLORS :{
        'NORMAL' : "#fff",
        'SELECTED' : "#00ECBC",
        'NO_DOWNLOADED' : "#8FA1A7",
        'DOWNLOADING' : "#FF2626"
    },

    SING_PREFIX :{
        'NORMAL' : "",
        'SELECTED' : "Đã chọn",
        'NO_DOWNLOADED' : "Chưa tải",
        'DOWNLOADING' : "Đang tải"
    },

    SING_COLORS_2 :{
        NORMAL : "#fff",
        SELECTED : "#00ECBC",
        NO_DOWNLOADED : "#8FA1A7",
        DOWNLOADING : "#FF2626"
    },

    SING_OVERLAY :{
        NONE: 0,
        NORMAL : 1,
        EMOJI : 2
    },

    LANGUAGE : {
        'vn' : 1,
        'en' : 2,
        'cn' : 3,
        'ja' : 4,
        'kr' : 5
    },

    LANGUAGE_NAME : {
        'vn' : "VIỆT NAM",
        'en' : "ENGLISH",
        'cn' : "CHINESE",
        'ja' : "JAPANESE",
        'kr' : "KOREAN"
    },

    DOWNLOAD_STATUS : {
        DOWNLOADED : 1,
        NO_DOWNLOAD : 2,
        DOWNLOADING : 3,
    },

    SONG_LIST_TYPE :{
        NORMAL : 1,
        SELECTED : 2,
        NO_DOWNLOAD : 3,
        AUTO : 4
    },

    TRANSITION : {
        FADE : 1,
        SLIDE_LEFT: 2,
        SLIDE_TOP : 3
    },

    BackgroundImage : require("../../assets/background.png"),
    Emo1 : require("../../assets/Emojiii2.png"),
    Emo2 : require("../../assets/Emojiii1.png"),
    Emo3 : require("../../assets/Emojiii3.png"),
    Emo4 : require("../../assets/Emojiii4.png"),
    Emo5 : require("../../assets/Emojiii5.png"),
    Emo6 : require("../../assets/clap1.png"),
    Emo7 : require("../../assets/rose.png"),
    Emo8 : require("../../assets/like.png"),

    SINGER_TEST : [
        "http://mediaold.tiin.vn:8080/media_old_2016//archive/images/2017/05/04/142620_img_9272.jpg",
        "http://image.baophapluat.vn/w620/Uploaded/2018/wlesfjofzyr/2018_03_25/8_ylci.jpg",
        "https://avatar-nct.nixcdn.com/playlist/2017/05/31/4/9/7/8/1496225850244_500.jpg",
        "http://2sao.vietnamnetjsc.vn/images/2017/09/04/19/21/ho-ngoc-ha-1.jpg",
        "https://dantricdn.com/2018/1/29/huong-tram-111-15172246997241116257391.jpg",
        "http://file.vforum.vn/hinh/2018/03/hinh-anh-hinh-nen-noo-phuoc-thinh-dep-nhat-de-thuong-22.jpg",
        "https://baoconggiao.net/uploads/news/2018_05/mv-cua-son-tung-mtp-mat-khoi-top-trending-vi-xuc-pham-duc-me-va-dao-cong-giao.jpg",
        "https://baomoi-photo-1-td.zadn.vn/w700_r1/18/03/19/255/25311763/3_487236.jpg",
        "https://zmp3-photo-fbcrawler-te-vnso-qt-1.zadn.vn/avatars/4/d/4d870627ce2f41a989ba676e0a313597_1427689508.jpg"
    ],

    SINGER_SEX : {
        MALE : 1,
        FEMALE : 2,
        GROUP : 3,
        ALL :4,
    }

  };