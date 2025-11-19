import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { SvgXml } from 'react-native-svg';

import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

import { TextArea } from 'react-native-ui-lib';
import { Dropdown } from 'react-native-element-dropdown';
import { useGetServicesByIdQuery, useUpdateServicesByIdMutation, } from '../redux/apiSlice/serviceSlice';
import tw from '../lib/tailwind';
import { IconBack, IconDollar, IconPlus, IconUpload } from '../assets/icons/icons';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';




const data = [
    { label: 'marketing', value: '1' },
    { label: 'finance', value: '2' },
    { label: 'law', value: '3' },
    { label: 'economy', value: '4' },
    { label: 'writing', value: '5' },
    { label: 'business', value: '6' },
];

type Props = {};


const EditService = ({ navigation, route }: { navigation: any }) => {
    const { id, } = route?.params || {};
    // console.log(id, "id==================")
    const isMounted = useRef(true);
    const [fields, setFields] = useState(['', '', '']);
    const [serviceCreationConfirmationModalVisible, setServiceCreationConfirmationModalVisible] =
        useState(false);
    const [promptInput, setPromptInput] = useState('');
    const [selectedPdf, setSelectedPdf] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selectedImages, setSelectedImages] = useState();
    const { data: serviceData } = useGetServicesByIdQuery(id)
    const [services, setServices] = useState({})
    const [updateError, setUpdateError] = useState();
    const colorScheme = useColorScheme(); // 'dark' or 'light'
    const isDarkMode = colorScheme === 'dark';
    const [updateServicesById] = useUpdateServicesByIdMutation()
    // console.log(services?._id, "services=====================")
    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: '',
        category: '',
    });
    // console.log(value, "value=====================")
    const renderItem = (item) => (
        <View
            style={[
                styles.item,
                {
                    backgroundColor: isDarkMode ? '#222' : '#222',
                },
            ]}
        >
            <Text style={{ color: isDarkMode ? '#fff' : '#fff', padding: 10 }}>{item.label}</Text>
        </View>
    );

    // console.log(value, "value=====================")
    const [initialized, setInitialized] = useState(false); // to prevent overwriting on every render
    useEffect(() => {
        const service = serviceData?.data;
        setServices(service);
        if (service && !initialized) {
            setValue(prev => ({
                ...prev,
                title: service.title || '',
                subtitle: service.subtitle || '',
                currency: service.price?.toString() || '',
                price: service.price?.toString() || '',
                description: service.description || '',
                category: data.find(cat => cat.label.toLowerCase() === service.category?.toLowerCase())?.value || '',

            }));
            setPromptInput(service.about || '');
            // Handle preloading PDF
            if (service.files && service.files.length > 0) {
                const filePath = service.files[0].replace(/\\/g, '/'); // Replace Windows-style paths
                const localPath = `file://${filePath}`;
                setSelectedPdf({
                    uri: localPath,
                    name: localPath.split('/').pop(),
                });
            }

            // ✅ Set existing fields
            if (Array.isArray(service.explainMembership)) {
                setFields(service.explainMembership);
            } else {
                setFields([]); // Or default to a single empty field
            }
            setInitialized(true);
        }
    }, [serviceData?.data]);


    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleUploadPdf = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
            });

            // Create a local path in app cache
            const destPath = `${RNFS.CachesDirectoryPath}/${res.name}`;

            // Copy the file to the cache directory
            await RNFS.copyFile(res.uri, destPath);

            const fileData = {
                uri: `file://${destPath}`,
                name: res.name,
                type: res.type,
                size: res.size,
            };

            console.log('PDF selected:', fileData.uri);
            setSelectedPdf(fileData);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled picker');
            } else {
                console.error('Error selecting PDF:', err);
                Alert.alert('Error', 'Failed to upload PDF file');
            }
        }
    };

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
            // formData.append('explainMembership', fields)
            formData.append("explainMembership", JSON.stringify(fields));
            const res = await updateServicesById({ id, data: formData })
            console.log(res?.data, "res++++++++++++++++")
            if (res?.data.success === true) {
                navigation?.navigate('SettingProfile');
                setServiceCreationConfirmationModalVisible(true)
                console.log("Service updated succcessfully")
            } else if (res?.data?.error) {
                setUpdateError(res?.data?.error)
            }
            console.log(formData, "formData==================")


        } catch (err) {
            console.log(err)
        }
        console.log('Saved fields:', fields);
        // Save logic here
    };


    return (
        <ScrollView contentContainerStyle={tw` bg-black px-[4%] pb-20`}>
            <StatusBar translucent={false} />
            {/* Header */}
            <View>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-black rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
                        Edit service
                    </Text>
                    <View style={tw`w-8`} />
                </View>
            </View>

            {/* Prompt Input */}
            <View style={tw`mt-8`}>
                <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Edit Instruction</Text>
                <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
                    <TextInput
                        defaultValue={services?.about}
                        onChangeText={setPromptInput}
                        style={tw`text-left h-40 text-white`}
                        placeholder="Write it here"
                        placeholderTextColor="#c7c7c7"
                        multiline
                        maxLength={120}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* File Upload */}
            <View style={tw`my-6`}>
                <Text style={tw`text-white font-AvenirLTProBlack`}>Uploaded Knowledge</Text>
                <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
                    <TouchableOpacity onPress={handleUploadPdf}>
                        <SvgXml xml={IconUpload} />
                    </TouchableOpacity>
                    <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>
                    {selectedPdf?.name && (
                        <Text style={tw`text-gray-300 text-sm`}>{selectedPdf.name}</Text>
                    )}
                </View>
            </View>

            {/* Title */}
            <View style={tw``}>
                 <Text style={tw`text-white font-AvenirLTProBlack mb-2`}>Edit Title</Text>
                <TextInput
                    style={tw`w-full h-12 border text-white bg-[#262329] border-[#565358] rounded-xl px-2`}
                    placeholder="Write title here"
                    placeholderTextColor={'white'}
                    defaultValue={services?.title}
                    // value={services.title}
                    onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
                />
            </View>

            
            {/* Description */}
            <View style={tw`mt-8`}>
                 <Text style={tw`text-white font-AvenirLTProBlack mb-2`}>Edit Description</Text>
                <View style={tw`h-auto p-2 bg-[#FFFFFF] border border-[#565358] w-full rounded-lg`}>
                    <TextArea

                        style={tw`text-left h-40 text-black`}
                        placeholder={'Write description here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                        multiline
                        maxLength={9000}
                        defaultValue={services?.description}
                        // value={value?.description}
                        onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* Dropdown */}
            <View style={tw`mt-8`}>
                 <Text style={tw`text-white font-AvenirLTProBlack mb-2`}>Edit Category</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#565358' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select category' : '...'}
                    searchPlaceholder="Search..."
                    value={value.category}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(prev => ({
                            ...prev,
                            category: item?.item, // ✅ Save only the selected value
                        }));
                        setIsFocus(false);
                    }}
                    renderItem={renderItem}
                />
            </View>
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
            {/* Save Button */}
            {updateError && (
                <Text style={tw`text-red-600 py-4`}>{updateError}*</Text>
            )}
            <TouchableOpacity
                onPress={handleSave}
                style={tw`bg-white rounded-xl py-4 items-center`}
            >
                <Text style={tw`text-black font-bold text-base`}>Save</Text>
            </TouchableOpacity>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                visible={serviceCreationConfirmationModalVisible}
                setVisible={setServiceCreationConfirmationModalVisible}>
                <View>
                    <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                        Service updated succcessfully
                    </Text>

                    <View style={tw`mt-2`}>
                        <View style={tw`border-t-2 border-[#565358] w-full`}>

                        </View>
                        <View style={tw`border-t-2 border-b-2 border-[#565358] w-full`}>
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
    );
};

export default EditService;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: '#565358',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#262329',
    },
    placeholderStyle: {
        color: '#c7c7c7',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: 'white',
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
