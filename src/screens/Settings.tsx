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
  IconRightArrow,
  IconSettingNotificaiton,
  IconTermsAndCondition,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {RadioButton} from 'react-native-ui-lib';
import TButton from '../components/TButton';
import IconArrow from '../components/IconArrow';
// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const Settings = ({navigation}) => {
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
          Settings
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================setting menu area ======================= */}

      <View style={tw`items-center justify-center my-6`}>
        <View style={tw`bg-[#262329] w-[100%] rounded-2xl p-4  my-2`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndCondition')}
            style={tw`flex-row gap-3 items-center`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconTermsAndCondition} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Terms and agreements
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Language')}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconLanguage} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>Language</Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('NotificationSetting')}
            style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconSettingNotificaiton} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Notification
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
          onPress={()=> navigation.navigate("PaymentMethodScreen")}
          style={tw`flex-row gap-3 items-center mt-6`}>
            <View
              style={tw`bg-[#565358] w-8 h-8 rounded-full items-center justify-center`}>
              <SvgXml style={tw``} xml={IconPaymentMethod} />
            </View>
            <View style={tw`flex-row items-center justify-between w-[80%]`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Payout
              </Text>
              <SvgXml width={20} xml={IconRightArrow} />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
