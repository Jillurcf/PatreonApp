import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {
  IconBack,
  IconDot,
  IconPencil,
  IconUser,
  UserIcon,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/TButton';

type Props = {};

const SettingProfile = ({navigation}) => {
  return (
    <View style={tw`bg-black flex-1`}>
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
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
          Profile
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`flex items-center justify-center mt-8`}>
        <View
          style={tw` w-18 h-18 items-center rounded-full bg-gray-400 justify-center `}>
          <SvgXml width={50} xml={UserIcon} />
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
            style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity onPress={() => navigation.navigate('Subscriber')}>
              <Text
                style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                405
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text
                style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                405
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={tw`w-[33%] items-center justify-center`}>
            <SvgXml xml={IconPencil} />
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text
            style={tw`text-white text-xl text-center font-AvenirLTProBlack`}>
            Become A Contributor
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            Consult People anytime anywhere
          </Text>
          <View style={tw`w-full items-center mt-18`}>
            <TButton
              onPress={() => navigation.navigate('BecomeContributor')}
              title="Become a contributor"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-full bg-white`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({});
