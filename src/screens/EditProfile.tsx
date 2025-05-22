import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { usePatchUpdateUserProfileMutation } from '../redux/apiSlice/userSlice';
import tw from '../lib/tailwind';
import { IconBack, IconEnvelope, IconUser } from '../assets/icons/icons';
import InputText from '../components/InputText';
import TButton from '../components/TButton';


const EditProfile = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [updateProfile] = usePatchUpdateUserProfileMutation();
  console.log('27', name, username, bio);
  // const data = {email, password, name:username, address:location}
  const allFilled =

    name.trim() !== '' &&
    username.trim() !== '' &&
    bio.trim() !== '';
  console.log(allFilled, 'allFilled');

  const HandleSave = async () => {
    console.log('clicked');
    try {

      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('bio', bio);
      console.log(formData, 'formData beore sending');

      const res = await updateProfile(formData)
      console.log(res, 'res after sending');

      // const res = await fetch("http://10.0.80.85:3004/api/users/auth/update-profile-by-user", {
      //   method: "PATCH",
      //   body: formData,
      //   // ❌ Don't set Content-Type manually
      // });
    
      // const json = await res.json();
      // console.log("Final Parsed Response:", json);
      // if (json?.success === true) {
      //   Alert.alert('Profile updated successfully');
      // }

    } catch (error) {
      console.error('Error updating profile:', error);
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
            onPress={() => navigation.goBack()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Edit My Profile
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        <View style={tw`mt-12`}>
          <View>
            <View style={tw`flex-row gap-2 w-[98%]`}>
              <View style={tw`w-[50%]`}>
                <InputText
                  cursorColor="white"
                  style={tw`text-white`}
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder={'Write here'}
                  placeholderColor={'#949494'}
                  label={'Name'}
                  iconRight={IconUser}
                  onChangeText={(text: any) => setName(text)}
                />
              </View>
              <View style={tw`w-[50%]`}>
                <InputText
                  cursorColor="white"
                  style={tw`text-white`}
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
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
              cursorColor="white"
              style={tw`text-white`}
              containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder={'Write it here'}
              placeholderColor={'#949494'}
              label={'Bio'}
              iconLeft={IconEnvelope}
              // iconRight={isShowPassword ? iconLock : iconLock}
              onChangeText={(text: any) => setBio(text)}
            // isShowPassword={!isShowPassword}
            // rightIconPress={() => setIsShowPassword(!isShowPassword)}
            />
            {/* <InputText
                containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
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
              /> */}
          </View>
        </View>
      </View>
      <View style={tw`flex-col justify-end `}>
        <TButton
          onPress={HandleSave}
          titleStyle={tw`text-black text-lg items-center justify-center font-bold font-AvenirLTProHeavy text-center mx-auto`}
          title="Save"
          containerStyle={tw`bg-white w-[100%] h-16 my-2 items-center rounded-3xl`}
        />
      </View>
      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default EditProfile;
