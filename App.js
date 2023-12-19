import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screem/Login";
import PageMain from "./Screem/PageMain";
import PagesMainDetails from "./Screem/PagesMainDetails";
import AñadirUsuarios from "./Screem/AñadirUsuarios";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio de Seccion"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PaginaPrincipal"
          component={PageMain}
          options={{
            headerStyle: {
              backgroundColor: "green", // Fondo verde
            },
            headerTintColor: "white", // Texto blanco
          }}
        />

        <Stack.Screen name="PaginaDeDetalles" component={PagesMainDetails} />
        <Stack.Screen name="AñadirUsuarios" component={AñadirUsuarios} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    color: "yellow",
    margin: 50,
    padding: 20,
  },
});
