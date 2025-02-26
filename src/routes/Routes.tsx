import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerRoute from './DrawerRoutes';
import Onboarding1 from '../screens/auth/Onboarding1';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import VerifyScreen from '../screens/auth/VerifyScreen';
import PopupScreen from '../screens/auth/PopupScreen';
import Notification from '../screens/Notification';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentResult from '../screens/PaymentResult';
import Settings from '../screens/Settings';
import TermsAndCondition from '../screens/TermsAndCondition';
import Language from '../screens/Language';
import NotificationSettings from '../screens/NotificationSettings';
import MessageScreen from '../screens/MessageScreen';
import DiscoverResult from '../screens/DiscoverResult';
import SettingProfile from '../screens/SettingProfile';
import Subscriber from '../screens/Subscriber';
import EditProfile from '../screens/EditProfile';
import BecomeContributor from '../screens/BecomeContributor';
import EnterInput from '../screens/EnterInputScreen';
import ExplainMembership from '../screens/ExplainMembership';




const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    // <StripeProvider publishableKey="pk_test_51QKAtBKOpUtqOuW1x5VdNqH3vG7CZZl1P6V3VuV1qsRUmPLNk26i34AXeu2zCO3QurFJAOZ9zfb0EkWeCVhqBYgH008X41cXr6">
    <Stack.Navigator
    
      screenOptions={{headerShown: false,
        animation: 'slide_from_left'
      }}
    //   initialRouteName="LoadingSplash"
      >
        {/* <Stack.Screen name="LoadingSplash" component={LoadingSplash}
         /> */}
    
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Popup" component={PopupScreen} />
      <Stack.Screen name="Drawer" component={DrawerRoute} />
      <Stack.Screen name="DiscoverResult" component={DiscoverResult} />

      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SettingProfile" component={SettingProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentResult" component={PaymentResult} />
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="NotificationSetting" component={NotificationSettings} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="Subscriber" component={Subscriber} />
      <Stack.Screen name="BecomeContributor" component={BecomeContributor} />
      <Stack.Screen name="EnterInput" component={EnterInput} />
      <Stack.Screen name="ExplainMembership" component={ExplainMembership} />
      
      
      {/* <Stack.Screen name="BottomRoutes" component={BottomRoutes} /> */}
      

    </Stack.Navigator>
    // </StripeProvider>
  );
}
