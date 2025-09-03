import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
//   import LinearGradient from 'react-native-linear-gradient';

import { ScrollView } from 'react-native-gesture-handler';
import tw from '../../lib/tailwind';
import TButton from '../../components/TButton';


type Props = {};

const Onboarding1 = ({navigation}: {navigation: any}) => {
  const handleCreateUser = async () => {
    console.log('click');
    
    try {
      // await createUser()
    } catch (error) {
      console.log(error);
    }
    navigation.navigate(
     "Signup",
      { screenName: "signup" }
    )
  };
  return (
    <ScrollView contentContainerStyle={tw`bg-black flex-1 `}>
      <View style={tw`flex-col justify-between h-full items-center`}>
        <View style={tw`z-2 flex mx-auto items-center justify-center mt-32`}>
          <Text
            style={tw` font-AvenirLTProBlack text-center text-white  text-5xl`}>
            Get expert
          </Text>
          <Text
            style={tw`font-AvenirLTProBlack text-center text-white  text-5xl py-4`}>
            advice anytime
          </Text>
          <Text
            style={tw`font-AvenirLTProBlack text-center text-white  text-5xl`}>
            anywhere
          </Text>
        </View>
        <View style={tw`z-2 flex mx-auto mb-0 top-0`}>
          <View style={tw`my-2 flex items-center justify-center`}>
            <TButton
              onPress={handleCreateUser}
              // onPress={()=> navigation?.navigate('AccountCreationEmail')}
              titleStyle={tw`text-whiteBtnText font-bold font-AvenirLTProHeavy text-center mx-auto`}
              title="Sign up"
              containerStyle={tw`bg-white w-[90%] my-2 rounded-full`}
            />
            <TButton
              onPress={() => navigation.navigate('Login', {from: 'Login'})}
              titleStyle={tw`text-white font-bold font-AvenirLTProHeavy text-center mx-auto`}
              title="Log in"
              containerStyle={tw`bg-PrimaryFocus w-[90%] my-2 rounded-full`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={'black'} translucent />
    </ScrollView>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen view
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  imageBackground: {
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gradientOverlay: {
    position: 'absolute', // Overlay on top of the image
    width: '100%', // Full width
    height: '100%', // Full height
    zIndex: 1, // Ensures it overlays the image
  },
});
