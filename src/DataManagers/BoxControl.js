
import GLOBALS from './Globals.js'
import DATA_INFO from './DataInfo.js'
import { EventRegister } from 'react-native-event-listeners';
import { Thread } from 'react-native-threads';
//import PlaybackQueueThread from '../../playbackQueue.thread.js'

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
        setTimeout(() => {
            DATA_INFO.PLAYBACK_INFO.IsPlaying = (DATA_INFO.PLAYBACK_INFO.IsPlaying)?false:true;
            EventRegister.emit("PlaybackInfoUpdate",{});
        }, 500);
    }

    static mic(){
        setTimeout(() => {
            DATA_INFO.PLAYBACK_INFO.IsMute = (DATA_INFO.PLAYBACK_INFO.IsMute)?false:true;
            EventRegister.emit("PlaybackInfoUpdate",{});
        }, 500);
    }

    static volumeChange(value){
        setTimeout(() => {
            DATA_INFO.PLAYBACK_INFO.Volume = value;
            EventRegister.emit("PlaybackInfoUpdate",{});
        }, 500);
    }

    static selectSong(songId){
        if(DATA_INFO.PLAY_QUEUE.indexOf(songId) === -1){
            
            setTimeout(()=>{
                //EventRegister.emit('SongUpdate',DATA_INFO.PLAY_QUEUE);
                DATA_INFO.PLAY_QUEUE.push(songId);
            },100);
        }
    }

}

export default BoxControl;