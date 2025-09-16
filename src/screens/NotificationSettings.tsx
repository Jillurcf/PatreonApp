import {
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  IconAple,
  IconBack,
  IconGoogle,
  IconLanguage,
  IconNotification,
  IconPaymentMethod,
  IconPaypal,
  IconSettingNotificaiton,
  IconTermsAndCondition,
} from '../assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {RadioButton} from 'react-native-ui-lib';
import TButton from '../components/TButton';
// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const NotificationSettings = ({navigation}: {navigation:any}) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(false);

  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              console.log('No screen to go back to');
              // Optionally, navigate to a default screen:
              // navigation.navigate('HomeScreen');
            }
          }}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Notifiaciton
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================setting  area ======================= */}

      <View style={tw`items-center justify-center my-6`}>
        <View style={tw`bg-[#262329] w-[100%] rounded-2xl p-4  my-2`}>
      
            <Text style={tw`text-lg font-AvenirLTProBlack text-white mb-4`}>
              Notification name
            </Text>

            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-white font-MontserratRegular`}>
              Notification name
              </Text>
              <Switch
                 trackColor={{false: 'gray', true: 'white'}} // Custom track colors
                 thumbColor={pushEnabled    ? 'black' : 'white'} // Custom thumb color
                value={pushEnabled}
                onValueChange={setPushEnabled}
              />
            </View>

            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-white font-MontserratRegular`}>
              Notification name
              </Text>
              <Switch
                trackColor={{false: 'gray', true: 'white'}} // Custom track colors
                thumbColor={emailEnabled ? 'black' : 'white'} // Custom thumb color
                value={emailEnabled}
                onValueChange={setEmailEnabled}
              />
            </View>

            <View style={tw`flex-row justify-between items-center`}>
              <Text style={tw`text-white`}> Notification name</Text>
              <Switch
                trackColor={{false: 'gray', true: 'white'}} // Custom track colors
                thumbColor={inAppEnabled ? 'black' : 'white'} // Custom thumb color
                value={inAppEnabled}
                onValueChange={setInAppEnabled}
              />
            </View>
          </View>
  
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({});
