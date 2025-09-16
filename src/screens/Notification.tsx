import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {
  IconBack,
  IconNotification,
  IconNotificationMessage,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import { useNotificationQuery } from '../redux/apiSlice/userSlice';

type Props = {};

const Notification = ({navigation}: {navigation:any}) => {
  const {data, isLoading, isError} = useNotificationQuery({});
  console.log(data?.data, "data+++++++++")

 
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              console.log('No screen to go back to');
              // Optionally, navigate to a default screen:
              // navigation.navigate('HomeScreen');
            }
          }}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Notification
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`mt-6`}>
        <FlatList
          data={data?.data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            console.log(item, "Item++++++++++++")
            return (
              <View
                style={tw`flex-row gap-3 bg-[#262329] p-4 my-1 items-center rounded-lg px-[4%]`}>
                <SvgXml xml={IconNotificationMessage} />
                <View style={tw``}>
                  {/* <Text style={tw`text-white font-AvenirLTProBlack pr-[2%]`}>
                    {item?.title}
                  </Text> */}
                  <Text style={tw`text-white font-AvenirLTProBlack pr-[14%]`}>
                    {item?.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
          <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
