import React, { useEffect, useState } from 'react';
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

import { NavigProps } from '../interface/NaviProps';
import { Dropdown } from 'react-native-element-dropdown';


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
import { SvgXml } from 'react-native-svg';
import { useGetUserQuery } from '../redux/apiSlice/userSlice';
import { useGlobalPayoutMutation } from '../redux/apiSlice/paymentSlice';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';



const WithdrawScreen = ({ navigation }: NavigProps<null>) => {
  const { data: withdrawData, isError, refetch } = useGetUserQuery({});
  const [globalPayout, {isLoading}] = useGlobalPayoutMutation();
  console.log(withdrawData?.data?.attachedBankAccounts, "withdrawData======================")
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [payoutConfirmationModalVisible, setPayoutConfirmationModalVisible] =
    useState(false);
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [errror, setError] = useState<string | null>(null);
  const bankAccounts = withdrawData?.data?.attachedBankAccounts?.map((acc: string, index: number) => ({
    label: acc, // readable text
    value: acc, // actual value
  })) ?? [];
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

  const handlePayout = async () => {
    if (!value || !amount || !country) {
      // Alert.alert('Error', 'Please fill in all fields');
      setError('Please fill in all fields');
      return;
    }

    try {
      // Call your payout API here
      console.log('Payout initiated with:', { accountId: value, amount, country });
      const data = {
        amount: amount,
        bankAccountId: value,
        currency: country,
      }
      const payoutResponse = await globalPayout(
        data
      ).unwrap();
      console.log(payoutResponse?.success === true, "Payout Response");
      if (payoutResponse?.success === true) {
        setPayoutConfirmationModalVisible(true);
        setValue(null);
        setAmount('');
        setCountry('');
        setError(null);
      } else {
        setError('Payout failed, please try again');
      }
      // Reset fields after successful payout

      // Alert.alert('Success', 'Payout initiated successfully');
    } catch (error) {
      console.error('Payout error:', error);
      Alert.alert('Error', 'Failed to initiate payout');
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
            Withdraw
          </Text>
          <View style={tw`w-8`} />
        </View>

        {/* ==========================drop down area =============================== */}


        <View style={tw`mt-8`}>
          {/* {renderLabel()} */}
          <Text style={tw`text-white py-2`}>Account Id</Text>
          <Dropdown
            style={tw`bg-[#262329] py-4 px-2 rounded-2xl border border-[#565358]`}
            //   style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={tw`text-[#A9A8AA]`}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={bankAccounts}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select it here' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Text style={tw`text-white mt-4`}>Amount</Text>
          <TextInput
            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329] mt-1`}
            placeholder="Enter Amount"
            placeholderTextColor={'#A9A8AA'}
            cursorColor="white"
            onChangeText={text => setAmount(text)}
          />

          <Text style={tw`text-white`}>Currency
          </Text>
          <TextInput
            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329] mt-1`}
            placeholder="gbp"
            placeholderTextColor={'#A9A8AA'}
            cursorColor="white"
            onChangeText={text => setCountry(text)}
          />
        </View>
      </View>


      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        {errror && (
          <Text style={tw`text-red-500 text-start text-xs my-2`}>
            {errror}*
          </Text>
        )}
        <TButton
          onPress={handlePayout}
          titleStyle={tw`text-black font-bold text-center`}
          title={isLoading ? "Wait..." : "Continue"}
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={payoutConfirmationModalVisible}
        setVisible={setPayoutConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
          Payout successful!
          </Text>

          <View style={tw`mt-2`}>

            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
              <Button
                title="Done"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => {
                  setPayoutConfirmationModalVisible(false);
                  navigation?.goBack();
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default WithdrawScreen;

const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    color: 'white',
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '',
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
    color: 'white',
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
