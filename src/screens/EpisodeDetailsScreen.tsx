import { useRoute } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IEpisode } from '../interfaces/IEpisode'
import moment from "moment";

const EpisodeDetailsScreen = () => {
  const { params, name, key } = useRoute()

  const item = useMemo(() => params?.item as IEpisode, [])

  console.log('item :>> ', item)
  console.log('name :>> ', name)
  console.log('key :>> ', key)
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
        <Text style={styles.rowText}>{moment(item.created).format("MMM Do YY")}</Text>
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
