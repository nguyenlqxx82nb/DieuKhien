import {Dimensions,Platform } from 'react-native';

const screen = {
    width : Math.round(Dimensions.get('window').width * 1000) / 1000,
    height : Math.round(Dimensions.get('window').height * 1000) / 1000,
}
export default class Utils{

    static getScreenWidth(){
        return screen.width;
    }

    static getScreenHeight(){
        return screen.height;
    }

}