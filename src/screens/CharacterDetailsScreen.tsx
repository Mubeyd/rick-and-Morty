import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { palette } from '../constants/colors'
import { screenHeight } from '../constants/sizes'
import { ICharacter } from '../interfaces/ICharacter'
import { IEpisode } from '../interfaces/IEpisode'
import { getEpisodes } from '../services/getEpisodes'

const CharacterDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const [isLoading, setLoading] = useState(true)
  const [episodesLoading, setEpisodesLoading] = useState(true)
  const [episodes, setEpisodes] = useState<IEpisode[]>([])

  const character = useMemo(() => params?.item as ICharacter, [params])

  const keyExtractor = useCallback((item: IEpisode) => item.id.toString(), [])
  const renderItem = useCallback(({ item }: { item: IEpisode }) => {
    return (
      <View style={{ margin: 4, flexDirection: 'row' }}>
        <Text>{item.id} - </Text>
        <Text>{item.name}</Text>
      </View>
    )
  }, [])

  const createTwoButtonAlert = () =>
    Alert.alert('Error', 'Network failed', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Refresh',
        onPress: () => {
          getEpisodes(
            character.episode,
            (items) => {
              setEpisodes(items)
              setEpisodesLoading(false)
            },
            () => createTwoButtonAlert(),
          )
        },
      },
    ])

  useEffect(() => {
    if (!!character) {
      if (character.episode.length > 0) {
        getEpisodes(
          character.episode,
          (items) => {
            setEpisodes(items)
            setEpisodesLoading(false)
          },
          () => createTwoButtonAlert(),
        )
      }

      setLoading(false)
    }
    ;() => {
      setEpisodes([])
    }
  }, [character.episode])

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

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

      <Text style={styles.flatListTitle}>Episodes Appeared</Text>

      {episodesLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.flatListView}>
          <FlatList
            data={episodes}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={1}
          />
        </View>
      )}
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
    color: palette.text.primary,
    textAlign: 'center',
  },
  flatListTitle: {
    fontSize: 16,
    margin: 8,
    fontWeight: '600',
    color: palette.text.primary,
    textAlign: 'center',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: palette.text.secondary,
    fontSize: 14,
    margin: 4,
    marginHorizontal: 8,
  },
  flatListView: {
    alignItems: 'center',
    height: screenHeight / 2.68,
  },
})
