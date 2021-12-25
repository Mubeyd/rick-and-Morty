import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { screenWidth } from '../constants/sizes'
import { IEpisode } from '../interfaces/IEpisode'

interface Props {
  episode: IEpisode
  onPress: (item: IEpisode) => void
}

const Episode = (props: Props) => {
  const { episode, onPress } = props

  const onPressCb = useCallback(
    () => {
      onPress(episode)
      
    },
    [],
  )

  return (
    <TouchableOpacity
      onPress={onPressCb}
      style={styles.container}
      activeOpacity={0.6}>
      <Text style={styles.name}>{episode.name}</Text>
      <Text style={styles.air_date}>{episode.air_date}</Text>
      <Text style={styles.air_date}>{episode.episode}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(Episode)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: screenWidth / 1.2,
    backgroundColor: '#ADD3FF',
    borderRadius: 4,
    marginVertical: 4,
  },
  name: {
    fontSize: 14,
    margin: 2,
    color: '#363738'
  },
  air_date: {
    fontSize: 14,
    margin: 2,
  },
})
