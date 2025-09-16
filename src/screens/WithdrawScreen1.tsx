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

const WithdrawScreen1 = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleRadioButtonPress = (option: string) => {
    setSelectedOption(option);
  };
  const handleRadioButtonLanguage = (option1: string) => {
    setSelectedLanguage(option1);
  };
  return (
    <View style={tw`flex-1 justify-between bg-black px-[4%]`}>
      <View>
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
            Withdraw
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        <Text style={tw`text-[#E0E0E0] my-6`}>
          What is your business status
        </Text>
        {/* ======================================Content area ======================= */}
        {/* ===================Suggested============ */}
        <View style={tw``}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Business status
          </Text>
          <View style={tw`mt-4 flex-row justify-between`}>
            <Text style={tw`text-[#E0E0E0] font-AvenirLTProBlack text-lg`}>
              I am an individual
            </Text>
            <RadioButton
              color="white"
              selected={selectedOption === 'english_us'}
              onPress={() => handleRadioButtonPress('english_us')}
            />
          </View>
          <View style={tw`mt-4 flex-row justify-between`}>
            <Text style={tw`text-[#E0E0E0] font-AvenirLTProBlack text-lg`}>
              I am corporation
            </Text>
            <RadioButton
              color="white"
              selected={selectedOption === 'english_uk'}
              onPress={() => handleRadioButtonPress('english_uk')}
            />
          </View>
        </View>
        {/* ===================Suggested============ */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Cityzenship status
          </Text>
          <View style={tw`mt-4 flex-row justify-between`}>
            <Text style={tw`text-[#E0E0E0] font-AvenirLTProBlack text-lg`}>
              I am a US student
            </Text>
            <RadioButton
              color="white"
              selected={selectedLanguage === 'mandarin'}
              onPress={() => handleRadioButtonLanguage('mandarin')}
            />
          </View>
          <View style={tw`mt-4 flex-row justify-between`}>
            <Text style={tw`text-[#E0E0E0] font-AvenirLTProBlack text-lg`}>
              I am not US student
            </Text>
            <RadioButton
              color="white"
              selected={selectedLanguage === 'hindi'}
              onPress={() => handleRadioButtonLanguage('hindi')}
            />
          </View>
        </View>
      </View>
      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
          onPress={() => navigation?.navigate('WithdrawScreen2')}
          titleStyle={tw`text-black font-bold text-center`}
          title="Continue"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default WithdrawScreen1;

const styles = StyleSheet.create({});
