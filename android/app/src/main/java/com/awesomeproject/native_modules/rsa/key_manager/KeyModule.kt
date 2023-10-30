package com.awesomeproject.native_modules.rsa.key_manager

import android.security.keystore.KeyProperties
import android.util.Base64
import okio.IOException
import java.security.KeyFactory
import java.security.KeyPairGenerator
import java.security.SecureRandom
import java.security.spec.PKCS8EncodedKeySpec
import javax.crypto.Cipher

const val KEY_ALIAS = "myKeyAlias"

class KeyModule {

    fun generateKeyPair(): Pair<String, String> {
        val generator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA)

        generator.initialize(2048, SecureRandom())
        val keypair = generator.genKeyPair()
        val publicKey = Base64.encodeToString(keypair.public.encoded, Base64.DEFAULT)
        val privateKey = Base64.encodeToString(keypair.private.encoded, Base64.DEFAULT)
        return Pair(publicKey, privateKey)
    }


    fun decrypt(base64PrivateKey: String, base64EncryptedData: String): ByteArray? {
        // Decode the private key

        val keyBytes = Base64.decode(base64PrivateKey, Base64.DEFAULT)
        val spec = PKCS8EncodedKeySpec(keyBytes)
        val keyFactory = KeyFactory.getInstance(KeyProperties.KEY_ALGORITHM_RSA)
        val privateKey = keyFactory.generatePrivate(spec)

        // Decrypt the data
        val encryptedData = Base64.decode(base64EncryptedData, Base64.DEFAULT)
        val cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding")
        cipher.init(Cipher.DECRYPT_MODE, privateKey)
        val decryptedData = cipher.doFinal(encryptedData)

        return decryptedData
    }

}

interface KeyResponseCallback{
    fun onResponse(response: String)
    fun onFailure(error: IOException)
}
