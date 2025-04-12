import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import NumericInput from 'react-native-numeric-input';

import {NavigProps} from '../interface/NaviProps';
import {Dropdown} from 'react-native-element-dropdown';
import Textarea from 'react-native-textarea';

import {
  AttachmentIcon,
  BulbIcon,
  CrossIcon,
  Gallery,
  IconAple,
  IconBack,
  IconCard,
  IconDollar,
  IconPaypal,
  IconRightArrow,
  StillCamera,
  VideoCam,
} from '../assets/icons/icons';
import IButton from '../components/IButton';
import TButton from '../components/TButton';
import tw from '../lib/tailwind';
import IconArrow from '../components/IconArrow';
import {SvgXml} from 'react-native-svg';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const PaymentDetails = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-4`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Payment Details
          </Text>
          <View style={tw`w-8`} />
        </View>

        <Text style={tw`text-white text-xl font-AvenirLTProBlack  mt-6 mb-2`}>
          Payment amount
        </Text>
        <Text style={tw`text-[#FFFFFF] font-AvenirLTProLight  mt-4 mb-2`}>
          Pay the set price or choose to pay more
        </Text>

        <View
          style={tw` px-4 py-6 bg-[#262329] justify-between flex-row items-center rounded-lg`}>
          <View>
            <Text style={tw`text-[#FFFFFF] text-lg font-AvenirLTProBlack`}>
              Monthly payment
            </Text>
            <Text style={tw`text-[#FFFFFF] font-AvenirLTProLight py-2`}>
              $2 month
            </Text>
          </View>
          <View style={tw`bg-[#565358] rounded-2xl px-4 py-2`}>
            <Text style={tw`text-[#FFFFFF] text-lg font-AvenirLTProBlack`}>
              $ 2.00
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={tw`text-white text-xl font-AvenirLTProBlack py-6 mt-2 mb-2`}>
            Payment method
          </Text>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              onPress={() => setSelectedMethod('paypal')}
              style={tw`bg-[#262329] items-center justify-center py-4 px-8 rounded-2xl ${
                selectedMethod === 'paypal' ? 'border-2 border-white' : ''
              }`}>
              <SvgXml xml={IconPaypal} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedMethod('card')}
              style={tw`bg-[#262329] items-center justify-center py-4 px-8 rounded-2xl ${
                selectedMethod === 'card' ? 'border-2 border-white' : ''
              }`}>
              <SvgXml xml={IconCard} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedMethod('apple')}
              style={tw`bg-[#262329] items-center justify-center py-4 px-8 rounded-2xl ${
                selectedMethod === 'apple' ? 'border-2 border-white' : ''
              }`}>
              <SvgXml xml={IconAple} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ==========================input textarea ========================= */}
        <View style={tw`mt-8 flex-row justify-between`}>
          <View>
            <Text style={tw`text-white font-AvenirLTProBlack py-2`}>
              Name on card
            </Text>
            <View
              style={tw`h-14 p-2 bg-[#262329] border border-[#565358] w-[45] rounded-lg `}>
              <Textarea
                style={tw`text-left h-40 text-white`}
                placeholder={'Sabri'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                multiline
                // maxLength={12}
                //   value={text}
                //   onChangeText={setText}
                textAlignVertical="top" // Ensures text starts from the top
              />
            </View>
          </View>
          <View>
            <Text style={tw`text-white font-AvenirLTProBlack py-2`}>
              Card number
            </Text>
            <View
              style={tw`h-14 p-2 bg-[#262329] border border-[#565358] w-[45] rounded-lg`}>
              <Textarea
                style={tw`text-left h-40 text-white`}
                placeholder={'Write it here'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                multiline
                // maxLength={12}
                //   value={text}
                //   onChangeText={setText}
                textAlignVertical="top" // Ensures text starts from the top
              />
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={tw`text-white font-AvenirLTProBlack py-2`}>
          Card number
        </Text>
        <View
          style={tw`h-14 p-2 bg-[#262329] border border-[#565358] w-[95] rounded-lg`}>
          <Textarea
            style={tw`text-left h-40 text-white`}
            placeholder={'Write it here'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            multiline
            // maxLength={12}
            //   value={text}
            //   onChangeText={setText}
            textAlignVertical="top" // Ensures text starts from the top
          />
        </View>
      </View>
      <View>
        <Text style={tw`text-white font-AvenirLTProBlack py-2`}>
          Cvv
        </Text>
        <View
          style={tw`h-14 p-2 bg-[#262329] border border-[#565358] w-[95] rounded-lg`}>
          <Textarea
            style={tw`text-left h-40 text-white`}
            placeholder={'Write it here'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            multiline
            // maxLength={12}
            //   value={text}
            //   onChangeText={setText}
            textAlignVertical="top" // Ensures text starts from the top
          />
        </View>
      </View>

      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
          onPress={() => navigation?.navigate('PaymentResult')}
          titleStyle={tw`text-black font-bold text-center`}
          title="Pay"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262329',
    padding: 16,
  },
  dropdown: {
    height: 50,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },
  // label: {
  //   position: 'absolute',

  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
