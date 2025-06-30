import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/theme-context';

export default function Inicio() {
    const { usuario } = useLocalSearchParams();
    const {modoOscuro} = useTheme();

    return(
        <View style={[styles.container, modoOscuro ? styles.oscuro : styles.claro]}>
            <Text style={[modoOscuro ? styles.textoOscuro : styles.textoClaro]}>¡Bienvenido <strong>@{usuario}</strong>!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
    },
    claro: {backgroundColor:'white'},
    oscuro: {backgroundColor: '#121212'},
    textoClaro: {color:'black', fontSize: 50},
    textoOscuro: {color: 'white', fontSize: 50},
})