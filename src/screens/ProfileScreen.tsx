import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {IconBack, IconDot} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/TButton';

type Props = {};

const ProfileScreen = ({navigation}) => {
  return (
    <View style={tw`bg-black flex-1`}>
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
          Notification
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`flex items-center justify-center mt-8`}>
        <View style={tw`bg-red-300 w-18 h-18 rounded-full`}>
          <Text style={tw`text-black z-20`}>U</Text>
        </View>
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          User Name
        </Text>
        <Text style={tw`text-white font-AvenirLTProBlack   `}>
          Bio of the user
        </Text>
      </View>
      <View style={tw`flex items-center justify-center my-8`}>
        <View
          style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl justify-between flex-row items-center`}>
          <View
            style={tw`border-r-2 w-[50%] h-12 border-[#091218] items-center justify-center`}>
            <Text
              style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              405
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Subscribers
            </Text>
          </View>
          <View style={tw`w-[50%]`}>
            <Text
              style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              405
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Subscribers
            </Text>
          </View>
        </View>
      </View>
      <View style={tw`px-[6%]`}>
        <Text style={tw`text-white font-AvenirLTProBlack`}>
          About: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Architecto debitis tempora eaque at quaerat totam harum deserunt.
        </Text>
      </View>
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
            Memership Details
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack`}>
            $150 Transaction/3 months
          </Text>
          <View style={tw`flex-row gap-4 items-center my-1`}>
            <SvgXml xml={IconDot}/>
            <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>Data 1</Text>
          </View>
          <View style={tw`flex-row gap-4 items-center my-1`}>
            <SvgXml xml={IconDot}/>
            <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>Data 1</Text>
          </View>
          <View style={tw`flex-row gap-4 items-center my-1`}>
            <SvgXml xml={IconDot}/>
            <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>Data 1</Text>
          </View>
        </View>
      </View>
      <View style={tw`w-full items-center my-6`}>
        <TButton
        onPress={()=> navigation.navigate('Payment')}
        title='Subscribe' titleStyle={tw`text-black`} containerStyle={tw`w-[90%] bg-white`} />
      </View>
       <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
