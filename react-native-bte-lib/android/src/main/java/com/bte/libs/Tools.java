package com.bte.libs;

import android.content.Context;
import android.os.Message;
import android.provider.Settings;

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

    public static void synchronousPlaybackInformation(final ReactContext reactContext) {
        new Thread(new Runnable() {
            public void run() {
                while (true) {
                    if(Global.isWifiConnected){
                        Socket socket = null;
                        OutputStream writes = null;
                        try {
                            socket = new Socket();
                            SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                            socket.connect(socketAddress, 3000);
                            writes = socket.getOutputStream();
                            byte[] buff = new byte[2048];
                            buff[3] = 0x26;
                            writes.write(buff);
                            writes.flush();

                            InputStream inputStream = socket.getInputStream();// ������������������socket��������
                            byte[] bytes = new byte[1024];
                            inputStream.read(bytes);
                            boolean isChanged = false;
                            if (Global.isPlaying != ((int) bytes[100] == 1 ? 0 : 1)) {
                                Global.isPlaying = (int) bytes[100] == 1 ? 0 : 1;
                                isChanged = true;
                            }
                            if (Global.isMute != ((int) bytes[101] == 1 ? 0 : 1)) {
                                Global.isMute = ((int) bytes[101] == 1 ? 0 : 1);
                                isChanged = true;
                            }
                            if (Global.isOriginal != ((int) bytes[102] == 1 ? 0 : 1)) {
                                Global.isOriginal = (int) bytes[102] == 1 ? 0 : 1;
                                isChanged = true;
                            }
                            if (Global.volume != (int) bytes[103]) {
                                Global.volume = (int) bytes[103];
                                isChanged = true;
                            }

                            if(isChanged){
                                WritableMap params = Arguments.createMap();
                                params.putInt("play", Global.isPlaying);
                                params.putInt("mute", Global.isMute);
                                params.putInt("original", Global.isOriginal);
                                params.putInt("volume", Global.volume);
                                SendEvent(reactContext, params, "PlaybackInfoUpdate");
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

    public static void synchronousPlaybackQueue(final ReactContext reactContext) {
        new Thread(new Runnable() {
            public void run() {
                Boolean isFirst = true;
                while (true) {
                    if(Global.isWifiConnected) {
                        Socket socket = null;
                        OutputStream writes = null;
                        Boolean flag = false;
                        //                    while(Constants.HOST_IP.length()<5)
                        //                    {
                        //                        try {
                        //                            Thread.sleep(1000);
                        //                        } catch (InterruptedException e) {
                        //                            // TODO Auto-generated catch block
                        //                            e.printStackTrace();
                        //                        }
                        //                    }

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
                                flag = true;
                            } else {
                                for (int i = 0; i < songIdQueueArray.length - 1; i++) {
                                    if (!Global.playQueue.get(i).equals(songIdQueueArray[i])) {
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                            if (flag) {
                                Global.playQueue.clear();
                                for (int j = 0; j < songIdQueueArray.length - 1; j++) {
                                    Global.playQueue.add(songIdQueueArray[j]);
                                    queue.pushString(songIdQueueArray[j]);
                                }

                                WritableMap params = Arguments.createMap();
                                params.putArray("queue", queue);
                                SendEvent(reactContext, params, "SongQueueChange");
                            }

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
                    Global.isWifiConnected = true;
                } catch (Exception e) {
                    WritableMap params = Arguments.createMap();
                    params.putBoolean("isConnected",false);
                    SendEvent(reactContext,params,"ConnectToBox");
                    Global.isWifiConnected = false;
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

    public static void sendRequestControlBox(final int b) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, Constants.TIME_OUT);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte)b;
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                    //ToastUtils.showInThread(context, "Can ket noi wifi");
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    // ToastUtils.showInThread(context,
                    // context.getString(R.string.finish_send_request_to_box));
                }
            }
        }).start();
    }

    public static void sendRequestControlBox(final int b, final int state) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, Constants.TIME_OUT);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte)b;
                    buff[4] = (byte)state;
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public static void sendRequestControlBox(final int b, final int state, final int value) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, Constants.TIME_OUT);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte)b;
                    buff[4] = (byte)state;
                    buff[5] = (byte)value;
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    public static void playNow(final String songId) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, 3000);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte) 152;
                    System.arraycopy(songId.getBytes(), 0, buff, 4, songId.getBytes().length);
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                    // threadAlert("���������⣬������ָ����wifi!");
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                Socket socket2 = null;
                OutputStream writes2 = null;
                try {
                    socket2 = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket2.connect(socketAddress, 3000);
                    writes2 = socket2.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte) 139;
                    writes2.write(buff);
                    writes2.flush();
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    // threadAlert("���������⣬������ָ����wifi!");
                } finally {
                    try {
                        socket2.close();
                        writes2.close();
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    // threadAlert("����ɹ�");
                }
            }
        }).start();
    }

    public static void addSongToEndOfList(final String songId) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                Boolean flag = false;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, 3000);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    if (Global.playQueue.contains(songId)) {
                        buff[3] = (byte) 151;
                        flag = true;
                    } else {
                        buff[3] = (byte) 150;
                        flag = false;
                    }
                    System.arraycopy(songId.getBytes(), 0, buff, 4, songId.getBytes().length);
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    // threadAlert("���������⣬������ָ����wifi!");
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    if (flag) {
                        //XLog.d("-------------------------> add song success");
                        // threadAlert("��ȡ��");
                    } else {
                        //XLog.d("-------------------------> add song fail");
                        // threadAlert("�ѵ㲥");
                    }
                }
            }
        }).start();
    }

    public static void priority(final String songId) {
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, Constants.TIME_OUT);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte) 152;
                    System.arraycopy(songId.getBytes(), 0, buff, 4, songId.getBytes().length);
                    writes.write(buff);
                    writes.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                    // threadAlert("���������⣬������ָ����wifi!");
                } finally {
                    try {
                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    // threadAlert("������");
                }
            }
        }).start();
    }

    public static void getServerIp() {
        new Thread(new Runnable() {
            public void run() {
                // while (Global.isAppRunning) {
                Socket socket = null;
                OutputStream writes = null;
                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, Constants.TIME_OUT);
                    writes = socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = 0x28;
                    writes.write(buff);
                    writes.flush();

                    InputStream inputStream = socket.getInputStream();// ������������������socket��������
                    byte[] bytes = new byte[1024];
                    inputStream.read(bytes);

                    byte[] serverIpByte = new byte[1020];
                    System.arraycopy(bytes, 4, serverIpByte, 0, 1020);
                    String serverIpString = new String(serverIpByte);

                    if (serverIpString.trim().equals("192.168.1.1")) {
                        Socket socket2 = null;
                        try {
                            socket = new Socket();
                            SocketAddress socketAddress2 = new InetSocketAddress(serverIpString, Constants.HOST_PORT);
                            socket2.connect(socketAddress, 3000);

                            Global.serverIp = serverIpString.trim();
                        } catch (Exception e) {
                            e.printStackTrace();

                            Global.serverIp = "0";
                        } finally {
                            try {
                                socket2.close();
                            } catch (Exception e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                            }
                        }
                    } else {
                        Global.serverIp = serverIpString.trim();
                    }
                    //XLog.d("----------------------> get server id =" + Global.serverIp);
                    // break;

                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    // e.printStackTrace();
                    //XLog.e(" get server id error :" + e.getMessage());
                    // alert("���ڲ���ʹ�ã�������ָ����wifi!");
                } finally {
                    try {
                        socket.close();
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            // }
        }).start();
    }

    public static void stbset(final int cmd,final String url){
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                int returnflag=1;

                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, 3000);
                    writes= socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte)cmd;
                    System.arraycopy(url.getBytes(), 0, buff, 4, url.getBytes().length);
                    writes.write(buff);
                    writes.flush();
                    //XLog.e("-----------------> stbset= cmd:" + cmd+",url: "+url);
                    InputStream inputStream = socket.getInputStream();
                    byte[] bytes = new byte[1024];
                    inputStream.read(bytes);
                    byte[] queue = new byte[1020];
                    System.arraycopy(bytes,4,queue,0,1020);
                    String queueString = new String(queue);
                    String[] array = queueString.split(",");
                    for(int i=0; i<array.length; i++){
                        if (array[i].indexOf("setreturn=") != -1) {
                            returnflag = Integer.parseInt(array[i].substring("setreturn=".length()));
                        }
                    }

                }catch (Exception e) {
                    returnflag = -1;
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }finally{

                    try {
//                        if(listener != null)
//                        {
//                            XLog.e("-----------------> stbset= returnflag:" +returnflag);
//                            if(returnflag != -1)
//                            {
//                                listener.onResponse(0);
//                            }
//                            else
//                            {
//                                listener.onResponse(1);
//                            }
//                        }

                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
                //SetStbReturnTips(returnflag);
            }
        }).start();
    }

    public static void stbset1(final int cmd,final String url){
        new Thread(new Runnable() {
            public void run() {
                Socket socket = null;
                OutputStream writes = null;
                int returnflag= -1;

                try {
                    socket = new Socket();
                    SocketAddress socketAddress = new InetSocketAddress(Constants.HOST_IP, Constants.HOST_PORT);
                    socket.connect(socketAddress, 3000);
                    writes= socket.getOutputStream();
                    byte[] buff = new byte[2048];
                    buff[3] = (byte)cmd;
                    System.arraycopy(url.getBytes(), 0, buff, 4, url.getBytes().length);
                    writes.write(buff);
                    writes.flush();
                    //XLog.e("-----------------> stbset= cmd:" + cmd+",url: "+url);
                    InputStream inputStream = socket.getInputStream();
                    byte[] bytes = new byte[1024];
                    inputStream.read(bytes);
                    byte[] queue = new byte[1020];
                    System.arraycopy(bytes,4,queue,0,1020);
                    String queueString = new String(queue);
                    String[] array = queueString.split(",");
                    for(int i=0; i<array.length; i++){
                        if (array[i].indexOf("setreturn=") != -1) {
                            returnflag = Integer.parseInt(array[i].substring("setreturn=".length()));
                        }
                    }

                }catch (Exception e) {
                    returnflag = -1;
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }finally{

                    try {
//                        if(listener != null)
//                        {
//                            XLog.e("-----------------> stbset= returnflag:" +returnflag);
//                            listener.onResponse(returnflag);
//                        }

                        socket.close();
                        writes.close();
                    } catch (Exception e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
                //SetStbReturnTips(returnflag);
            }
        }).start();
    }

    private static String encode(String str) {
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
