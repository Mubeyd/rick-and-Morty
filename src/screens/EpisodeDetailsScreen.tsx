import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { IEpisode } from '../interfaces/IEpisode'

const EpisodeDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const [isLoading, setLoading] = useState(true)

  const item = useMemo(() => params?.item as IEpisode, [params])

  console.log('item :>> ', item)
  console.log('name :>> ', name)
  console.log('key :>> ', key)

  const data = useMemo(() => item.characters, [item.characters])
  const onPress = useCallback((item: any) => {
    // navigate('EpisodeDetailsScreen' as never, { item: item })
  }, [])

  const keyExtractor = useCallback((item) => item, [])
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View>
        <Text>{item}</Text>
      </View>
    ),
    [onPress],
  )

  useEffect(() => {
    if (!!item) {
      setLoading(false)
    }
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }
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

      <View>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
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
})
