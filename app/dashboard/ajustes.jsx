import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../context/theme-context';

export default function Ajustes() {
    const { modoOscuro, toggleTema } = useTheme();

    return(
        <View style={[styles.container, modoOscuro ? styles.oscuro : styles.claro]}>
            <Text style={modoOscuro ? styles.textoOscuro : styles.textoClaro}>
                Modo {modoOscuro ? 'Oscuro' : 'Claro'}
            </Text>
        <Switch value={modoOscuro} onValueChange={toggleTema}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex:1, justifyContent:'center', alignItems:'center'},
    claro: {backgroundColor:'white'},
    oscuro: {backgroundColor: '#121212'},
    textoClaro: {color:'black', fontSize: 20},
    textoOscuro: {color: 'white', fontSize: 20},
})