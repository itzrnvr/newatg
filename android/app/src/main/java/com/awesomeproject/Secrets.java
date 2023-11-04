package com.awesomeproject;

public class Secrets {
    static {
        System.loadLibrary("secrets-lib");
    }

    public static native String getAPIKey();
}