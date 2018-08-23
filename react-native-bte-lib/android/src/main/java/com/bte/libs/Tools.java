package com.bte.libs;

import android.os.Message;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

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

}
