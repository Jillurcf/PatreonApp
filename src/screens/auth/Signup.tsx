import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../../lib/tailwind';
import InputText from '../../components/InputText';

import {Checkbox} from 'react-native-ui-lib';
import Button from '../../components/Button';
import {SvgXml} from 'react-native-svg';
import {
  IconBack,
  IconEnvelope,
  IconGoogle,
  iconLock,
  IconUser,
} from '../../assets/icons/icons';
import TButton from '../../components/TButton';
// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const SignUp = ({navigation}: any) => {
  // console.log('navigation', navigation);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  // const [SignUp, {isLoading, isError}] = useSignupMutation();
  console.log('27', email, password, username, location);
  // const data = {email, password, name:username, address:location}

  const handleSignup = async () => {
    try {
      // Validate required fields before sending the request
      if (!email || !password || !username || !location) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      // const data = {
      //   email: email.trim(),
      //   password: password.trim(),
      //   name: username.trim(),
      //   address: location.trim(),
      // };

      // Send data through the SignUp function and unwrap the response
      // const response = await SignUp(data).unwrap();

      // console.log("Response from SignUp:", response);

      // if (response && response.status === true) {
      //   navigation?.navigate('VerifyOtp', { email, from: "signup" });
      // } else if (response && response.status === false) {
      //   // Extract error messages
      //   const errorMessages = [];
      //   if (response?.message) {
      //     Object.values(response.message).forEach((errors) => {
      //       if (Array.isArray(errors)) {
      //         errorMessages.push(...errors);
      //       } else {
      //         errorMessages.push(errors);
      //       }
      //     });
      //   }

      //   // Show Alert with error messages
      //   Alert.alert("Signup Failed", errorMessages.join("\n"));
      // }
    } catch (err) {
      console.error('Error during SignUp:', err);

      // Extract error messages
      // const errorMessages = [];
      // if (err?.message) {
      //   Object.values(err.message).forEach((errors) => {
      //     if (Array.isArray(errors)) {
      //       errorMessages.push(...errors);
      //     } else {
      //       errorMessages.push(errors);
      //     }
      //   });
      // }

      // // Show Alert with error messages or a default message
      // Alert.alert("Signup Error", errorMessages.length ? errorMessages.join("\n") : "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
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
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Register
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        <View>
          <Text style={tw`text-primary text-xl font-AvenirLTProBlack mt-6`}>
            We are delighted that you are here
          </Text>
          <Text style={tw`text-white mt-2 font-AvenirLTProBlack mb-8`}>
            Get started in just few seconds.
          </Text>

          <View>
            <View style={tw`flex-row gap-2 w-[98%]`}>
              <View style={tw`w-[50%]`}>
                <InputText
                  containerStyle={tw`bg-[#262329] border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder={'Write here'}
                  placeholderColor={'#949494'}
                  label={'Name'}
                  iconRight={IconUser}
                  onChangeText={(text: any) => setUsername(text)}
                />
              </View>
              <View style={tw`w-[50%]`}>
                <InputText
                  containerStyle={tw`bg-[#262329] border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder={'Write here'}
                  placeholderColor={'#949494'}
                  label={'User name'}
                  iconRight={IconUser}
                  onChangeText={(text: any) => setUsername(text)}
                />
              </View>
            </View>
            <InputText
              containerStyle={tw`bg-[#262329] border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Email'}
              iconLeft={IconEnvelope}
              // iconRight={isShowPassword ? iconLock : iconLock}
              onChangeText={(text: any) => setPassword(text)}
              isShowPassword={!isShowPassword}
              rightIconPress={() => setIsShowPassword(!isShowPassword)}
            />
            <InputText
              containerStyle={tw`bg-[#262329] border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Password'}
              iconLeft={iconLock}
              // iconRight={isShowConfirmPassword ? iconLock : iconLock}
              onChangeText={(text: any) => setConfirmPassword(text)}
              isShowPassword={!isShowConfirmPassword}
              rightIconPress={() =>
                setIsShowConfirmPassword(!isShowConfirmPassword)
              }
            />
          </View>
        </View>
      </View>
      <View style={tw`flex-col justify-end `}>
        <TButton
          onPress={() => navigation.navigate('Popup', {from: 'Verify'})}
          titleStyle={tw`text-black text-lg items-center justify-center font-bold font-AvenirLTProHeavy text-center mx-auto`}
          title="Register"
          containerStyle={tw`bg-white w-[100%] h-16 my-2 items-center rounded-3xl`}
        />
      </View>
      <StatusBar backgroundColor="black" translucent />
    </ScrollView>
  );
};

export default SignUp;
