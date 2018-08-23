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
        NORMAL : 1
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

    BackgroundImage : require("../../assets/background.png")

  };