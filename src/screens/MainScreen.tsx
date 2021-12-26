import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Divider from '../components/Divider'
import Episode from '../components/Episode'
import { backgroundColor } from '../constants/colors'
import { episodeApi } from '../constants/constants'
import { screenHeight } from '../constants/sizes'
import { IEpisode } from '../interfaces/IEpisode'
import { IInfo } from '../interfaces/IInfo'
import { getMoviesAsync } from '../services/getMovies'

const myIcon = <Icon name="rocket" size={30} color="#900" />

const MainScreen = () => {
  const { navigate } = useNavigation()

  const [isLoading, setLoading] = useState(true)
  const [api, setApi] = useState<string | null>(episodeApi)
  const [results, setResults] = useState<IEpisode[]>([])
  const [info, setInfo] = useState<IInfo>()

  const onNext = useCallback(() => {
    setLoading(true)
    setApi(info?.next as string)
  }, [info?.next, info?.prev])

  const onPrev = useCallback(() => {
    setLoading(true)
    setApi(info?.prev as string)
  }, [info?.prev])

  useEffect(() => {
    if (api) {
      getMoviesAsync({
        _api: api,
        fn: (json) => {
          setResults(json.results)
          setInfo(json.info)
        },
        loadingFn: () => setLoading(false),
      })
    }
  }, [api])

  const onPress = useCallback((item: IEpisode) => {
    navigate('EpisodeDetailsScreen' as never, { item: item })
  }, [])

  const keyExtractor = useCallback((item) => item.id, [])
  const renderItem = useCallback(
    ({ item }: { item: IEpisode }) => (
      <Episode key={item.name} episode={item} onPress={onPress} />
    ),
    [],
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Rick Morty Episodes List</Text>
        <Icon name="taxi" size={30} color="#900" />
      </View>

      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ height: screenHeight / 1.4 }}>
          <FlatList
            data={results}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      )}

      <Divider widthRatio={1} />

      <View style={styles.bottomView}>
        <View style={styles.previousButton}>
          <Button title="Previous" disabled={!info?.prev} onPress={onPrev} />
        </View>
        <View style={styles.nextButton}>
          <Button title="Next" disabled={!info?.next} onPress={onNext} />
        </View>
      </View>
    </View>
  )
}

export default React.memo(MainScreen)

const styles = StyleSheet.create({
  textStyle: {
    color: 'blue',
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 64,
    margin: 8,
    alignItems: 'baseline',
    position: 'absolute',
    bottom: 0,
  },
  previousButton: {
    marginHorizontal: 12,
  },
  nextButton: {
    marginHorizontal: 12,
  },
  headerView: {
    margin: 8,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
  },
  activityIndicator: {
    margin: 48,
  },
})
