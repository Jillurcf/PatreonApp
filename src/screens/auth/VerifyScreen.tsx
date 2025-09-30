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
import React, { useEffect, useRef, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { OtpInput } from 'react-native-otp-entry';
import { useEmailVerifySignupMutation, useOthersEmailVerifyMutation, useOtipVerifyMutation } from '../../redux/apiSlice/authSlice';
import tw from '../../lib/tailwind';
import { IconBack } from '../../assets/icons/icons';
import Button from '../../components/Button';


interface ErrorResponse {
  data?: {
    message?: string;
  };
}

const VerifyScreen = ({ navigation, route }: { navigation: any }) => {
  const [otp, setOtp] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<Array<TextInput | null>>([]);
  const [emailVerify, { isLoading }] = useEmailVerifySignupMutation();
  const [emailVerification] = useOthersEmailVerifyMutation();
  const [seconds, setSeconds] = useState(119);
  const [isActive, setIsActive] = useState(true);
  const { screenName, phoneNumber, email } = route.params || {};
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);


  console.log(screenName, phoneNumber, "screenName + Phone number++++++")

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

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
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

    try {
      const formData = new FormData();
      formData.append("email", email);
      console.log(formData, "formData");

      const res = await emailVerification(formData);
      console.log(res, "resend otp response");

      // if (res?.success) {
      //   success = true;
      // if (res?.data?.success === true) {
      //   navigation.navigate("Verify", { screenName: screenName, email: email });
      //   return;
      // }

    } catch (err) {
      console.error(`Verification error (attempt)`, err);
    }
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


  const handleSendOtp = async () => {

    try {
      const formData = new FormData();
      formData.append("email", String(email));
      formData.append("code", String(otp));
      console.log(formData, "formdata before sending+++++++")
      const response = await emailVerify(formData).unwrap();

      // Process the successful response
      console.log("response verify", response);

      // Navigate based on 'from' condition
      if (response?.success === true) {
        console.log("OTP Verified Successfully!");
        if (screenName === "forgetPass") {
          navigation.navigate(
            'ForgetPass',
            { email: email },
          );
        } else {
          navigation?.navigate("Popup", { email: email })
        }
      } else {
        console.error("OTP verification failed:", response?.message);
      }
    } catch (err) {
      // Log error details for debugging
      console.error("Error verifying OTP:", err);
      setError(err?.data);
    }

  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#064145" />
        <Text style={tw`text-primary mt-2`}>Loading products...</Text>
      </View>
    );
  }

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
            style={tw`bg-black rounded-full p-1`}>
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
            Verify Your Email
          </Text>
          <Text style={tw`text-white text-xs font-AvenirLTProBlack mb-8`}>
            Enter code that we send you on your email.
          </Text>

          <View style={tw` gap-y-4`}>
            <View style={tw`flex-row justify-between items-center gap-2`}>
              {/* {Array.from({length: 6}).map((_, index) => (
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
                  ))} */}
              <OtpInput
                numberOfDigits={6}
                focusColor="red"
                autoFocus={false}
                hideStick={true}
                placeholder="******"
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                onFocus={() => console.log("Focused")}
                onBlur={() => console.log("Blurred")}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                textProps={{
                  accessibilityRole: "text",
                  accessibilityLabel: "OTP digit",
                  allowFontScaling: false,
                }}
                theme={{
                  containerStyle: tw``,
                  // pinCodeContainerStyle: tw`bg-red-300`,
                  pinCodeTextStyle: tw`text-white `,
                  focusStickStyle: tw`bg-red-400 text-red-700`,
                  focusedPinCodeContainerStyle: tw`border-gray-600`,
                  placeholderTextStyle: tw`text-white`,
                  filledPinCodeContainerStyle: tw``,
                  disabledPinCodeContainerStyle: tw`border-red-500`,
                }}
              />
            </View>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-white font-AvenirLTProBlack`}>
                Haven't received any code?
              </Text>
              <TouchableOpacity
                onPress={handleSendAgainOtp}
              >
                <Text style={tw`text-gray-400 font-AvenirLTProBlack underline`}>Send again</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
      <View style={tw`flex-col justify-end `}>
        {error && (
          <Text style={tw`text-red-500`}>{error?.message}*</Text>
        )}
        <Button
          disabled={!allFilled}
          title={isLoading ? "Wait..." : 'Verify'}
          style={tw`text-black font-AvenirLTProBlack items-center`}
          containerStyle={tw`${!allFilled ? 'bg-PrimaryFocus' : 'white'
            } mt-4 h-14 rounded-2xl justify-center`}
          onPress={handleSendOtp}
        />
      </View>


      <StatusBar backgroundColor="black" translucent />
    </ScrollView>


  ); 1
};

export default VerifyScreen;
