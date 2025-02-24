import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'

type Props = {}

const MessageScreen = (props: Props) => {
  return (
    <View style={tw`flex-1 bg-black`}>
      <Text style={tw`text-white`}>MessageScreen</Text>
           <StatusBar backgroundColor="black" translucent />
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})