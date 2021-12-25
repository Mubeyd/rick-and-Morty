import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  View,
} from 'react-native'
import Episode from '../components/Episode'
import { backgroundColor } from '../constants/colors'
import { episodeApi } from '../constants/constants'
import { IEpisode } from '../interfaces/IEpisode'
import { IInfo } from '../interfaces/IInfo'

const MainScreen = () => {
  const { navigate } = useNavigation()

  const [isLoading, setLoading] = useState(true)
  const [api, setApi] = useState<string | null>(episodeApi)
  const [results, setResults] = useState<IEpisode[]>([])
  const [info, setInfo] = useState<IInfo>()

  const getMovies = async (_api: string) => {
    try {
      const response = await fetch(_api)
      const json = await response.json()
      setResults(json.results)
      setInfo(json.info)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onNext = useCallback(() => {
    setApi(info?.next as string)
  }, [info?.next, info?.prev])

  const onPrev = useCallback(() => {
    setApi(info?.prev as string)
  }, [info?.prev])

  useEffect(() => {
    if (api) {
      getMovies(api)
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

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
  },
  previousButton: {
    marginHorizontal: 12,
  },
  nextButton: {
    marginHorizontal: 12,
  },
})
