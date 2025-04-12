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
  IconPaypal,
  IconVisa,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {RadioButton} from 'react-native-ui-lib';
import TButton from '../components/TButton';
// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const data = [{label: 'Option 1'}];
const PaymentScreen = ({navigation}) => {
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
          Payment
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================payment area ======================= */}
      <View style={tw`flex-col justify-between h-[90%]`}>
        <View style={tw`items-center justify-center my-6`}>
          <View
            style={tw`bg-[#262329] w-[100%] rounded-2xl p-2 flex-row items-center justify-between my-2`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml width={30} xml={IconPaypal} />
              <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                Paypal
              </Text>
            </View>
            <View style={tw`flex-row-reverse items-center justify-end pr-3`}>
              <RadioButton
                color="white"
                selected={selectedOption === 'paypal'}
                onPress={() => handleRadioButtonPress('paypal')}
              />
              {/* <Text style={{marginRight: 8}}>Individual Radio Button</Text> */}
            </View>
          </View>
          <View
            style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml width={30} xml={IconGoogle} />
              <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                Google
              </Text>
            </View>
            <View style={tw`flex-row-reverse items-center justify-end pr-3`}>
              <RadioButton
                color="white"
                selected={selectedOption === 'google'}
                onPress={() => handleRadioButtonPress('google')}
              />
              {/* <Text style={{marginRight: 8}}>Individual Radio Button</Text> */}
            </View>
          </View>
          <View
            style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml width={30} xml={IconAple} />
              <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                Apple
              </Text>
            </View>
            <View style={tw`flex-row-reverse items-center justify-end pr-3`}>
              <RadioButton
                color="white"
                selected={selectedOption === 'apple'}
                onPress={() => handleRadioButtonPress('apple')}
              />
              {/* <Text style={{marginRight: 8}}>Individual Radio Button</Text> */}
            </View>
          </View>
          <View
            style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <SvgXml width={30} xml={IconVisa} />
              <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                Visa/Master card
              </Text>
            </View>
            <View style={tw`flex-row-reverse items-center justify-end pr-3`}>
              <RadioButton
                color="white"
                selected={selectedOption === 'visa_master'}
                onPress={() => handleRadioButtonPress('visa_master')}
              />
              {/* <Text style={{marginRight: 8}}>Individual Radio Button</Text> */}
            </View>
          </View>
        </View>
        {/* =======================================button area==================== */}
        <View style={tw`flex-row items-center justify-between`}>
          <View>
            <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
              Price
            </Text>
            <Text style={tw`text-white text-2xl font-AvenirLTProBlack`}>
              $150/ <Text style={tw`text-lg`}>3 months</Text>
            </Text>
          </View>
          <View style={tw`w-[50%] items-center my-6`}>
            <TButton
              onPress={() => navigation.navigate('PaymentDetails')}
              title="Pay"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-[90%] bg-white`}
            />
          </View>
        </View>
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
