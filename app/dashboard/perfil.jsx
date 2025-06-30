import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useTheme } from '../../context/theme-context';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function Perfil() {
    const { usuario } = useLocalSearchParams();
    const [imagen, setImagen] = useState(null);
    const {modoOscuro} = useTheme();

    const elegirFoto = async () =>{
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality: 1,
        });

        if (!resultado.canceled){
            setImagen(resultado.assets[0].uri);
        }
    };

    return(
        <View style={[styles.container, modoOscuro ? styles.oscuro : styles.claro]}>
            <Image source={{uri: imagen}} style = {styles.avatar}/>
            <Text style={[styles.username, modoOscuro ? styles.textoOscuro : styles.textoClaro]}>@{usuario}</Text>
            <View style = {styles.boton}>
            <Button title= "Cambiar foto" onPress={elegirFoto} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
        padding: 20,
    },
    avatar:{
        width: 300,
        height: 300,
        borderRadius: 200,
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    boton:{
        marginTop: 20,
    },
    claro: {backgroundColor:'white'},
    oscuro: {backgroundColor: '#121212'},
    textoClaro: {color:'black', fontSize: 20},
    textoOscuro: {color: 'white', fontSize: 20},
});