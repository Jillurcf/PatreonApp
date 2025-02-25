import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    IconAple,
    IconBack,
    IconGoogle,
    IconLanguage,
    IconNotification,
    IconPaymentMethod,
    IconPaypal,
    IconSettingNotificaiton,
    IconTermsAndCondition,
  } from '../assets/icons/icons';
  import {SvgXml} from 'react-native-svg';
  import tw from '../lib/tailwind';
  import {RadioButton} from 'react-native-ui-lib';
  import TButton from '../components/TButton';
  // import RadioButtonRN from 'radio-buttons-react-native';
  
  type Props = {};
  
  const TermsAndCondition = ({navigation}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    const handleRadioButtonPress = (option: string) => {
      setSelectedOption(option);
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
        Terms & Agreements
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        {/* ======================================Content area ======================= */}
       
          <View style={tw` my-6`}>
            <View>
                <Text style={tw`text-white font-AvenirLTProBlack text-xl`} >1. Types of Data We Collect</Text>
                <Text style={tw`text-white font-AvenirLTProBlack mt-4`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            <View style={tw`mt-4`}>
                <Text style={tw`text-white font-AvenirLTProBlack text-xl`} >2. Uswe of Your Personal Data</Text>
                <Text style={tw`text-white font-AvenirLTProBlack mt-4`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
            <View style={tw`mt-4`}>
                <Text style={tw`text-white font-AvenirLTProBlack text-xl`} >3. Disclosure of your Personal Data</Text>
                <Text style={tw`text-white font-AvenirLTProBlack mt-4`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
          </View>
        
        <StatusBar backgroundColor="black" translucent />
      </View>
    );
  };
  
  export default TermsAndCondition;
  
  const styles = StyleSheet.create({});
  