import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomRoutes from './BottomRoutes';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  IconDarawerUser,
  IconLogout,
  IconNotification,
  IconRightArrow,
  IconSettings,
  IconUser,
} from '../assets/icons/icons';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';
import { lStorage } from '../utils';
import CookieManager from '@react-native-cookies/cookies';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { apiSlice, usePostLogOutMutation } from '../redux/api/apiSlice/apiSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getStorageToken, removeStorageToken } from '../utils/Utils';

function DrawerContent({navigation}: any) {
  const [vacationMode, setVacationMode] = useState(true);
  const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
    useState(false);
 
  const handleLogout = () => {
    // Perform your logout logic here
    console.log('Logout pressed');
    setLogoutConfirmationModalVisible(false)
   navigation.replace('LoadingSplash')
    lStorage.removeItem('token')
    CookieManager.clearAll()
  };
  return (
    <View style={tw`px-4 py-8 h-full justify-between bg-[#000000]`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-row justify-end`}>
          <SvgXml xml={IconRightArrow} />
        </TouchableOpacity>
        <View style={tw`mt-4 gap-y-5`}>
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('SettingProfile', {
                // products: [...Array(10)],
                // title: 'I miei ordini',
                // from: 'myOrders',
              })
            }>
            <View style={tw`flex-row gap-4`}>
              <SvgXml xml={IconDarawerUser} />
              <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('Notification', {
                // products: [...Array(10)],
                // title: 'I miei ordini',
                // from: 'myOrders',
              })
            }>
            <View style={tw`flex-row gap-4`}>
              <SvgXml xml={IconNotification} />
              <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                Notification
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation?.navigate('Setting', {
                // products: [...Array(10)],
                // title: 'I miei ordini',
                // from: 'myOrders',
              })
            }>
            <View style={tw`flex-row gap-4`}>
              <SvgXml xml={IconSettings} />
              <Text style={tw`text-white text-xl font-AvenirLTProBlack`}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={tw`flex-row items-center gap-4`}
        onPress={() => setLogoutConfirmationModalVisible(true)}>
        <Text style={tw`text-white text-sm font-AvenirLTProBlack`}>
          Log Out
        </Text>
        <SvgXml xml={IconLogout} />
      </TouchableOpacity>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={logoutConfirmationModalVisible}
        setVisible={setLogoutConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
            Are you sure {'\n'} You want to logout?
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`border-t-2 border-gray-800 w-full`}>
              <Button
                title="Yes"
                style={tw`text-white`}
                containerStyle={tw`bg-transparent px-6`}
                onPress={ handleLogout}
              />
            </View>
            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
              <Button
                title="Cancel"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => {
                  setLogoutConfirmationModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
    </View>
  );
}

function DrawerRoute() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: tw`w-[70%] bg-white`,
      }}
      drawerContent={DrawerContent}>
      <Drawer.Screen name="BottomRoutes" component={BottomRoutes} />
    </Drawer.Navigator>
  );
}

export default DrawerRoute;
