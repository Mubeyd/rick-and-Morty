import { useKeepAwake } from 'expo-keep-awake';
import React from 'react'
import RootStackScreen from './src/navigation/RootStackScreen'

const App = () => {
  useKeepAwake();
  return <RootStackScreen />
}

export default React.memo(App)
