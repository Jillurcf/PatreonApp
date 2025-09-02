import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';

import tw from 'twrnc'; // if using tailwind-rn

import { SvgXml } from 'react-native-svg';
import { usePostBecmeAContibutorMutation } from '../redux/apiSlice/serviceSlice';
import { getExplainMemberValue, loadMediaPromptData } from '../utils';
import { IconBack, IconPlus } from '../assets/icons/icons';
import TButton from '../components/TButton';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';

const ExplainMembershipScreen = ({ navigation }: { navigation: any }) => {
    const [serviceSuccess, setServiceSuccess] = useState(false);
    const [fields, setFields] = useState(['', '', '']);
    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: "",
        category: "",
        iocn: "",
    });
    const [promptInput, setPromptInput] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState();
    const [serviceCreationConfirmationModalVisible, setServiceCreationConfirmationModalVisible] =
        useState(false);
    const [postBecmeAContibutor, { isLoading, isError }] = usePostBecmeAContibutorMutation();
    // console.log(fields, "fields data +++++++++++++++++++++++++")

    useEffect(() => {
        const savedValue = getExplainMemberValue();
        console.log(savedValue?.category, "savedValue+++++++++++++")
        setValue(savedValue);
        const promptInput = loadMediaPromptData();
        const mediaData = loadMediaPromptData(); // returns an object
        setPromptInput(mediaData.promptInput);   // assigns only the string part
        setSelectedImages(mediaData?.selectedImages)
        // console.log(promptInput, selectedImages, "promptInput+++++++++++++")
    }, []);


    const handleAddField = () => {
        setFields([...fields, '']);
    };

    const handleChange = (text: string, index: number) => {
        const updatedFields = [...fields];
        updatedFields[index] = text;
        setFields(updatedFields);
    };

    const handleSave = async () => {

        // console.log(fields, "Fields ++++++++++++++++++++++")
        try {
            const formData = new FormData()
            formData.append('title', value?.title)
            formData.append('subtitle', value?.subtitle)
            formData.append('price', value?.currency)
            formData.append('description', value?.description)
            formData.append('category', value?.category)
            formData.append('about', promptInput)
            formData.append('pdfFiles', selectedImages)
            formData.append('icon', value?.icon);
            // formData.append('explainMembership', fields)
            formData.append("explainMembership", JSON.stringify(fields)); // ← becomes: '["Member ", "Member 1", "Member 2"]'

            console.log(formData, "formData in explain membership page==================before sending to api")
            const res = await postBecmeAContibutor(formData).unwrap();
            if (res?.success === true) {
                setServiceSuccess(res?.success === true);
                // If the response is successful, navigate to the SettingProfile screen
                navigation.navigate('SettingProfile');
                setServiceCreationConfirmationModalVisible(true)
                console.log(res, "res++++++++++++++++")
                // Alert.alert("Service created succcessfully")
            } else {
                // If the response is not successful, you can handle it accordingly
                console.log("res not success", res)
               console.log("Service not created succcessfully")
            }

        } catch (err) {
            console.log(err)
        }
        console.log('Saved fields:', fields);
        // Save logic here
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-black`}>
            <ScrollView contentContainerStyle={tw` flex-col justify-between h-full`} style={tw`px-5 pt-5`}>
                {/* Header */}
                <View>
                    <View style={tw`flex-row items-center mb-6`}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={tw`bg-PrimaryFocus rounded-full p-1`}>
                            <SvgXml xml={IconBack} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-lg font-bold ml-2`}>
                            Explain Membership
                        </Text>
                    </View>

                    {/* Input Fields */}
                    {fields.map((value, index) => (
                        <View key={index} style={tw`flex-row w-[100%] items-center p-3`}>
                            <View style={tw`w-3 h-3 rounded-full bg-white mr-3`} />
                            <TextInput
                                placeholder="Write it here"
                                placeholderTextColor="#ccc"
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                style={tw`flex-1 bg-neutral-900 text-white px-4 py-3 rounded-lg`}
                            />
                        </View>
                    ))}

                    {/* Add (+) Button */}
                    <TouchableOpacity
                        onPress={handleAddField}
                        style={tw`self-center bg-neutral-900 w-10 h-10 rounded-full items-center justify-center my-5`}
                    >
                        <SvgXml xml={IconPlus} />
                    </TouchableOpacity>
                </View>

                {/* Save Button */}
                {serviceSuccess ? (
                    ""
                ) : (
                    //      <TouchableOpacity
                    //     onPress={handleSave}
                    //     style={tw`bg-white rounded-xl py-4 mb-4 items-center`}
                    // >
                    //     <Text style={tw`text-black font-bold text-base`}>Save</Text>
                    // </TouchableOpacity>
                    <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
                        <TButton
                            onPress={handleSave}
                            titleStyle={tw`text-black font-bold text-center`}
                            title={isLoading ? "Saving..." : "Save"}
                            containerStyle={tw`bg-white w-[90%] rounded-full`}
                        />
                    </View>
                )}
                <NormalModal
                    layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                    containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                    visible={serviceCreationConfirmationModalVisible}
                    setVisible={setServiceCreationConfirmationModalVisible}>
                    <View>
                        <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                            Service created succcessfully
                        </Text>

                        <View style={tw`mt-2`}>
                            <View style={tw`border-t-2 border-gray-800 w-full`}>

                            </View>
                            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
                                <Button
                                    title="Continue"
                                    style={tw`text-white px-6`}
                                    containerStyle={tw`bg-gray-900`}
                                    onPress={() => {
                                        setServiceCreationConfirmationModalVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </NormalModal>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ExplainMembershipScreen;
