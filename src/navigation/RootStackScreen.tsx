import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EpisodeDetailsScreen from '../screens/EpisodeDetailsScreen'
import MainScreen from '../screens/MainScreen'

const RootStack = createNativeStackNavigator()

const RootStackScreen = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="MainScreen">
      <RootStack.Screen
        name="EpisodeDetailsScreen"
        component={EpisodeDetailsScreen}
        options={{
          title: 'Episode details screen',
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
             <MaterialCommunityIcons name="movie-filter" size={28} />
            </View>
          ),
        }}
      />

      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: 'Main Screen', headerShown: false }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default RootStackScreen
