import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
  useGetUserQuery,
  usePatchUpdateUserProfileMutation,
} from '../redux/apiSlice/userSlice';
import tw from '../lib/tailwind';
import { IconBack, IconEnvelope, IconUser } from '../assets/icons/icons';
import InputText from '../components/InputText';
import TButton from '../components/TButton';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';

const EditProfile = ({ navigation }: any) => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const { data, isError, refetch } = useGetUserQuery({});
  const [updateProfile, { isLoading }] = usePatchUpdateUserProfileMutation();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  console.log(name, username, bio, 'state values');
  console.log(data?.data?.name, 'data from get user query');

  // ✅ Set default values when data is fetched
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || '');
      setUsername(data.data.username || '');
      setBio(data.data.bio || '');
    }
  }, [data]);

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
      console.log(formData, 'formData before sending');

      const res = await updateProfile(formData);
      console.log(res, 'res after sending');

      //  success alert
      if (res?.data?.success) {
        setSuccessModalVisible(true);
      }
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
          <View style={tw`w-8`} />
        </View>

        <View style={tw`mt-12`}>
          <View>
            <View style={tw`flex-row gap-2 w-[98%]`}>
              <View style={tw`w-[50%]`}>
                <InputText
                  value={name}
                  cursorColor="white"
                  style={tw`text-white`}
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder="Write here"
                  placeholderColor="#949494"
                  label="Name"
                  iconRight={IconUser}
                  onChangeText={(text: any) => setName(text)}
                />
              </View>
              <View style={tw`w-[50%]`}>
                <InputText
                  value={username}
                  cursorColor="white"
                  style={tw`text-white`}
                  containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                  labelStyle={tw`text-white font-AvenirLTProBlack`}
                  placeholder="Write here"
                  placeholderColor="#949494"
                  label="User name"
                  iconRight={IconUser}
                  onChangeText={(text: any) => setUsername(text)}
                />
              </View>
            </View>

            <InputText
              value={bio}
              cursorColor="white"
              style={tw`text-white`}
              containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
              labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
              placeholder="Write it here"
              placeholderColor="#949494"
              label="Bio"
              iconLeft={IconEnvelope}
              onChangeText={(text: any) => setBio(text)}
            />
          </View>
        </View>
      </View>

      <View style={tw`flex-col justify-end `}>
        <TButton
          onPress={HandleSave}
          titleStyle={tw`text-black text-lg items-center justify-center font-bold font-AvenirLTProHeavy text-center mx-auto`}
          title={
            isLoading ? (
              <View style={tw`flex-row items-center justify-center`}>
                <Text> Savings...</Text>
                <ActivityIndicator size="small" color="black" style={tw`mr-2`} />

              </View>
            ) : (
              "Save"
            )
          }
          containerStyle={tw`bg-white w-[100%] h-16 my-2 items-center rounded-3xl`}
        />
      </View>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}>
        <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
            Profile updated successfully!
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`border-t-2 border-gray-800 w-full`}>

            </View>
            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
              <Button
                title="Done"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => {
                  setSuccessModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
      <StatusBar backgroundColor="black" translucent={false} />
    </ScrollView>
  );
};

export default EditProfile;
