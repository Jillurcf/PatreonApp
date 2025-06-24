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
import { IconBack, IconBusiness, IconDrawer, IconEconomy, IconFinance, IconGeneralSearch, IconGoogle, IconLaw, iconLock, IconMarketing, IconWriting } from '../assets/icons/icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useGetAllCategoryQuery } from '../redux/apiSlice/categorySlice';
import tw from '../lib/tailwind';
import { imageUrl } from '../redux/baseApi';
import InputText from '../components/InputText';
import { useGetAllUserQuery } from '../redux/apiSlice/userSlice';


type Props = {};

const HomeSearchResult = () => {
    const navigation = useNavigation();
    const [successModal, setSuccessModal] = useState(false);
    const [search, setSearch] = useState('');

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
        { id: '2', title: 'finnance', route: '', icon: IconFinance, iconType: 'image' },
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
            <View style={tw`flex-row w-full gap-4 mt-4 px-[4%] mb-8 items-center`}>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            } else {
                                console.log('No screen to go back to');
                            }
                        }}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                </View>
                <View style={tw`w-[90%]`}>
                    <InputText
                        style={tw`text-white`}
                        containerStyle={tw`bg-[#262329] border h-10 relative border-[#565358]`}
                        labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                        placeholder={'Search by user name'}
                        placeholderColor={'#949494'}
                        iconLeft={IconGeneralSearch}
                        onChangeText={(text) => {
                            setSearch(text);
                            setShowDropdown(!!text); // Show dropdown if there's input
                        }}
                    />
                </View>

            </View>

            <View style={tw``}>
                {showDropdown && search.length > 0 && (
                    <View style={tw`absolute bg-[#1e1e1e] w-full rounded-md z-50 p-2`}>
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
                                        <View style={tw`flex-row items-center gap-4`}>
                                            <Image source={{ uri: `${imageUrl}/${user?.image}` }} style={tw`w-12 h-12 rounded-full`} />
                                            <Text style={tw`text-white`}>{user.username}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        )}
                    </View>
                )}
            </View>


            <StatusBar backgroundColor="black" translucent />
        </View>
    );
};

export default HomeSearchResult;

const styles = StyleSheet.create({});
