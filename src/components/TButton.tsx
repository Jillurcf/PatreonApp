import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'

import React from 'react'
import tw from '../lib/tailwind'


interface IButton {

    containerStyle ?: {},
    titleStyle ?: {},
    title ?: string,
    isLoading ?: boolean,
    onPress ?: () => void
}


const TButton = ({containerStyle,title,titleStyle,isLoading,onPress} :IButton) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading} activeOpacity={.5} style={[tw`bg-[#003CFF] py-4 px-3 flex-row justify-center gap-3 rounded-2xl shadow-md w-36`,containerStyle]}>
      {
        isLoading && <ActivityIndicator />
      }
    {
        title &&    <Text style={[tw`text-white font-semibold`,titleStyle]}>{title}</Text>
    }
 
  </TouchableOpacity>
  )
}

export default TButton

const styles = StyleSheet.create({})