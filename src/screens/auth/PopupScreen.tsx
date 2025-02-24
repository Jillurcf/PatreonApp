import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from '../../lib/tailwind';

type Props = {};

const PopupScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Drawer');
    }, 1000);
    return () => clearTimeout(timer)
  }, [navigation]);
  return (
    <View style={tw`flex-1 bg-black items-center justify-center`}>
      <Image source={require('../../assets/images/AccountCreatedImg.png')} />
      <Text style={tw`text-primary text-xl font-AvenirLTProBlack mt-6`}>
        Account Created!
      </Text>
      <Text
        style={tw`text-primary text-center px-[5%] font-AvenirLTProBlack mt-2`}>
        Your account has been successfully created. You will be redirected to
        the homepage in a moment.
      </Text>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default PopupScreen;

const styles = StyleSheet.create({});
