import {ActivityIndicator, InteractionManager, StatusBar, StyleSheet, View} from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
// import {NavigProps} from '../../interfaces/NaviProps';
// import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
// import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';
// import { router, useRouter } from 'expo-router';

import { lStorage } from '../utils';
import { usePostCheckTokenMutation } from '../redux/apiSlice/authSlice';
import { useNavigation } from '@react-navigation/native';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = () => {
    const navigation = useNavigation()
 
  const [postCheckToken, { data, error, isLoading }] = usePostCheckTokenMutation()
 const token = lStorage.getString("token");

 
//  const router = useRouter();

useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      if (!token) {
        navigation.replace('Onboarding1');
        return;
      }
  
      try {
        const res = await postCheckToken(token);
        console.log(res?.data?.success, 'res after sending');
  
        if (res?.data?.success === true) {
          navigation.replace('Drawer');
        } else {
          navigation.replace('Onboarding1');
        }
      } catch (err) {
        console.error('Token check error:', err);
        navigation.replace('Onboarding1');
      }
    });
  
    return () => task.cancel();
  }, []);
  

  return (
    <View style={tw`flex-1 w-full bg-black justify-center items-center`}>
      {/* <FastImage
        style={tw`w-28 h-28 flex-1 `}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/logo.png')}
      /> */}
      <ActivityIndicator size="large" color="#fff" />
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
