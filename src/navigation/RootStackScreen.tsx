import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { palette } from '../constants/colors'
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen'
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
          headerTitleStyle: {color: palette.text.secondary},
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <MaterialCommunityIcons
                name="movie-filter"
                size={26}
                color={palette.primary.light}
              />
            </View>
          ),
        }}
      />
      <RootStack.Screen
        name="CharacterDetailsScreen"
        component={CharacterDetailsScreen}
        options={{
          title: 'Character details screen',
          headerTitleStyle: {color: palette.text.secondary},
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Fontisto name="person" size={26} color={palette.primary.light} />
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

export default React.memo(RootStackScreen)
