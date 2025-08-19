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
import PaymentMethod from '../screens/PaymentMethod';
import PaymentMethodScreen from '../screens/PaymentMetodScreen';
import WithdrawScreen from '../screens/Withdrawscreen';
import WithdrawScreen1 from '../screens/WithdrawScreen1';
import WithdrawScreen2 from '../screens/WithdrawSceen2';
import PaymentDetails from '../screens/PaymentDetails';
import LoadingSplash from '../screens/LoadingSplash';
import PhoneVerification from '../screens/auth/PhoneVerificationScreen';
import ForgetPass from '../screens/auth/ForgetPasswordScreen';
import ExplainMembershipScreen from '../screens/ExplainMembership1';
import MyServices from '../screens/MyService';
import EditService from '../screens/EditService';
import HomeSearchResult from '../screens/HomeSearchResult';
import UpdateRecipientScreen from '../screens/UpdateRecipientScreen';
import AttachBankAccountScreen from '../screens/AttachBankAccountScreen';
import MyAccount from '../screens/MyAccount';
// import { StripeProvider } from '@stripe/stripe-react-native';




const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
//   <StripeProvider publishableKey='pk_test_51Q51euIE7z8j8FQDRAixwTBcDJS0zyz8wjvgZVn64nZKzjxyVSdzEPIccMiD3hND02GAHRU8y2eB92YO1tcL1PQk00M6ydxlfZ
//  '>
 <Stack.Navigator
    
      screenOptions={{headerShown: false,
        animation: 'slide_from_right'
      }}
      initialRouteName="LoadingSplash"
      >
        <Stack.Screen name="LoadingSplash" component={LoadingSplash}
         />
    
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="PhoneVerifation" component={PhoneVerification} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="Popup" component={PopupScreen} />
      <Stack.Screen name="Drawer" component={DrawerRoute} />
      <Stack.Screen name="DiscoverResult" component={DiscoverResult} />
      <Stack.Screen name="HomeSearchResult" component={HomeSearchResult} />

      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="SettingProfile" component={SettingProfile} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="MyService" component={MyServices} />
      <Stack.Screen name="EditService" component={EditService} />
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
      <Stack.Screen name="UpdateRecipient" component={UpdateRecipientScreen} />
      <Stack.Screen name="AttachBankAccount" component={AttachBankAccountScreen} />

      <Stack.Screen name="EnterInput" component={EnterInput} />
      <Stack.Screen name="ExplainMembership" component={ExplainMembership} />
      <Stack.Screen name="ExplainMembership1" component={ExplainMembershipScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen name="WithdrawScreen1" component={WithdrawScreen1} />
      <Stack.Screen name="WithdrawScreen2" component={WithdrawScreen2} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      
      
      {/* <Stack.Screen name="BottomRoutes" component={BottomRoutes} /> */}
      

    </Stack.Navigator>
  // </StripeProvider>
   
 
  );
}
