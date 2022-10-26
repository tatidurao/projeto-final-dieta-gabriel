import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
//////import StoryScreen from "../screens/StoryScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName="Home"
                     screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tela Inicial" component={TabNavigator}/>
  
    </Stack.Navigator>
  )
}

export default StackNavigator;
