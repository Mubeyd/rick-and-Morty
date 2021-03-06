import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { palette } from '../constants/colors'
import { screenHeight, screenWidth } from '../constants/sizes'
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
        <Text style={styles.text}>{item.id} - </Text>
        <Text style={styles.text}>{item.name}</Text>
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.characterName}>{character.name}</Text>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: character.image }} />
        </View>

        <View style={styles.textView}>
          <Text style={styles.rowText}>Status: </Text>
          <Text style={styles.rowText}>{character.status}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.rowText}>Species: </Text>
          <Text style={styles.rowText}>{character.species}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.rowText}>Gender: </Text>
          <Text style={styles.rowText}>{character.gender}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.rowText}>Type: </Text>
          <Text style={styles.rowText}>
            {character.type.trim() !== '' ? character.type : '...'}
          </Text>
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
              nestedScrollEnabled
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    margin: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: palette.secondary.subtle,
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
    maxHeight: screenHeight / 2.68,
    minHeight: 48,
    width: screenWidth / 1.6,
    backgroundColor: palette.background,
    alignSelf: 'center',
    borderRadius: 4,
  },
  text: {
    color: palette.text.secondary
  }
})
