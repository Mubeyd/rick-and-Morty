import { useRoute } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ICharacter } from '../interfaces/ICharacter'

const CharacterDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const character = useMemo(() => params?.item as ICharacter, [params])

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{character.name}</Text>
      <View style={styles.imageView}>
        <Image style={styles.image} source={{ uri: character.image }} />
      </View>

      <View style={styles.textView}>
        <Text style={styles.rowText}>Status: </Text>
        <Text style={styles.rowText}>{character.status}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.rowText}>Gender: </Text>
        <Text style={styles.rowText}>{character.gender}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.rowText}>Species: </Text>
        <Text style={styles.rowText}>{character.species}</Text>
      </View>
    </View>
  )
}

export default React.memo(CharacterDetailsScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    aspectRatio: 1.33,
    width: undefined,
    height: 164,
    alignSelf: 'stretch',
    borderRadius: 8,
  },
  imageView: {
    height: 164,
    margin: 24,
    alignSelf: 'center',
  },
  characterName: {
    fontSize: 18,
    margin: 8,
    fontWeight: 'bold',
    color: '#00244D',
    textAlign: 'center',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: '#000',
    fontSize: 14,
    margin: 4,
  },
})
