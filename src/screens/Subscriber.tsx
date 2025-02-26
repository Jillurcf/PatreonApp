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
  Modal,
} from 'react-native';

import tw from '../lib/tailwind';
import {NavigProps} from '../interfaces/NaviProps';

import {SvgXml} from 'react-native-svg';
import TButton from '../components/buttons/TButton';

import {Avatar} from 'react-native-ui-lib';
import Notification from './Notification';
import InputText from '../components/InputText';
import {
  IconBack,
  IconGeneralSearch,
  IconRightArrow,
} from '../assets/icons/icons';

type ItemData = {
  id: string;
  image: string;
};

const Subscriber = ({navigation}: NavigProps<null>) => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%] mb-8`}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              console.log('No screen to go back to');
            }
          }}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Subscribers
        </Text>

        <View style={tw`w-8`} />
      </View>
      {/* ==================content area ======================== */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View
            //   onPress={() => navigation.navigate('Profile')}
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
                </View>
                <View style={tw`flex-1 pb-2`}>
                  <View style={tw`flex-row justify-between mr-2 items-center`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      Boxing Course
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-2`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      Teaching boxing and kick boxing
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={tw`bg-white py-1 px-4 rounded-xl`}>
                  <Text style={tw`text-black font-AvenirLTProBlack`}>
                    Unsubscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Modal animationType="slice" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 justify-center items-center bg-black/90`}>
          <View style={tw`bg-[#141316] p-6 rounded-2xl w-[80%]`}>
            <Text style={tw`text-white text-center py-8 text-xl font-AvenirLTProBlack`}>
              Are you sure you want to {'\n'} unsubscribe?
            </Text>
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-[#FFFFFF33] px-6 py-2 rounded-lg`}>
                <Text style={tw`text-black font-bold font-AvenirLTProBlack`}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  console.log('Unsubscribed successfully');
                }}
                style={tw`bg-white px-6 py-2 rounded-lg`}>
                <Text style={tw`text-black font-AvenirLTProBlack`}>
                
                  Unsubscribe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Subscriber;
