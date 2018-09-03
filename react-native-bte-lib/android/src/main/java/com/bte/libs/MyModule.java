package com.bte.libs;

import android.content.BroadcastReceiver;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.annotation.Nullable;
import android.widget.Toast;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
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
        listenNetworkInfoChange();

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
    public void getUrlActorAvatar(String actor,int index,Callback callback){
        String urlStr = Tools.getUrl(actor);
        WritableMap map = Arguments.createMap();
        map.putString("url",urlStr);
        callback.invoke(urlStr,index);
    }
    @ReactMethod
    public void synsPlaybackQueue(){
        Tools.synchronousPlaybackQueue(mReactContext);

//        WritableMap params = Arguments.createMap();
//        params.putInt("taisao",1);
        //sendEvent("test",params);
    }

    @ReactMethod
    public void checkConnectToWifiBox(){
        checkConnectToBox();
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void listenNetworkInfoChange() {
        IntentFilter intentFilter = new IntentFilter("RNNetInfoChange");
        mReactContext.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                checkConnectToBox();
            }
        },intentFilter);
    }

    private void checkConnectToBox(){
        ConnectivityManager manager = (ConnectivityManager) mReactContext.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netinfo = manager.getActiveNetworkInfo();
        if (netinfo != null && netinfo.isConnected() && netinfo.isAvailable()
                && netinfo.getType() == ConnectivityManager.TYPE_WIFI) {
            Tools.checkWifiStatus(mReactContext);
        } else {
            WritableMap params = Arguments.createMap();
            params.putBoolean("isConnected",false);
            sendEvent("ConnectToBox",params);
        }
    }

}
