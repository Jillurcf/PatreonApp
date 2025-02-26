import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import tw from '../../lib/tailwind';
import Button from '../../components/Button';

import {CustomAlert} from '../../components/CustomAlert';
import {SvgXml} from 'react-native-svg';
import {IconBack} from '../../assets/icons/icons';

interface ErrorResponse {
  data?: {
    message?: string;
  };
}

const VerifyScreen = ({navigation, route}: any) => {
  const [otp, setOtp] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [email, setEmail] = useState('');
  // const [otpVerify, {isLoading, isError}] = useOtpVerifyMutation();
  // const [forgetpass,] = useForgetpassMutation()
  // console.log("211", email, otp);
  const {from} = route?.params || {};
  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);
  //   const email = route?.params?.email
  //   console.log("216", email);
  const [alertVisible, setAlertVisible] = useState(false);

  const showCustomAlert = () => {
    setAlertVisible(true);
  };

  const closeCustomAlert = () => {
    setAlertVisible(false);
  };
  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newOtp = otp.split('');
    newOtp[index] = text;
    setOtp(newOtp.join(''));

    if (text !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({nativeEvent}: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSendAgainOtp = async () => {
    setSeconds(119);
    setIsActive(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Error', 'Please enter a valid email address.');
      return;
    }

    //  try {
    //    console.log("Sending payload:", { email }); // Log the payload for debugging
    //    const response = await forgetpass({ email }).unwrap(); // Pass email as an object
    //    console.log("Response received:", response);

    //    if (response?.status) {
    //      setAlertVisible(true);
    //      navigation?.navigate('VerifyOtp');
    //    } else {
    //      console.log('Error', response?.message || 'Failed to send OTP.');
    //    }
    //  } catch (err) {
    //    console.log("Error details:", JSON.stringify(err, null, 2));
    //    console.log(
    //      'Error',
    //      err?.data?.message?.email?.join(', ') || err?.data?.message || 'An unexpected error occurred.'
    //    );
    //  }
  };

  // Resend OTP timer
  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;
  //   if (isActive && seconds > 0) {
  //     interval = setInterval(() => setSeconds(prev => prev - 1), 1000);
  //   } else if (seconds === 0) {
  //     clearInterval(interval!);
  //     setIsActive(false);
  //   }
  //   return () => clearInterval(interval!);
  // }, [isActive, seconds]);

  // const formatSecondsToMinutes = (totalSeconds: number): string => {
  //   const minutes = Math.floor(totalSeconds / 60); // Calculate the minutes
  //   const seconds = totalSeconds % 60; // Calculate the remaining seconds
  //   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  // };

  const allFilled =
    otp.length === 6 && otp.split('').every(item => item !== '');
  const data = {email, otp};
  console.log('89', data);

  // const handleSendOtp = async () => {
  //   console.log("click");
  //   try {
  //     // Unwrap response from RTK Query mutation
  //     const response = await otpVerify(data).unwrap();

  //     // Process the successful response
  //     console.log("response", response);

  //     // Example: If the response contains user information or a token
  //     if (response) {
  //       console.log("OTP Verified Successfully!");
  //       // Navigate to login screen
  //       if(from === 'signup'){
  //         navigation.navigate("CreateNewPass", {email});
  //       } else {
  //         navigation.navigate("Login");
  //       }

  //     } else {
  //       console.error("OTP verification failed:", response.message);
  //     }
  //   } catch (err) {
  //     // Log error details for debugging
  //     console.error("Error verifying OTP:", err);
  //   }
  // };

  const handleSendOtp = async () => {
    console.log('click');
    navigation.navigate("Drawer")
    // try {
    //   // Unwrap response from RTK Query mutation
    //   const response = await otpVerify(data).unwrap();

    //   // Process the successful response
    //   console.log("response", response);

    //   // Navigate based on 'from' condition
    //   if (response) {
    //     console.log("OTP Verified Successfully!");
    //     if (from === 'signup') {
    //       navigation.navigate("Login"); // Navigate to Login if from signup
    //     } else {
    //       navigation.navigate("CreateNewPass", { email }); // Otherwise, go to CreateNewPass
    //     }
    //   } else {
    //     console.error("OTP verification failed:", response?.message);
    //   }
    // } catch (err) {
    //   // Log error details for debugging
    //   console.error("Error verifying OTP:", err);
    // }
    
  };

  // if (isLoading) {
  //   return (
  //     <View style={tw`flex-1 justify-center items-center`}>
  //       <ActivityIndicator size="large" color="#064145" />
  //       <Text style={tw`text-primary mt-2`}>Loading products...</Text>
  //     </View>
  //   );
  // }

  return (
    // <View style={tw``}>
      <ScrollView
        contentContainerStyle={tw`bg-black flex-1 justify-between p-[4%] `}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
       
       
          <View>
            <View style={tw`flex-row w-full justify-between px-[4%] mt-4`}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`bg-PrimaryFocus rounded-full p-1`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
              <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                Verify
              </Text>
              {/* Placeholder view for symmetry */}
              <View style={tw`w-8`} />
            </View>
            <View style={tw`mt-4`}>
              <Text style={tw`text-white text-2xl font-AvenirLTProBlack mt-6`}>
                Verify Your Number
              </Text>
              <Text style={tw`text-white text-xs font-AvenirLTProBlack mb-8`}>
                Enter code that we send you on your number.
              </Text>

              <View style={tw` gap-y-4`}>
                <View style={tw`flex-row justify-between items-center gap-2`}>
                  {Array.from({length: 6}).map((_, index) => (
                    <TextInput
                      key={index}
                      ref={ref => (inputs.current[index] = ref)}
                      value={otp[index] || ''}
                      onChangeText={text => handleChangeText(text, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                      style={tw`${
                        focusedIndex === index
                          ? 'border-[#565358]'
                          : 'border-title'
                      } border-[1px] rounded-2xl flex-1 h-16 font-extrabold text-center text-4xl font-AvenirLTProBlack text-primary bg-[#262329]`}
                      keyboardType="numeric"
                      selectionColor={'#064145'}
                      placeholderTextColor={'#949494'}
                      //   placeholder="0"
                      maxLength={1}
                      autoFocus={index === 0}
                    />
                  ))}
                </View>
                <Text style={tw`text-white font-AvenirLTProBlack`}>
                  Haven't received any code? Send again
                </Text>
              </View>
             
            </View>
          </View>
          <View style={tw`flex-col justify-end `}>
            <Button
              disabled={!allFilled}
              title={'Verify'}
              style={tw`text-black font-AvenirLTProBlack items-center`}
              containerStyle={tw`${
                !allFilled ? 'bg-PrimaryFocus' : ''
              } mt-4 h-14 rounded-2xl justify-center`}
              onPress={handleSendOtp}
            />
          </View>
       
       
         <StatusBar backgroundColor="black" translucent />
      </ScrollView>
      
   
  );1
};

export default VerifyScreen;
