import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { useChangePasswordMutation } from '../../redux/apiSlice/authSlice';
import tw from '../../lib/tailwind';
import InputText from '../../components/InputText';
import { IconBack, IconCloseEye, iconLock, IconOpenEye } from '../../assets/icons/icons';
import Button from '../../components/Button';
import NormalModal from '../../components/NormalModal';



// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const ForgetPass = ({ navigation, route }: any) => {
    // console.log('navigation', navigation);
    const [resetPaswordModalVisible, setresetPaswordModalVisible] =
        useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState()
    const [checkValue, setCheckValue] = useState(false);
    const { screenName, phoneNumber } = route?.params || {};
    console.log(phoneNumber, "phoneNumber++++++")
    const [changePassword, { isLoading, isError }] = useChangePasswordMutation();
    console.log('27', password, confirmPassword);
    // const data = {email, password, name:username, address:location}

    const allFilled =
        password.trim() !== ''
    confirmPassword.trim() !== ''

    console.log(allFilled, "allFilled")

    const handleChangePassword = async () => {
        console.log('clicked');
        try {
            console.log('handleChangePassword called');
            const formData = new FormData();
            formData.append('phoneNumber', phoneNumber);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);
            console.log(formData, "formData+++++")
            const response = await changePassword(formData)
            console.log('Response:++++++++++++++', response?.error?.data?.message);
            if (response?.data?.success) {
                console.log(response?.data?.success === true, "response?.data?.data?.success === true")
                navigation?.navigate("Login");
            } else {
                console.log('Please fill all fields');
                setErrorMessage(response?.error)
            }
            //   navigation?.navigate("Login");
            // const response = await fetch("http://10.0.80.85:3004/api/auth/reset-password", {
            //     method: "POST",
            //     body: formData,
            //     // ❌ Don't set Content-Type manually
            //   });
            //   console.log(response, "response+++++")
            // Validate required fields before sending the request


        } catch (err) {
            console.log('Error:=============', err);
            // setErrorMessage(err)
            // Alert.alert('Error', 'An error occurred while changing password');
        }
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
            <View>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation?.goBack()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                        Reset your password
                    </Text>
                    {/* Placeholder view for symmetry */}
                    <View style={tw`w-8`} />
                </View>
                <View>


                    <View style={tw`mt-12`}>

                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Password'}
                            iconLeft={iconLock}
                            iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setPassword(text)}
                            isShowPassword={!isShowPassword}
                            rightIconPress={() =>
                                setIsShowPassword(!isShowPassword)
                            }
                        />
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-[#262329] h-14 border border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Confirm Password'}
                            iconLeft={iconLock}
                            iconRight={isShowConfirmPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setConfirmPassword(text)}
                            isShowPassword={!isShowConfirmPassword}
                            rightIconPress={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                        />
                    </View>


                </View>
            </View>
            <View style={tw`flex-col justify-end `}>
                {errorMessage?.data?.message && (
                    <Text style={tw`text-red-600 text-xs`}>{errorMessage?.data?.message}*</Text>
                )}
                <Button
                    disabled={!allFilled}
                    title={'Continue'}
                    style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                    containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                    onPress={handleChangePassword}

                />
            </View>
            <NormalModal
                layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
                containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
                visible={resetPaswordModalVisible}
                setVisible={setresetPaswordModalVisible}>
                <View>
                    <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
                        Password changed successfully!
                    </Text>

                    <View style={tw`mt-2`}>

                        <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
                            <Button
                                title="Ok"
                                style={tw`text-white px-6`}
                                containerStyle={tw`bg-gray-900`}
                                onPress={() => {
                                    setresetPaswordModalVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </NormalModal>
            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default ForgetPass;
