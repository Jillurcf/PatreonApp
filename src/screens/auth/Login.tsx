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

import { Checkbox } from 'react-native-ui-lib';

import { SvgXml } from 'react-native-svg';



// import { useLoginUserMutation } from '@/src/redux/apiSlice/authSlice';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useLoginUserMutation } from '../../redux/apiSlice/authSlice';
import { getStorageToken, lStorage, setStorageToken } from '../../utils';
import tw from '../../lib/tailwind';
import { IconBack, IconCloseEye, IconEnvelope, iconLock, IconOpenEye } from '../../assets/icons/icons';
import InputText from '../../components/InputText';
import Button from '../../components/Button';


// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const Login = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loginError, setLoginError] = useState();
    const [loginUser, { isLoading, isError }] = useLoginUserMutation();
    console.log('27', email, password);
    // const data = {email, password, name:username, address:location}
    console.log(loginError, "loginError")
    const allFilled =
        email.trim() !== '' &&
        password.trim() !== ''

    console.log(allFilled, "allFilled")

    const handleLogin = async () => {
        if (!email || !password) {
            //   setAllFieldModalVisible(true)
            return;
        }
        // const fcmtoken = lStorage.getString('fcmToken')
        // console.log("fcmToken", fcmtoken)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        // formData.append('device_token', fcmtoken)

        console.log('FormData before sending:', formData);

        try {
            console.log("Try catch click")
            const res = await loginUser(formData).unwrap();
            console.log(res, "res+++++++++++++")
            // setLoginError(res)
            console.log("login res++++++++", res?.data?.token)
            if (res?.data?.token) {
                lStorage.setString('token', res?.data?.token);
                setStorageToken(res?.data?.token);
                const token = getStorageToken();
                console.log(token, "token++++++ after set")
                navigation.replace('LoadingSplash');
                navigation.replace('BottomRoutes');
            }

            console.log('Login successful:', res);

        } catch (error) {
            console.error('Login failed:', error);
            setLoginError(error?.data?.message);
        }
    };


    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
            <View>
                <View style={tw`flex-row w-full gap-2 justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                        Login into your account!
                    </Text>
                    {/* Placeholder view for symmetry */}
                    <View style={tw`w-8`} />
                </View>
                <View>


                    <View style={tw`mt-12`}>
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 bg-black border-b border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Email'}
                            iconLeft={IconEnvelope}
                            // iconRight={isShowPassword ? iconLock : iconLock}
                            onChangeText={(text: any) => setEmail(text)}
                        // isShowPassword={!isShowPassword}
                        // rightIconPress={() => setIsShowPassword(!isShowPassword)}
                        />
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none bg-black h-14 border-b border-[#565358]`}
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
                    </View>

                    <View style={tw`flex-row gap-1 mt-2 mb-4`}>
                        <Text style={tw`text-white text-xs`}>Do not have an account please </Text>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate({ pathname: "/screens/auth/Signup", params: { screenName: "signup" } })}>
                            onPress={() => navigation.navigate('Signup', {screenName: "signup"})}>

                            <Text style={tw`text-gray-400 text-xs underline`}>Signup</Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={tw`text-white`}>By logging in you accept our TOS & PP</Text>
                    {/* <View style={tw``}>
                        <Checkbox
                            value={checkValue}
                            onValueChange={setCheckValue}
                            label="By logging in you accept our TOS & PP"
                            labelStyle={tw`text-white`}
                            color="gray" // Tick color
                            containerStyle={tw`p-2`}
                            style={[
                                tw`border border-white`,
                                checkValue ? tw`bg-white` : tw`bg-none`,
                            ]}
                        />
                    </View> */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EmailVerification", { screenName: "forgetPass" })

                        }
                        style={tw`mt-8`}>
                        <Text style={tw`text-white`}>Forget password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tw`flex-col justify-end py-2`}>
                {loginError && (
                    <Text style={tw`text-red-600 text-xs ont-AvenirLTProBlack `}>{loginError}*</Text>
                )}
                <Button
                    disabled={!allFilled}
                    title={isLoading ? "Wait..." : 'Continue'}
                    style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                    containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                    onPress={handleLogin}
                />
            </View>
            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default Login;

