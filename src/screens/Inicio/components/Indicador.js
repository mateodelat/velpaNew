import { Animated, View } from "react-native"
import React from 'react'


export default ({ scrollX, width, data }) => {
    return <View
        style={{
            position: 'absolute',
            bottom: 10,
            flexDirection: 'row',
            borderRadius: 10,
        }}
    >
        {data?.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 0.8, 0.4],
                extrapolate: 'clamp'
            })

            return <Animated.View
                key={'inidicator-' + i}
                style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    margin: 5,
                    opacity,
                }}>
            </Animated.View>
        })}
    </View>
}