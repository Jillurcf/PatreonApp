import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useHelpAndSupportMutation } from '../redux/apiSlice/userSlice';
import tw from '../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { IconBack } from '../assets/icons/icons';
import InputText from '../components/InputText';
import Button from '../components/Button';
import NormalModal from '../components/NormalModal';


const HelpSupport = ({ navigation }: any) => {
    const [subject, setSubject] = useState('');
    const [desc, setDesc] = useState('');
    const [helpAndSupport, { isLoading, isError }] = useHelpAndSupportMutation();
    const [errorMessage, setEroorMessage] = useState('');
    const [messageConfirmationModalVisible, setMessageConfirmationModallVisible] =
        useState(false);
    console.log(errorMessage, 'error message');

    const [alertVisible, setAlertVisible] = useState(false);

    const showCustomAlert = () => {
        setAlertVisible(true);
    };

    const closeCustomAlert = () => {
        setAlertVisible(false);
    };

    const handleSend = async () => {
        console.log('click help center');
        try {
            const formData = new FormData();
            formData.append('title', subject);
            formData.append('description', desc);
            console.log('formdata sending', formData);
            const res = await helpAndSupport(formData);
            console.log(res?.data?.success, 'help center response +++++++++++++');
            if (res?.data?.success === true) {
                setAlertVisible(true);
                setSubject('')
                setDesc('')
                setMessageConfirmationModallVisible(true)
            } else {
                setEroorMessage(res?.data?.error)
            }
        } catch (error) {
            // setEroorMessage(error?.data?.error);
            console.log('Please send again', error);
        }
    };

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#064145" />
                <Text style={tw`text-primary mt-2`}>Loading ...</Text>
            </View>
        );
    }
    const allData = subject.trim() !== "" && desc.trim() !== "";

    return (
        <View style={tw`h-full bg-black px-[4%] pb-4`}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always">
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                        Help and Support
                    </Text>
                    {/* Placeholder view for symmetry */}
                    <View style={tw`w-8`} />
                </View>
                <View style={tw`mt-8 gap-y-2`}>

                    <InputText
                        placeholder={"Enter the subject"}
                        value={subject}
                        placeholderColor={'#949494'}
                        label={'Subject'}
                        onChangeText={(text: any) => setSubject(text)}
                        style={tw` text-white`}
                        labelStyle={tw`text-white font-AvenirLTProBlack`}
                        containerStyle={tw`border bg-black border-[#565358] h-12`}
                        cursorColor="white"
                    />

                    <InputText
                        placeholder={"Enter the description"}
                        value={desc}
                        placeholderColor={'#949494'}
                        label={"Description"}
                        // {'Descrivi il tuo prodotto'}
                        onChangeText={(text: any) => setDesc(text)}
                        style={tw`h-48 text-white`}
                        placeholderAlignment={'top'}
                        labelStyle={tw`text-white font-AvenirLTProBlack`}
                        containerStyle={tw`border bg-black border-[#565358] `
                        }
                        numberOfLines={20}
                        maxLength={3000}
                        cursorColor="white"
                    />

                </View>
            </ScrollView>
            {errorMessage === "title cannot be empty" ? (
                <Text style={tw`text-xs text-red-600 mb-2`}>Subject cannot be empty</Text>
            ) : errorMessage === "description cannot be empty" ? (<Text style={tw`text-xs text-red-600 mb-2`}>Description cannot be empty*</Text>) : ""}
            <Button
                disabled={!allData}

                title={'Continue'}
                style={tw`${allData ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                containerStyle={tw`${allData ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                onPress={handleSend}
            />
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                visible={messageConfirmationModalVisible}
                setVisible={setMessageConfirmationModallVisible}
            >
                <View>
                    <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                        Message sent successfully!
                    </Text>

                    <View style={tw`mt-2`}>

                        <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
                            <Button
                                title="Done"
                                style={tw`text-white px-6`}
                                containerStyle={tw`bg-gray-900`}
                                onPress={() => {
                                    setMessageConfirmationModallVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </NormalModal>
        </View>
    );
};

export default HelpSupport;
