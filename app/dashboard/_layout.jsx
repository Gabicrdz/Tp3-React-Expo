import { Tabs } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function DashboardLayout(){
    const { usuario } = useLocalSearchParams();
    return(
        <Tabs>
            <Tabs.Screen name="inicio" options={{title: 'Inicio'}} initialParams={{usuario}}/>
            <Tabs.Screen name="perfil" options={{title: 'Perfil'}} initialParams={{usuario}}/>
            <Tabs.Screen name="ajustes" options={{title: 'Ajustes'}} initialParams={{usuario}}/>
        </Tabs>
    )
}