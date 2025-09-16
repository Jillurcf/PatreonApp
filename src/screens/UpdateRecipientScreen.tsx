import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Formik } from 'formik';
import tw from '../lib/tailwind';
import { IconBack } from '../assets/icons/icons';
import Button from '../components/Button';
import { usePutUpdateRecipientMutation } from '../redux/apiSlice/paymentSlice';




const { height, width } = Dimensions.get('screen');

const UpdateRecipientScreen = ({ navigation }: { navigation: any }) => {
    const [putUpdateRecipient, { isLoading, isError }] = usePutUpdateRecipientMutation();
    const [error, setError] = React.useState<string | null>(null);
    console.log(error, "Update Recipient Error+++++++++++++++++++");

    // renamed so it doesn’t conflict with Formik’s handleSubmit
    const submitForm = async (values: any, { resetForm }: any) => {
        console.log(values, "Update Recipient Values");


        try {
            const response = await putUpdateRecipient(values).unwrap();
            //   Alert.alert('Success', 'Recipient details updated successfully');
            console.log(response?.success === true, "Update Recipient Response");
            if (response?.success === true) {
                resetForm();
                navigation.navigate('AttachBankAccount');
                setError(null);
            }

        } catch (error) {
            // Alert.alert('Error', 'Failed to update recipient details');
            console.error('Update Recipient Error:', error);
            setError(error?.data?.message);
        }
    };

    return (
        <ScrollView style={tw`bg-black flex-1 keyboardAvoidingView`}>
            {/* Header */}
            <View style={tw`flex-row w-full justify-between mt-4 px-[4%] items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`bg-black rounded-full p-1`}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <Text style={tw`text-white font-AvenirLTProBlack text-lg`}>
                    Update recipient details
                </Text>
                <View style={tw`w-8`} />
            </View>

            {/* Form */}
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    address_line1: '',
                    city: '',
                    state: '',
                    postal_code: '',
                    country: '',
                }}
                onSubmit={submitForm}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <ScrollView style={tw`p-4 bg-black mt-6`}>
                        {/* First Name */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>First Name</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="viga"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                        />

                        {/* Last Name */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Last Name</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="wak"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                        />

                        {/* Address Line 1 */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Address Line</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="221B Baker Street"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('address_line1')}
                            onBlur={handleBlur('address_line1')}
                            value={values.address_line1}
                        />

                        {/* City */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>City</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="London"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                        />

                        {/* State */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>State</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="England"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('state')}
                            onBlur={handleBlur('state')}
                            value={values.state}
                        />

                        {/* Postal Code */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Postal Code</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="NW1 6XE"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            // keyboardType="numeric"
                            onChangeText={handleChange('postal_code')}
                            onBlur={handleBlur('postal_code')}
                            value={values.postal_code}
                        />

                        {/* Country */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Country</Text>
                        <TextInput
                            style={tw`border text-white border-[#262329] rounded-xl p-2 mb-6 bg-[#262329]`}
                            placeholder="GB"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('country')}
                            onBlur={handleBlur('country')}
                            value={values.country}
                        />

                        {/* Submit Button */}
                        {error && (
                            <Text style={tw`text-red-500 text-xs my-2`}>
                                {error}*
                            </Text>
                        )}
                        <Button
                            containerStyle={tw`h-10`}
                            titleStyle={tw`font-AvenirLTProHeavy`}
                            onPress={handleSubmit} // Formik's handleSubmit
                            title={isLoading ? "Saving..." : "Save"}
                        />

                    </ScrollView>
                )}
            </Formik>

            <StatusBar backgroundColor="black" translucent />
        </ScrollView>
    );
};

export default UpdateRecipientScreen;
