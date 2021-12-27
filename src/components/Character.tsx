import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { palette } from '../constants/colors'
import { screenHeight, screenWidth } from '../constants/sizes'
import { ICharacter } from '../interfaces/ICharacter'

interface Props {
  item: ICharacter
  onPress: (item: ICharacter) => void
}
const Character = (props: Props) => {
  const { item, onPress } = props

  const onPressCb = useCallback(() => {
    onPress(item)
  }, [item])

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPressCb}>
      <View>
        <Text style={styles.text}>{item.name}</Text>
        <Text>{item.species}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Character

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2.4,
    margin: 4,
    backgroundColor: '#EBEDF0',
    padding: 4,
    borderRadius: 4,
    height: screenHeight / 10,
  },
  text: {
    color: palette.text.secondary
  }
})
