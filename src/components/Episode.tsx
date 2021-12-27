import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { palette } from '../constants/colors'
import { screenWidth } from '../constants/sizes'
import { IEpisode } from '../interfaces/IEpisode'

interface Props {
  episode: IEpisode
  onPress: (item: IEpisode) => void
}

const Episode = (props: Props) => {
  const { episode, onPress } = props

  const onPressCb = useCallback(() => {
    onPress(episode)
  }, [])

  return (
    <TouchableOpacity
      onPress={onPressCb}
      style={styles.container}
      activeOpacity={0.6}>
      <View style={styles.leftSideView}>
        <Text style={styles.episodeId}>{episode.id}</Text>
        <MaterialCommunityIcons name="movie-filter" size={12} />
      </View>
      <View>
        <Text style={styles.name}>{episode.name}</Text>
        <Text style={styles.air_date}>{episode.air_date}</Text>
        <Text style={styles.air_date}>{episode.episode}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(Episode)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth / 1.2,
    backgroundColor: palette.primary.subtle,
    borderRadius: 4,
    marginVertical: 4,
    alignItems: 'center',
    elevation: 2,
  },
  name: {
    fontSize: 14,
    margin: 2,
    color: palette.text.primary,
  },
  episodeId: {
    fontSize: 14,
    // margin: 2,
    color: palette.text.primary,
  },
  air_date: {
    fontSize: 14,
    margin: 2,
  },
  leftSideView: {
    margin: 6,
  },
})
