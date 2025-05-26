import { ActivityIndicator, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { SvgXml } from 'react-native-svg'
import { useDeleteServicesMutation, useGettMyServicesQuery } from '../redux/apiSlice/serviceSlice'
import tw from '../lib/tailwind'
import { IconBack, IconEdit } from '../assets/icons/icons'





type Props = {}

const MyServices = ({navigation} :{navigation:any}) => {
    const { data, refetch, isLoading, isError } = useGettMyServicesQuery({})
    console.log(data?.data, "My serviced data =================14")
    const [deleteServices] = useDeleteServicesMutation();

    const handleEditService = (item) => {
        console.log(item?._id, "click+++++++++++++++++++++++++")
       
          navigation.navigate( "EditService",
           {
                id: item?._id,
            }
        )

    }

    const handleDelete = async (item) => {
        try {
            console.log(item._id, "id++++++++++++++++++ click");
            const res = await deleteServices(item._id).unwrap();
            console.log('Deleted successfully', res)
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    {
        isLoading && (
            <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-white/60 z-50`}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={tw`text-white mt-2`}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%]`}>
            <View style={tw``}>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
                        My services
                    </Text>
                    <View style={tw`w-8`} />
                </View>
            </View>
            {/* =============== my services section =================== */}
            
            <View style={tw`mt-4`}>
                <FlatList
                    data={data?.data}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View
                                //   onPress={() => navigation.navigate('Profile')}
                                style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl py-4 p-3`}>
                                <View style={tw`flex-row items-center`}>

                                    <View style={tw`flex-1 pb-2`}>
                                        <View style={tw`flex-row mr-2 items-center`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                            {item?.title}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.subtitle}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.category}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.description.slice(0, 100)}...
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={tw`flex-row gap-4 items-center`}>
                                        <TouchableOpacity
                                            onPress={() => handleEditService(item)}
                                            style={tw` py-1 rounded-xl`}>
                                            <SvgXml width={20} height={20} xml={IconEdit} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item)}
                                            style={tw`py-1 px-3 rounded-xl bg-red-500`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack border-b border-white`}>Del.</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
            <StatusBar translucent={false} />
        </ScrollView>
    )
}

export default MyServices

const styles = StyleSheet.create({})