import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SvgUri, SvgXml } from 'react-native-svg';
import { IconBusiness, IconDrawer, IconEconomy, IconFinance, IconGeneralSearch, IconGoogle, IconLaw, iconLock, IconMarketing, IconSearch, IconWriting } from '../assets/icons/icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useGetAllCategoryQuery } from '../redux/apiSlice/categorySlice';
import tw from '../lib/tailwind';
import { imageUrl } from '../redux/baseApi';
import InputText from '../components/InputText';
import { useGetAllUserQuery, useGetUserQuery } from '../redux/apiSlice/userSlice';


type Props = {};

const Discover = () => {
  const navigation = useNavigation();
  const [successModal, setSuccessModal] = useState(false);
  const [search, setSearch] = useState('');
  const { data: userData } = useGetUserQuery({});

  console.log("Search input:", search);

  const [showDropdown, setShowDropdown] = useState(false);
  // const { data, isLoading, isError } = useGetAllCategoryQuery({});
  const { data, isLoading, isError } = useGetAllUserQuery(search, {
    skip: !search // Skip query if no search text
  });


  console.log("User search result:", data?.data?.result);


  // const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;
  const DiscoverData = [
    { id: '1', title: 'marketing', route: '', icon: IconMarketing, iconType: 'image' },
    { id: '2', title: 'finance', route: '', icon: IconFinance, iconType: 'image' },
    { id: '3', title: 'law', route: '', icon: IconLaw, iconType: 'image' },
    { id: '4', title: 'economy', route: '', icon: IconEconomy, iconType: 'image' },
    { id: '5', title: 'writing', route: '', icon: IconWriting, iconType: 'image' },
    { id: '6', title: 'business', route: '', icon: IconBusiness, iconType: 'image' },
  ];
  const { width, height } = Dimensions.get('screen');
  const handlePress = (route: string, title: string, taskId: string, icon: string) => {
    console.log('route', route);
    console.log('taskId', taskId);
    console.log('title', title);
    if (taskId === '3') {
      setSuccessModal(true);
    } else {
      navigation.navigate("DiscoverResult", {
        ttile: title,
        taskId: taskId,
        route: route
      }
      );
    }
  };
  // const handleTransfer = () => {
  //   navigation.navigate('cashTransfer');
  // };
  // const renderImage = (imagePath: string) => {
  //   const uri = `${imageUrl}/${imagePath}`;
  //   const isSvg = imagePath?.toLowerCase().endsWith('.svg');

  //   if (isSvg) {
  //     return <SvgUri uri={uri} width={24} height={24} />;
  //   } else {
  //     return <Image source={{ uri }} style={tw`w-6 h-6`} resizeMode="contain" />;
  //   }
  // };

  return (
    <View style={tw`bg-black flex-1 px-[4%] `}>
      <View style={tw`flex-row justify-between my-4 items-center`}>
        <TouchableOpacity
          onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
          <SvgXml width={30} xml={IconDrawer} />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white font-AvenirLTProBlack text-right`}>
            Welcome Back
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack text-lg text-right`}>
            {userData?.data?.name}
          </Text>
        </View>
      </View>
      <Text
        style={tw`text-white font-AvenirLTProBlack text-center text-2xl my-6`}>
        Discover Contributers to {'\n'} Learn and Consult
      </Text>
      <View style={tw`my-4`}>
        {/* <InputText
          style={tw`text-white`}
          containerStyle={tw`bg-[#262329] border h-14 relative border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Search by user name'}
          placeholderColor={'#949494'}
          iconLeft={IconGeneralSearch}
          onChangeText={(text) => {
            setSearch(text);
            setShowDropdown(!!text); // Show dropdown if there's input
          }}
        /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeSearchResult')}
          style={tw`bg-[#262329] border h-14 border-[#565358] rounded-2xl px-4 justify-center`}>
          <View style={tw`flex-row items-center gap-3`}>
            <SvgXml xml={IconSearch} />
            <Text style={tw`text-white text-base`}>Search here</Text>
          </View>
        </TouchableOpacity>


        {showDropdown && search.length > 0 && (
          <View style={tw`absolute top-16 bg-[#1e1e1e] w-full rounded-md z-50 p-2`}>
            {isLoading ? (
              <Text style={tw`text-white`}>Loading...</Text>
            ) : data?.data?.result.length === 0 ? (
              <Text style={tw`text-white`}>No users found</Text>
            ) : (
              data?.data?.result?.map((user) => {
                console.log(user, "user from discover+++++++++++++++")
                return (
                  <TouchableOpacity
                    key={user.id}
                    onPress={() => {
                      setShowDropdown(false);
                      setSearch('');
                      navigation.navigate('Profile', { userId: user?._id }); // 👈 Pass full user data
                    }}
                    style={tw`p-2 border-b border-[#444]`}
                  >
                    <Text style={tw`text-white`}>{user.username}</Text>
                  </TouchableOpacity>
                )
              })
            )}
          </View>
        )}
      </View>

      <View>
        <FlatList
          // key={`flatlist-2`}
          data={DiscoverData}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }}
          scrollEnabled={false} // Disable FlatList scrolling
          renderItem={({ item }) => {
            // console.log(item, "")
            // const categoryImg = !item?.image
            //             ? { uri: `${imageUrl}/${item?.image}` }
            //             : require('../../../assets/images/logo.png'); // fallback image
            //   console.log(categoryImg, "categoryImg+++++++=")
            return (
              (
                <TouchableOpacity
                  // style={tw`md:w-28 md:h-28 sm:w-20 sm:h-20  rounded-lg m-2 h-24 bg-[#F4F1F1] justify-center items-center`}
                  style={{
                    width: width * 0.4,
                    height: height * 0.12,
                    margin: width * 0.02,
                    backgroundColor: '#262329',
                    borderRadius: width * 0.02,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => handlePress(item.route, item.id, item.title, item.icon)}>

                  <SvgXml xml={item?.icon} />

                  <Text
                    style={tw`text-start py-2 text-white font-AvenirLTProBlack`}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )
            )
          }

          }
        />
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
