import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Login(){
    const router = useRouter();
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const ingresar = () =>{
        router.push({
            pathname: '/dashboard/',
            params: {usuario},
        });
    };

    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput placeholder='Usuario' value = {usuario} onChangeText={setUsuario} style={styles.input} />
            <TextInput placeholder='Contraseña' value={clave} onChangeText={setClave} secureTextEntry style={styles.input}/>
            <Button title="Ingresar" onPress={ingresar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding:20},
    title: {fontSize: 24, marginBottom: 20, textAlign: 'center'},
    input: {borderWidth: 1, borderColor: '#ccc', padding:10, marginBottom: 10},
});