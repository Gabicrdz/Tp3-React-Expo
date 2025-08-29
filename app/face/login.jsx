import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function FaceLogin() {
  const router = useRouter();
  const { usuario = 'Invitado' } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [processing, setProcessing] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>Necesitamos permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const simpleFingerprint = (base64) => {
    let sum = 0;
    for (let i = 0; i < base64.length; i += 10) sum += base64.charCodeAt(i);
    return sum;
  };

  const verify = async () => {
    if (!cameraRef.current) return;
    setProcessing(true);
    try {
      const stored = await AsyncStorage.getItem('@face_template');
      if (!stored) {
        Alert.alert('Sin registro', 'Primero registra tu rostro.');
        return;
      }
      const { fp: fpStored, len: lenStored } = JSON.parse(stored);

      const photo = await cameraRef.current.takePictureAsync({ quality: 0.3 });
      const mini = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 96 } }],
        { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      const fpNow = simpleFingerprint(mini.base64 ?? '');
      const score = 1 - Math.min(1, Math.abs(fpNow - fpStored) / Math.max(1, lenStored)); // similitud 0..1
      const PASA = score >= 0.88; // umbral ajustable para la demo

      if (PASA) {
        Alert.alert('Éxito', 'Autenticación facial simulada ✅');
        router.replace({ pathname: '/dashboard/', params: { usuario } });
      } else {
        Alert.alert('No coincide', 'Vuelve a intentarlo (iluminación y encuadre ayudan).');
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo verificar.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} facing="front" style={{ flex: 1 }} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={verify} disabled={processing}>
          {processing ? <ActivityIndicator /> : <Text style={styles.btnText}>Verificar rostro</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center:{ flex:1, justifyContent:'center', alignItems:'center', padding:24 },
  msg:{ textAlign:'center', marginBottom:12 },
  footer:{ position:'absolute', bottom:48, width:'100%', paddingHorizontal:24 },
  btn:{ backgroundColor:'#111', padding:16, borderRadius:12, alignItems:'center' },
  btnText:{ color:'#fff', fontWeight:'bold' }
});
