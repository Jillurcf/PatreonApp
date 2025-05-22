import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { IconBack, IconDot } from '../assets/icons/icons';
import { SvgXml } from 'react-native-svg';




import { FlatList } from 'react-native-gesture-handler';

import tw from '../lib/tailwind';
import TButton from '../components/TButton';
import { useGetSingleUserQuery } from '../redux/apiSlice/userSlice';
import { imageUrl } from '../redux/baseApi';
import { getServiceData } from '../utils';

type Props = {};

const ProfileScreen = ({navigation, route}: {navigation:any}) => {
  const { userId, serviceId, title } = route.params || {};

  console.log(userId, serviceId, title, "id++++++18");
  const { data, isLoading, isError } = useGetSingleUserQuery(userId);
  console.log(data, '=======================data')
  const [serviceData, setServiceData] = React.useState<any>(null);
  console.log(serviceData, "serviceData++++++");
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;
  useEffect(() => {
    const service = getServiceData();
    setServiceData(service);
  }, []);
  // console.log(id, "id++++++");

  return (
    <View style={tw`bg-black flex-1`}>
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack()
          }}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        {/* <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Notification
        </Text> */}
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`flex items-center justify-center mt-8`}>
        <Image style={tw`rounded-full`} width={80} height={80} source={{ uri: fullImageUrl }} />
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          {data?.data?.username || 'Username'}
        </Text>
        <Text style={tw`text-white font-AvenirLTProBlack   `}>
          {data?.data?.bio || 'Bio'}
        </Text>
      </View>
      <View style={tw`flex items-center justify-center my-8`}>
        <View
          style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl justify-between flex-row items-center`}>
          <View
            style={tw`border-r-2 w-[50%] h-12 border-[#091218] items-center justify-center`}>
            <Text
              style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              {data?.data?.subscriberCount || '0'}
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Subscribers
            </Text>
          </View>
          <View style={tw`w-[50%]`}>
            <Text
              style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
              {data?.data?.services.length || '0'}
            </Text>
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Services
            </Text>
          </View>
        </View>
      </View>
      <View style={tw`px-[6%]`}>
        <Text style={tw`text-white font-AvenirLTProBlack`}>
          {serviceData?.about || 'Bio'}
        </Text>
      </View>
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
            Memership Details
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack`}>
            $150 Transaction/3 months
          </Text>
          <FlatList
            data={serviceData?.explainMembership}
            renderItem={({ item }) => (
              <View style={tw`flex-row gap-4 items-center my-1`}>
                <SvgXml xml={IconDot} />
                <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                  {item}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-[#262329]`}
            style={tw`h-40`}
          />
        </View>
      </View>
      <View style={tw`w-full items-center my-6`}>
        <TButton
          onPress={() => navigation?.navigate(
         'Payment',
          {
              userId: userId, // ✅ Pass the userId you already have
              serviceId: serviceId,
              title: title,
            }
          )}
          title="Subscribe"
          titleStyle={tw`text-black`}
          containerStyle={tw`w-[90%] bg-white`}
        />

      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
