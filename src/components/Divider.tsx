import React from 'react'
import { StyleSheet, View } from 'react-native'
import { screenWidth } from '../constants/sizes'

interface Props {
    widthRatio: number
}

const Divider = ({ widthRatio }: Props) => {
    return <View style={[styles.divider, { width: screenWidth * widthRatio}]} />
}

export default React.memo(Divider)

const styles = StyleSheet.create({
    divider: {
        alignSelf: 'center',
        borderColor: '#E5E3E6',
        borderWidth: 1,
        height: 1,
    },
})
