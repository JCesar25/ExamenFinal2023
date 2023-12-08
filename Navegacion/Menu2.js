import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const UserListWithTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Cerrar Sesión') {
              iconName = focused ? 'log-out-outline' : 'log-out-sharp';
            } else if (route.name === 'Añadir Tarjetas') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-sharp';
            } else if (route.name === 'Detalles') {
              iconName = focused ? 'information-circle-outline' : 'information-circle-sharp';
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Cerrar Sesión" component={() => <Text>Cerrar Sesión</Text>} />
        <Tab.Screen name="Añadir Tarjetas" component={() => <Text>Añadir Tarjetas</Text>} />
        <Tab.Screen name="Detalles" component={() => <Text>Detalles</Text>} />
      </Tab.Navigator>
    );
  };
  export default UserListWithTabs;