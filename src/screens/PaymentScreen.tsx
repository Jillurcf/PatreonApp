import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IconBack, IconGoogle, IconPaypal} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const data = [{label: 'Option 1'}];
const PaymentScreen = ({navigation}) => {
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
          Notification
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`items-center justify-center my-6`}>
        <View
          style={tw`bg-[#262329] w-[100%] rounded-2xl p-2 flex-row items-center gap-4 my-2`}>
          <SvgXml width={30} xml={IconPaypal} />
          <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
            Paypal
          </Text>
        </View>
        <View
          style={tw`bg-[#262329] w-[100%] rounded-2xl p-2 flex-row items-center gap-4 `}>
          <SvgXml width={30} xml={IconGoogle} />
          <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
            Google
          </Text>
          {/* <RadioButtonRN
        data={data}
        
        selectedBtn={e => console.log(e)}
        activeColor="#fff"            // Active button color
        deactiveColor="#ccc"          // Inactive button color
        boxStyle="none" // Optional: style for the radio box
        textStyle={{ color: '#fff' }}  // Optional: style for the radio label text
      /> */}
        </View>
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
