import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../lib/tailwind';
import {
  IconBack,
  IconDot,
  IconPencil,
  IconPlus,
  IconUser,
  UserIcon,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import TButton from '../components/TButton';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {};

const SettingProfile = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        setImageUri(file.uri);
        uploadImage(file);
      }
    });
  };

  const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
  };
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
        <TouchableOpacity onPress={selectImage}>
          <View
            style={tw`w-18 h-18 bg-gray-400 rounded-full overflow-hidden mx-auto justify-center items-center relative`}>
            <Image
              source={
                imageUri
                  ? {uri: imageUri}
                  : require('../assets/images/alteravater.png')
              }
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>

          <View>
            <View
              style={tw`absolute bottom-0 right-0 bg-gray-200 rounded-full p-3`}>
              <SvgXml style={tw`absolute bottom-1 right-1 `} xml={IconPlus} />
            </View>
          </View>
        </TouchableOpacity>

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
