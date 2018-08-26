package com.bte.libs;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MyModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
    public MyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethod
    public void alert(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void test(int cmd, Callback callback){
        callback.invoke("dcm",cmd*2);
    }

    @ReactMethod
    public void getPlaybackInfo(Callback callback){
        Tools.getPlaybackInfo();
        callback.invoke(Global.volume);
    }

    @ReactMethod
    public void synsPlaybackQueue(){
        Tools.synchronousPlaybackQueue(mReactContext);

//        WritableMap params = Arguments.createMap();
//        params.putInt("taisao",1);
        //sendEvent("test",params);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
