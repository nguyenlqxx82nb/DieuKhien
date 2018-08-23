
import GLOBALS from './Globals.js'
import DATA_INFO from './DataInfo.js'
import { EventRegister } from 'react-native-event-listeners';

class BoxControl {

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

}

export default BoxControl;