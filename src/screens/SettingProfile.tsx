import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { SvgXml } from 'react-native-svg';
import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '../redux/apiSlice/userSlice';
import { imageUrl } from '../redux/baseApi';
import ImageCropPicker from 'react-native-image-crop-picker';
import tw from '../lib/tailwind';
import { IconBack, IconPencil, IconPlus } from '../assets/icons/icons';
import TButton from '../components/TButton';
import { usePostCreateConnectMutation } from '../redux/apiSlice/paymentSlice';
import WebView from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
// import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '@/src/redux/apiSlice/userSlice';

const { height, width } = Dimensions.get('screen');
const SettingProfile = ({ navigation }: { navigation: any }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [connected, setConnected] = useState()
  const [postCreateConnect] = usePostCreateConnectMutation();
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useGetUserQuery({});
  const [patchUpdateUserProfile] = usePatchUpdateUserProfileMutation();
  console.log(data?.data, "data======================")
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;


  useEffect(() => {
    data?.data?.stripeAccountId
     refetch();
  }, [data?.data]);

  const selectImage = async () => {
    console.log("click");
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 1,
        mediaType: 'photo',
      });

      if (image && image.path) {
        const uri = image.path;
        const fileName = uri.split("/").pop() || "photo.jpg";
        const match = /\.(\w+)$/.exec(fileName);
        const fileType = match ? `image/${match[1]}` : `image`;

        setImageUri(uri);

        const formData = new FormData();
        formData.append("image", {
          uri,
          name: fileName,
          type: fileType,
        } as any);

        const res = await patchUpdateUserProfile(formData);
        console.log("Image updated:", res);
      }
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };

  // const handleGetConnect = async () => {
  //   console.log('Button clicked');
  //   setLoading(true);
  //   try {
  //     // const formData = new FormData();
  //     // formData.append('email', profileData?.data?.email);

  //     // Call API to create Stripe Connect account
  //     const response = await postCreateConnect();
  //     console.log('Raw response:', response?.data?.data?.url);

  //     const url = response?.data?.data?.url;
  //     if (url) {
  //       console.log('Onboarding URL:', url);
  //       setOnboardingUrl(url); // Store URL in state

  //     } else {
  //       console.warn('Onboarding URL is undefined:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching connect URL:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // When user clicks "Create Connect Account" button
  const handleGetConnect = async () => {
    console.log('🔘 Button clicked');
    setLoading(true);
    try {
      const response = await postCreateConnect();
      const url = response?.data?.data?.url;

      if (url) {
        console.log('🌐 Onboarding URL:', url);
        setOnboardingUrl(url); // open in WebView
      } else {
        console.warn('⚠️ Onboarding URL is undefined:', response);
      }
    } catch (error) {
      console.error('❌ Error fetching connect URL:', error);
    } finally {
      setLoading(false);
    }
  };



  // const handleWebViewNavigation = async (event: any) => {
  //   console.log('WebView Navigation State:', event.url);

  //   if (event.url.includes('success')) {
  //     console.log('✅ Onboarding Successful!');

  //     // Optional state update
  //     setConnected(true);

  //     // Hide WebView
  //     setOnboardingUrl(null);

  //     // Navigate to Drawer
  //     setTimeout(() => {
  //       navigation?.navigate("Drawer",)

  //     }, 300);

  //   } else if (event.url.includes('your-app-failure-url')) {
  //     console.warn('❌ Onboarding Failed');
  //     setOnboardingUrl(null);
  //   }
  // };

  const handleWebViewNavigation = async (event: any) => {
    console.log('🌍 WebView Navigation:', event.url);

    // Match actual completion URL
    if (event.url.includes('/onboarding/complete')) {
      console.log('✅ Onboarding Successful!');
      setConnected(true);
      setOnboardingUrl(null);
      await refetch();

      setTimeout(() => {
        navigation?.navigate('Drawer'); // ensure this matches your navigator name
      }, 300);
    } else if (event.url.includes('your-app-failure-url')) {
      console.warn('❌ Onboarding Failed');
      setOnboardingUrl(null);
    }
  };



  if (onboardingUrl) {
    return (
      <WebView
        source={{ uri: onboardingUrl }}
        style={{ flex: 1, width: "100%", height: height * 0.7 }}
        onNavigationStateChange={handleWebViewNavigation}
      />
    );
  }



  return (
    <View style={tw`bg-black flex-1`}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Profile
        </Text>
        <View style={tw`w-8`} />
      </View>

      {/* Profile Image */}
      <View style={tw`flex items-center justify-center mt-8`}>
        <TouchableOpacity onPress={selectImage}>
          <View style={tw`relative`}>
            <View
              style={tw`w-18 h-18 bg-gray-400 rounded-full overflow-hidden mx-auto justify-center items-center`}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              ) : <Image
                source={{ uri: fullImageUrl }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />}


            </View>
            <View style={tw`absolute bottom-0 right-0 bg-gray-200 rounded-full p-2`}>
              <SvgXml xml={IconPlus} width={16} height={16} />
            </View>
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          {data?.data?.username || 'Username'}
        </Text>
        <Text style={tw`text-white font-AvenirLTProBlack`}>
          {data?.data?.bio || 'Bio'}
        </Text>
      </View>

      {/* Stats Box */}
      <View style={tw`flex items-center justify-center my-8`}>
        <View style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl flex-row items-center justify-between`}>
          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriptions?.length}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscriptions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriberCount}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={tw`w-[33%] items-center justify-center`}>
            <SvgXml xml={IconPencil} />
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ======================= My services ========================== */}
      <View style={tw`items-center`}>
        <View style={tw`flex-row items-center bg-[#262329]  w-[90%] rounded-2xl p-[6%] justify-between px-[4%]`}>
          <View style={tw`w-[100%] items-center`}>
            <TButton
              onPress={() => navigation.navigate('MyService')}
              title="My services"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-full bg-white`}
            />
          </View>
          {/* <View style={tw`w-[20%] items-center flex-row mx-[4%] `}>
            <Text style={tw`text-white text-center`}>Total =</Text>
            <Text style={tw`text-white`}>15</Text>
          </View> */}
        </View>
      </View>
      {/* Contributor Box */}
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl text-center font-AvenirLTProBlack`}>
            Become A Contributor
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            Consult People anytime anywhere 
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            First connect your stripe account for payouts, then create your agent.
          </Text>
          <View style={tw`w-full items-center mt-8`}>
            {data?.data?.stripeAccountId == null ? (
              <TButton
                onPress={handleGetConnect}
                title="Get connet"
                titleStyle={tw`text-white`}
                containerStyle={tw`w-full bg-red-600`}
              />
            ) : (
              data?.data?.services?.length < 1  && (
                <TButton
                  onPress={() => navigation.navigate('EnterInput')}
                  title="Become a contributor"
                  titleStyle={tw`text-black`}
                  containerStyle={tw`w-full bg-white`}
                />
              )
            )}
          </View>

        </View>
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({});
