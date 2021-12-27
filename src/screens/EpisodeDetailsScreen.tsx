import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Character from '../components/Character'
import { screenHeight } from '../constants/sizes'
import { ICharacter } from '../interfaces/ICharacter'
import { IEpisode } from '../interfaces/IEpisode'
import { getCharacters } from '../services/getCharacters'

const EpisodeDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const [isLoading, setLoading] = useState(true)
  const [charactersLoading, setCharactersLoading] = useState(true)
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const item = useMemo(() => params?.item as IEpisode, [params])

  const onPress = useCallback((item: ICharacter) => {
    // navigate('EpisodeDetailsScreen' as never, { item: item })
  }, [])

  const keyExtractor = useCallback((item: ICharacter) => item.id.toString(), [])
  const renderItem = useCallback(
    ({ item }: { item: ICharacter }) => {
      return <Character item={item} onPress={onPress} />
    },
    [onPress],
  )

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
          getCharacters(
            item.characters,
            (items) => {
              setCharacters(items)
              setCharactersLoading(false)
            },
            () => createTwoButtonAlert(),
          )
        },
      },
    ])

  useEffect(() => {
    if (!!item) {
      if (item.characters.length > 0) {
        getCharacters(
          item.characters,
          (items) => {
            setCharacters(items)
            setCharactersLoading(false)
          },
          () => createTwoButtonAlert(),
        )
      }

      setLoading(false)
    }
    ;() => {
      setCharacters([])
    }
  }, [item.characters])

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }
  console.log(
    'characters :>> ',
    characters.map((x) => x.name),
  )
  return (
    <View style={styles.container}>
      <View style={styles.detailsView}>
        <View style={styles.textView}>
          <Text style={styles.rowText}>Episode Number: </Text>
          <Text style={styles.rowText}>{item.id}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.rowText}>Episode Name: </Text>
          <Text style={styles.rowText}>{item.name}</Text>
        </View>

        <View style={styles.textView}>
          <Text style={styles.rowText}>Air Date: </Text>
          <Text style={styles.rowText}>
            {moment(item.air_date).format('MMM Do YY')}
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.rowText}>Created At: </Text>
          <Text style={styles.rowText}>
            {moment(item.created).format('MMM Do YY')}
          </Text>
        </View>
      </View>

      <View style={styles.charactersListView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Characters List</Text>
        </View>
        {charactersLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={characters}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
          />
        )}
      </View>
    </View>
  )
}

export default React.memo(EpisodeDetailsScreen)

const styles = StyleSheet.create({
  rowText: {
    color: '#000',
    fontSize: 14,
    margin: 4,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  detailsView: {
    backgroundColor: '#CCE4FF',
    margin: 6,
    borderRadius: 4,
    padding: 4,
  },
  headerText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  headerView: {
    marginVertical: 4,
  },
  charactersListView: {
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 1.42,
  },
})
