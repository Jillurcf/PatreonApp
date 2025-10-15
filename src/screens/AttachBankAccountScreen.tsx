import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../assets/icons/icons'
import { Formik } from 'formik'
import Button from '../components/Button'
import { useAttachBankAccountMutation } from '../redux/apiSlice/paymentSlice'
import NormalModal from '../components/NormalModal'

type Props = {}

const AttachBankAccountScreen = ({ navigation }: { navigation: any }) => {
    const [attachBankAccount, {isLoading}] = useAttachBankAccountMutation();
    const [accountConfirmationModalVisible, setAccountConfirmationModalVisible] =
        useState(false);
    const [updatedValue, setUpdatedValue] = useState<string | null>(null);
    const [updatedResponse, setUpdatedResponse] = useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    console.log(error, "Update Recipient Error+++++++++++++++++++");
    console.log(updatedValue, "Updated Value+++++++++++++++++++");
    const submitForm = async (values: any, { resetForm }: any) => {
        console.log(values, "Update Recipient Values");
        setUpdatedValue(values)

        try {
            const response = await attachBankAccount(values).unwrap();
            setUpdatedResponse(response?.data)
            console.log(response, "Update Recipient Response");
            if (response?.success === true) {
                setAccountConfirmationModalVisible(true);
                resetForm();
                // navigation.navigate('AttachBankAccount');
                setError(null);
            }

        } catch (error) {
            // Alert.alert('Error', 'Failed to update recipient details');
            console.error('Update Recipient Error:', error);
            setError(error?.data?.message);
        }
    };
    return (
        <View style={tw`bg-black flex-1`}>
            <View style={tw`flex-row w-full justify-between mt-4 px-[4%] items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`bg-black rounded-full p-1`}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <Text style={tw`text-white font-AvenirLTProBlack text-lg`}>
                    Attach Bank Account
                </Text>
                <View style={tw`w-8`} />
            </View>
            <Formik
                initialValues={{
                    sort_code: '',
                    account_number: '',

                }}
                onSubmit={submitForm}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <ScrollView style={tw`p-4 bg-black mt-6`}>
                        {/* First Name */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Routing Number</Text>
                        <TextInput
                            style={tw` text-white rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="108800"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('sort_code')}
                            onBlur={handleBlur('sort_code')}
                            value={values.sort_code}
                        />

                        {/* Last Name */}
                        <Text style={tw`mb-1 font-AvenirLTProHeavy text-white`}>Account Number</Text>
                        <TextInput
                            style={tw` text-white rounded-xl p-2 mb-4 bg-[#262329]`}
                            placeholder="00012345"
                            placeholderTextColor={'#A9A8AA'}
                            cursorColor="white"
                            onChangeText={handleChange('account_number')}
                            onBlur={handleBlur('account_number')}
                            value={values.account_number}
                        />

                        {/* Submit Button */}
                        {error && (
                            <Text style={tw`text-red-500 text-xs my-2`}>
                                {error}*
                            </Text>
                        )}
                        <Button
                            containerStyle={tw`py-3`}
                            titleStyle={tw`font-AvenirLTProHeavy`}
                            onPress={handleSubmit} // Formik's handleSubmit
                            title={isLoading ? "Saving..." :"Save"}
                        />

                    </ScrollView>
                )}
            </Formik>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                visible={accountConfirmationModalVisible}
                setVisible={setAccountConfirmationModalVisible}>
                <View>
                    <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                        Please confirm and store the inforamtion for furtue reference.
                    </Text>

                    <View style={tw`mt-2`}>
                        <View style={tw`border-t-2 border-[#565358] w-full`}>
                            <Text style={tw`text-white text-xs font-RoboBold my-2`}>Account number: {updatedValue?.account_number}</Text>
                            <Text style={tw`text-white text-xs font-RoboBold `}>Routing number: {updatedValue?.sort_code}</Text>
                            <Text style={tw`text-white text-xs font-RoboBold my-2`}>Account Id: {updatedResponse?.id}</Text>
                        </View>
                        <View style={tw`border-t-2 border-b-2 border-[#565358] w-full`}>
                            <Button
                                title="Done"
                                style={tw`text-white px-6`}
                                containerStyle={tw`bg-gray-900`}
                                onPress={() => {
                                    setAccountConfirmationModalVisible(false);
                                    navigation.navigate('SettingProfile');
                                }}
                            />
                        </View>
                    </View>
                </View>
            </NormalModal>
            <StatusBar backgroundColor="black" translucent />
        </View>
    )
}

export default AttachBankAccountScreen

const styles = StyleSheet.create({})