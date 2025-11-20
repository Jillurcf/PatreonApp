import { ActivityIndicator, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { SvgXml } from 'react-native-svg'
import { useDeleteServicesMutation, useGettMyServicesQuery } from '../redux/apiSlice/serviceSlice'
import tw from '../lib/tailwind'
import { IconBack, IconEdit } from '../assets/icons/icons'
import MyServiceList from '../components/MyServiceList'
import NormalModal from '../components/NormalModal'
import TButton from '../components/TButton'





type Props = {}

const MyServices = ({ navigation }: { navigation: any }) => {
    const { data, refetch, isLoading, isError } = useGettMyServicesQuery({})
    // console.log(data?.data, "My serviced data =================14")
    const [deleteServices] = useDeleteServicesMutation();
    const [deleteServiceConfirmationModalVisible, setDeleteServiceConfirmationModalVisible] =
        useState(false);
    const [seletedItem, setSeletedItem] = useState(null);

    const handleEditService = (item) => {
        // console.log(item?._id, "click+++++++++++++++++++++++++")

        navigation.navigate("EditService",
            {
                id: item?._id,
            }
        )

    }

    const handleDelete = async (item) => {
        setDeleteServiceConfirmationModalVisible(true);
        setSeletedItem(item);

    };

    const handleDeleteConfirmation = async () => {
        try {
            // console.log(item._id, "id++++++++++++++++++ click");
            const res = await deleteServices(seletedItem._id).unwrap();
            console.log('Deleted successfully', res)
            if (res?.success === true) {
                await refetch(); // Refetch the data after deletion
                navigation.navigate('Drawer'); // Navigate back to MyServices screen
            }
            setDeleteServiceConfirmationModalVisible(false);

        } catch (error) {
            console.error('Delete failed', error);
        }

    }

    {
        isLoading && (
            <View style={tw` justify-center items-center`}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={tw`text-white mt-2`}>Loading...</Text>
            </View>
        )
    }

    return (
        <View
            style={tw`flex-1 bg-black h-[95%] px-[4%]`}>
            <View style={tw``}>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-black rounded-full p-1`}>
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
                {/* <FlatList
                    data={data?.data}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View
                                //   onPress={() => navigation.navigate('Profile')}
                                style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl py-4 p-3`}>
                                <View style={tw`flex-row items-center`}>

                                    <View style={tw`flex-1 pb-2`}>
                                        <View style={tw` mr-2 `}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                Title: {item?.title}
                                            </Text>
                                            <Text style={tw`text-white mt-1 text-xs font-AvenirLTProBlack`}>
                                                Price: {item?.price ? `$${item?.price}` : 'Free'}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                Subtitle: {item?.subtitle}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                Category: {item?.category}
                                            </Text>
                                        </View>
                                        <View style={tw`flex-row justify-between mt-2`}>
                                            <Text style={tw` mt-2 text-white font-AvenirLTProBlack`}>
                                                Description: {item?.description.slice(0, 100)}
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
                /> */}

                <MyServiceList
                    data={data?.data}
                    handleDelete={handleDelete}
                    handleEditService={handleEditService}
                    IconEdit={IconEdit}
                />
            </View>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center `}
                containerStyle={tw`rounded-xl bg-[#141316] w-[80%] `}
                visible={deleteServiceConfirmationModalVisible}
                setVisible={setDeleteServiceConfirmationModalVisible}
            >
                <View>
                    <Text style={tw`text-white text-2xl text-center font-AvenirLTProBlack mb-2`}>
                        Sure you want to {'\n'}delete service?
                    </Text>

                    <View style={tw`mt-2`}>
                        <View style={tw`items-center mb-4`}>
                            <TButton
                                title="Yes"
                                titleStyle={tw`text-[#262329] text-[16px] font-AvenirLTProBlack`}
                                containerStyle={tw`w-[100%] bg-white `}
                                onPress={handleDeleteConfirmation}
                            />
                        </View>
                        <View style={tw`items-center w-full`}>
                            <TButton
                                title="Cancel"
                                titleStyle={tw`text-white text-[16px] font-AvenirLTProBlack`}
                                containerStyle={[tw`w-[100%]`, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                                onPress={() => {
                                    setDeleteServiceConfirmationModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </NormalModal>
            <StatusBar translucent={false} />
        </View>
    )
}

export default MyServices

const styles = StyleSheet.create({})