import React from 'react';
import { View } from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <View>
      <MainScreen />
    </View>
  );
};

export default React.memo(App);
