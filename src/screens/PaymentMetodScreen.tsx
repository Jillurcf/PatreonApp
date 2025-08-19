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
  IconBack,
  IconDollar,
  IconRightArrow,
  StillCamera,
  VideoCam,
} from '../assets/icons/icons';
import IButton from '../components/IButton';
import TButton from '../components/TButton';
import tw from '../lib/tailwind';
import IconArrow from '../components/IconArrow';
import {SvgXml} from 'react-native-svg';
import { useGetUserQuery } from '../redux/apiSlice/userSlice';
import { useGetWalletByUserQuery, usePostCreateWalletMutation } from '../redux/apiSlice/paymentSlice';

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

const PaymentMethodScreen = ({navigation}: NavigProps<null>) => {
   const { data, isLoading, isError, refetch } = useGetUserQuery({});
   const {data:walletInformation, isLoading: walletLoading, isError: walletError} = useGetWalletByUserQuery({});
   const [postCreateWallet] = usePostCreateWalletMutation();
   const [walletData, setWalletData] = useState<any>(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
console.log(data?.data, "data======================")
console.log(walletInformation?.data, "walletInformation======================")
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
  const handleCreateWallet = async () => {
    try {
      const response = await postCreateWallet();
      console.log(response?.data?.data, "Create Wallet Response");
      setWalletData(response?.data?.data);
      refetch()
    } catch (error) {
      console.error('Create Wallet Error:', error);
      Alert.alert('Error', 'Failed to create wallet');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Payout Method
          </Text>
          <View style={tw`w-8`} />
        </View>

        {/* ==========================drop down area =============================== */}
        <View style={tw`mt-8`}>
          <View
            style={tw` p-2 bg-[#262329] w-full rounded-3xl py-8`}>
            <Text
              style={tw`text-white font-AvenirLTProBlack text-4xl text-center `}>
            { `$${walletInformation?.data?.balance}`}
            </Text>
            <Text style={tw`text-white font-AvenirLTProBlack text-center mt-6`}>
              Available for withdraw
            </Text>
          </View>
        </View>
      </View>

      {/* Continue button */}
      {data?.data?.wallet?.length >= 1 ? (
        <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
        onPress={()=> navigation?.navigate("WithdrawScreen")}
          titleStyle={tw`text-black font-bold text-center`}
          title="Withdraw"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>
      ):(<View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
        onPress={handleCreateWallet}
          titleStyle={tw`text-black font-bold text-center`}
          title="Create Wallet"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>)}
      

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default PaymentMethodScreen;

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
