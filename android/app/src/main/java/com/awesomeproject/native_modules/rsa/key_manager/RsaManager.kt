package com.awesomeproject.native_modules.rsa.key_manager

import android.util.Log
import com.awesomeproject.Secrets
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class RsaManager(reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    private val keyModule: KeyModule = KeyModule()

    override fun getName(): String {
        Log.d("getApiKeySecret", Secrets.getAPIKey())
        return "RsaManager"
    }

    @ReactMethod
    fun generateKeyPair(promise: Promise) {
        val generatedPair = keyModule.generateKeyPair()
        val publicKey = generatedPair.first
        val privateKey = generatedPair.second

        // Your processing here

        val returnedData = Arguments.createMap()

        // Assuming you have some data to return

        // If you have data to add to the map
        returnedData.putString("publicKey", publicKey)
        returnedData.putString("privateKey", privateKey)

        // This sends data back to React Native
        promise.resolve(returnedData)
    }

    @ReactMethod
    fun decryptData(privateKey: String, data: String, promise: Promise){
        val decryptedData = keyModule.decrypt(privateKey, data)


        val returnedData = Arguments.createMap()

        returnedData.putString("decryptedData", decryptedData.toString())

        // This sends data back to React Native
        promise.resolve(returnedData)
    }

    @ReactMethod
    fun getApiKey(promise: Promise){
        Log.d("getApiKeySecret",Secrets.getAPIKey())
        promise.resolve(Secrets.getAPIKey());
    }

}
