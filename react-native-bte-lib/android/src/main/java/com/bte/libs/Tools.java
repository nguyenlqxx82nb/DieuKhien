package com.bte.libs;

import android.content.Context;
import android.os.Message;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Promise;

public class Tools {

    public static void getPlaybackInfo() {
//        new Thread(new Runnable() {
//            public void run() {
//                while (Global.isAppRunning) {
//
//                    try {
//                        Thread.sleep(1000);
//                    } catch (InterruptedException e) {
//                        // TODO Auto-generated catch block
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }).start();

        Socket socket = null;
        OutputStream writes = null;
        while(Constants.HOST_IP.length()<5)
        {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        try {
            socket = new Socket();
            SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
            socket.connect(socketAddress, 3000);
            writes = socket.getOutputStream();
            byte[] buff = new byte[2048];
            buff[3] = 0x26;
            writes.write(buff);
            writes.flush();

            InputStream inputStream = socket.getInputStream();
            byte[] bytes = new byte[1024];
            inputStream.read(bytes);

            if (Global.isPlaying != ((int) bytes[100] == 1 ? 0 : 1)) {
                Global.isPlaying = (int) bytes[100] == 1 ? 0 : 1;

//                Message msg = Global.handler.obtainMessage();
//                msg.what = Global.TOGGLEPLAYPAUSE;
//                Global.handler.sendMessage(msg);
            }
            if (Global.isMute != ((int) bytes[101] == 1 ? 0 : 1)) {
                Global.isMute = ((int) bytes[101] == 1 ? 0 : 1);

//                Message msg = Global.handler.obtainMessage();
//                msg.what = Global.MUTE;
//                Global.handler.sendMessage(msg);
            }
            if (Global.isOriginal != ((int) bytes[102] == 1 ? 0 : 1)) {
                Global.isOriginal = (int) bytes[102] == 1 ? 0 : 1;

//                Message msg = Global.handler.obtainMessage();
//                msg.what = Global.SWITCHINGORIGINALACCOMPANIMENT;
//                Global.handler.sendMessage(msg);
            }
            if (Global.volume != (int) bytes[103]) {
                Global.volume = (int) bytes[103];

//                Message msg = Global.handler.obtainMessage();
//                msg.what = Global.SETVOLUME;
//                Global.handler.sendMessage(msg);
            }

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            //XLog.e("synchronousPlaybackInformation error :" + e.getMessage());
            // alert("���ڲ���ʹ�ã�������ָ����wifi!");
        } finally {
            try {
                socket.close();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    public static void synchronousPlaybackQueue(final ReactContext reactContext) {
        new Thread(new Runnable() {
            public void run() {
                Boolean isFirst = true;
                while (true) {
                    Socket socket = null;
                    OutputStream writes = null;
                    Boolean flag = false;
                    while(Constants.HOST_IP.length()<5)
                    {
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                    }
                    try {
                        socket = new Socket();
                        SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                        socket.connect(socketAddress, 3000);
                        writes = socket.getOutputStream();
                        byte[] buff = new byte[2048];
                        buff[3] = (byte) 149;
                        writes.write(buff);
                        writes.flush();

                        InputStream inputStream = socket.getInputStream();// ������������������socket��������
                        byte[] bytes = new byte[1024];
                        inputStream.read(bytes);
                        byte[] songIdQueue = new byte[1020];
                        System.arraycopy(bytes, 4, songIdQueue, 0, 1020);
                        String songIdQueueString = new String(songIdQueue);
                        String[] songIdQueueArray = songIdQueueString.split(",");
                        int queueLen = Global.playQueue.size();
                        WritableArray queue = Arguments.createArray();
                        if (queueLen != songIdQueueArray.length - 1 || isFirst) {
                            Global.playQueue.clear();
                            for (int i = 0; i < songIdQueueArray.length - 1; i++) {
                                Global.playQueue.add(songIdQueueArray[i]);
                                queue.pushString(songIdQueueArray[i]);
                            }
                            flag = true;
                        } else {
                            for (int i = 0; i < songIdQueueArray.length - 1; i++) {
                                if (Global.playQueue.get(i).equals(songIdQueueArray[i])) {
                                    continue;
                                }
                                Global.playQueue.clear();
                                for (int j = 0; j < songIdQueueArray.length - 1; j++) {
                                    Global.playQueue.add(songIdQueueArray[j]);
                                    queue.pushString(songIdQueueArray[i]);
                                }
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            WritableMap params = Arguments.createMap();
                            params.putArray("taisao",queue);

                            reactContext
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit("test", params);
                        }

//                        WritableMap params = Arguments.createMap();
//                        params.putInt("taisao",1);
//
//                        reactContext
//                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                                .emit("test", params);

                        isFirst = false;

                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                        //XLog.e(" synchronousPlaybackQueue error :" + e.getMessage());
                        // alert("���ڲ���ʹ�ã�������ָ����wifi!");
                    } finally {
                        try {
                            socket.close();
                        } catch (Exception e) {
                            // e.printStackTrace();
                        }
                    }

                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public static void checkWifiStatus(final ReactContext reactContext) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, 3000);
                    WritableMap params = Arguments.createMap();
                    params.putBoolean("isConnected",true);
                    SendEvent(reactContext,params,"ConnectToBox");
                } catch (Exception e) {
                    WritableMap params = Arguments.createMap();
                    params.putBoolean("isConnected",false);
                    SendEvent(reactContext,params,"ConnectToBox");
                } finally {
                    try {
                        socket.close();
                    } catch (Exception e) {
                        // e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public static String encode(String str) {
        String hexString = "0123456789ABCDEF";
        byte[] bytes = str.getBytes();
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (int i = 0; i < bytes.length; i++) {
            sb.append(hexString.charAt((bytes[i] & 0xf0) >> 4));
            sb.append(hexString.charAt((bytes[i] & 0x0f) >> 0));
        }

        return sb.toString();
    }

    public static String getUrl(String singerName) {
        String singerNameUnicodeString = Tools.encode(singerName);
        String urlStr;
        urlStr = "http://" + Constants.HOST_IP + ":2012/Ktv/singer_picture/";
        urlStr = urlStr + singerNameUnicodeString + ".jpg";
        return  urlStr;
    }

    private static  void SendEvent(ReactContext reactContext, WritableMap params, String eventName){
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
