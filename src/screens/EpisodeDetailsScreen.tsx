import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { IEpisode } from '../interfaces/IEpisode'

const EpisodeDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const [isLoading, setLoading] = useState(true)

  const item = useMemo(() => params?.item as IEpisode, [])

  console.log('item :>> ', item)
  console.log('name :>> ', name)
  console.log('key :>> ', key)

  useEffect(() => {
    if (!!item) {
      setLoading(false)
    }
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }
  return (
    <View>
      <View style={styles.textView}>
        <Text style={styles.rowText}>Episode Number: </Text>
        <Text style={styles.rowText}>{item.id}</Text>
      </View>

      <View style={styles.textView}>
        <Text style={styles.rowText}>Episode Name: </Text>
        <Text style={styles.rowText}>{item.name}</Text>
      </View>

      <View style={styles.textView}>
        <Text style={styles.rowText}>CreatedAt: </Text>
        <Text style={styles.rowText}>
          {moment(item.created).format('MMM Do YY')}
        </Text>
      </View>
    </View>
  )
}

export default React.memo(EpisodeDetailsScreen)

const styles = StyleSheet.create({
  rowText: {
    color: '#000',
    fontSize: 14,
  },
  textView: {
    flexDirection: 'row',
  },
})
