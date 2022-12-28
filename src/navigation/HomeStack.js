import { createStackNavigator } from "@react-navigation/stack";
import {Info} from "../screens/Info";
import {Home} from "../screens/Home";
import { Resources } from "../screens/Resources";

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        children={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="financial"
        component={() => Info({category: "financial"})}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="physical"
        component={() => Info({category: "physical"})}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="neglect"
        component={() => Info({category: "neglect"})}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="resources"
        component={Resources}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
