import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Searchbar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Divider from '../components/Divider'
import Episode from '../components/Episode'
import { backgroundColor, palette } from '../constants/colors'
import { episodeApi } from '../constants/constants'
import { screenHeight, screenWidth } from '../constants/sizes'
import { IEpisode } from '../interfaces/IEpisode'
import { IInfo } from '../interfaces/IInfo'
import { getMoviesAsync } from '../services/getMovies'

const MainScreen = () => {
  const { navigate } = useNavigation()

  const [isLoading, setLoading] = useState(true)
  const [api, setApi] = useState<string | null>(episodeApi)
  const [results, setResults] = useState<IEpisode[]>([])
  const [info, setInfo] = useState<IInfo>()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const onChangeSearch = useCallback((val: string) => {
    setSearchQuery(val)
  }, [])

  const data = useMemo(
    () =>
      searchQuery.trim() !== ''
        ? results.filter((x) =>
            x.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : results,
    [searchQuery, results],
  )

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
    [onPress],
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerTitleView}>
          <MaterialIcons
            name="science"
            size={18}
            color={palette.text.primary}
          />
          <Text style={styles.headerText}>Rick Morty Episodes List</Text>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ marginVertical: 8, width: screenWidth / 1.6 }}
        />
      </View>

      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.flatListView}>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      )}

      <Divider widthRatio={1} />

      <View style={styles.bottomView}>
        <View style={styles.previousButton}>
          <Button
            title="Previous"
            disabled={!info?.prev}
            onPress={onPrev}
            color={palette.primary.main}
          />
        </View>
        <View style={styles.nextButton}>
          <Button
            title="Next"
            disabled={!info?.next}
            onPress={onNext}
            color={palette.primary.main}
          />
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
    position: 'relative',
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
    color: palette.text.primary,
    margin: 4,
    textAlign: 'center',
  },
  activityIndicator: {
    height: screenHeight / 1.4,
  },
  flatListView: {
    height: screenHeight / 1.4,
    position: 'relative',
  },
  headerTitleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
