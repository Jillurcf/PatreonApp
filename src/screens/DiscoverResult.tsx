import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';

import {SvgXml} from 'react-native-svg';
import TButton from '../components/buttons/TButton';

import {Avatar} from 'react-native-ui-lib';
import Notification from './Notification';
import InputText from '../components/InputText';
import {IconBack, IconGeneralSearch, IconRightArrow} from '../assets/icons/icons';

type ItemData = {
  id: string;
  image: string;
};

const DiscoverResult = ({navigation}: NavigProps<null>) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      data: {
        creator_image: require('../assets/images/alteravater.png'),
        message: 'John Doe commented on your post.',
        creator_name: 'John Doe',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 2,
      data: {
        creator_image: require('../assets/images/alteravater.png'),
        message: 'Your profile picture was liked.',
        creator_name: 'User',
      },
      created_at: new Date().toISOString(),
      read_at: new Date().toISOString(),
    },
    // Add other notifications here...
  ]);

  const handleRead = item => {
    navigation?.navigate('chatScreen', {
      id: item?.id,
      is_active: item?.is_active,
      receiverId: item?.receiver_id,
      receiverName: item?.name,
      reeciverImage: item?.avatar,
    });
  };

  const handleMessage = item => {
    navigation?.navigate('chatScreen', {
      receiverId: item?.id,
      receiverName: item?.first_name + item?.last_name,
      reeciverImage: item?.avatar,
    });
  };

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
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
         Search Result
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>

      <View style={tw`my-8`}>
        <InputText
          containerStyle={tw`bg-[#262329] border border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Boxing'}
          placeholderColor={'white'}
          //   label={'Password'}
          iconLeft={IconGeneralSearch}
          // iconRight={isShowConfirmPassword ? iconLock : iconLock}
          //   onChangeText={(text: any) => setConfirmPassword(text)}
          //   isShowPassword={!isShowConfirmPassword}
          //   rightIconPress={() =>
          //     setIsShowConfirmPassword(!isShowConfirmPassword)
          //   }
        />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-2`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`relative items-center`}>
                  {item?.data?.creator_image && (
                    <Avatar
                      source={item?.data?.creator_image}
                      size={50}
                      containerStyle={tw`mr-4`}
                    />
                  )}
                  {/* {item?.data?.creator_name ? (
                  <View
                    style={tw`w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-4`}
                  />
                ) : (
                  <View
                    style={tw`w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-4`}
                  />
                )} */}
                </View>
                <View style={tw`flex-1 pb-2`}>
                  <View style={tw`flex-row justify-between mr-2 items-center`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      Boxing Course
                    </Text>
                    {/* <View
                    style={tw`bg-white w-4 h-4 items-center justify-center rounded-full`}>
                    <Text style={tw`text-black font-AvenirLTProBlack text-xs`}>
                      2
                    </Text>
                  </View> */}
                  </View>
                  <View style={tw`flex-row justify-between mt-2`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      Teaching boxing and kick boxing
                    </Text>
                    {/* <Text style={tw`text-white font-AvenirLTProBlack`}>
                    09:41
                  </Text> */}
                  </View>
                  {/* {item.message === 0 ? (
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={tw`flex-row items-center mt-2`}>
                    <Text style={tw`text-blue-500 px-2 font-AvenirLTProBlack`}>
                      {item.created_at}
                    </Text>
                    <View
                      style={tw`w-5 h-5 items-center justify-center bg-red-500 rounded-full`}>
                      <Text style={tw`font-AvenirLTProBlack `}>
                        {item.data?.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={tw`flex-row items-center mt-2`}>
                    <Text style={tw`text-blue-500 px-2 font-AvenirLTProBlack`}>
                      {item.created_at}
                    </Text>
                    <View
                      style={tw`w-5 h-5 items-center justify-center bg-red-500 rounded-full`}>
                      <Text style={tw`font-AvenirLTProBlack`}>
                        {item.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )} */}
                </View>
                <SvgXml xml={IconRightArrow} />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DiscoverResult;
