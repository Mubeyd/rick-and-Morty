import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen'
import MainScreen from '../screens/MainScreen'

const RootStack = createNativeStackNavigator()

const RootStackScreen = (navigation: any) => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="MainScreen">
      <RootStack.Screen
        name="EpisodeDetailsScreen"
        component={EpisodeDetailsScreen}
        options={{ title: 'Episode details screen', headerShown: true }}
      />

      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: 'Main Screen', headerShown: true }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default RootStackScreen
