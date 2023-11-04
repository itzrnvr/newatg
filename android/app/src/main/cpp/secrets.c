#include <jni.h>

JNIEXPORT jstring JNICALL
Java_com_awesomeproject_Secrets_getAPIKey(JNIEnv *env, jclass clazz) {
    return (*env)->  NewStringUTF(env, "fTx$h6LTV&76ZBJvR!^de");
}