
import GLOBALS from './Globals.js'
import DATA_INFO from './DataInfo.js'
import { EventRegister } from 'react-native-event-listeners';
//import PlaybackQueueThread from '../../playbackQueue.thread.js'
import BTE_LIB from 'react-native-bte-lib';

const BOX_COMMAND ={
    BYTE_NEXT_SONG : 139,
    BYTE_CLAP : 15,
    BYTE_CHEER : 14,
    BYTE_WHISTLE : 17,
    BYTE_MUTE  : 148,
    BYTE_HOOTING : 16,
    BYTE_LIKE : 24,
    BYTE_KIS : 25,
    BYTE_FLOWER : 26,
    BYTE_REPLAY : 147,
    BYTE_PLAY_OR_PAUSE : 135,
    BYTE_SWITCH_PLAY_TYPE : 137,
    BYTE_SET_VOLUME : 136,
    BYTE_PRIORITY : 152,
    BYTE_KARAOKE_TYPE : 137,
    BYTE_GRAP_SONG : 152
}

class BoxControl {
 
    static syncPlaybackQueue(){
        console.warn("ping 0 ");
        
        setTimeout(()=>{
            console.warn("ping 1 ");
            this.ping();
        },1000);
    }

    static ping(){
        
        setTimeout(()=>{
            this.ping();
        }, 1000);
    }

    static play(){
        if(DATA_INFO.PLAYBACK_INFO.IsPlaying)
            BTE_LIB.sendRequestControlBox2(BOX_COMMAND.BYTE_PLAY_OR_PAUSE,1);
        else
            BTE_LIB.sendRequestControlBox2(BOX_COMMAND.BYTE_PLAY_OR_PAUSE,0);
    }

    static mute(){
        if(DATA_INFO.PLAYBACK_INFO.IsMute)
            BTE_LIB.sendRequestControlBox2(BOX_COMMAND.BYTE_MUTE,1);
        else
            BTE_LIB.sendRequestControlBox2(BOX_COMMAND.BYTE_MUTE,0);
    }

    static volumeChange(value){
        BTE_LIB.sendRequestControlBox3(BOX_COMMAND.BYTE_SET_VOLUME,1,value*100);
    }

    static selectSong(songId){
        BTE_LIB.addSongToEndOfList(songId);
    }

    static playNow(songId){
        BTE_LIB.playNow(songId);
    }

    static priority(songId){
        BTE_LIB.priority(songId);
    }

    static rePlay(){
        BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_REPLAY);
    }

    static nextSong(){
        BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_NEXT_SONG);
    }

    static effect(type){
        switch(type){
            case GLOBALS.EMOJI.HuytSao:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_WHISTLE);
                break;
            case GLOBALS.EMOJI.HoReo:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_CHEER);
                break;
            case GLOBALS.EMOJI.VoTay:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_CLAP);
                break;
            case GLOBALS.EMOJI.Smile:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_HOOTING);
                break;
            case GLOBALS.EMOJI.Kiss:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_KIS);
                break;
            case GLOBALS.EMOJI.TangHoa:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_FLOWER);
                break;
            case GLOBALS.EMOJI.Like:
                BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_LIKE);
                break;
            case GLOBALS.EMOJI.ChamDiem:
                //BTE_LIB.sendRequestControlBox(BOX_COMMAND.BYTE_LIKE);
                break;
            default:
                break;

        }
    }

}

export default BoxControl;