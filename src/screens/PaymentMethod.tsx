import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    IconAple,
    IconBack,
    IconGoogle,
    IconPaypal,
    IconRightArrow,
    IconVisa,
  } from '../assets/icons/icons';
  import {SvgXml} from 'react-native-svg';
  import tw from '../lib/tailwind';
  import {RadioButton} from 'react-native-ui-lib';
  import TButton from '../components/TButton';
  // import RadioButtonRN from 'radio-buttons-react-native';
  
  type Props = {};
  
  const data = [{label: 'Option 1'}];
  const PaymentMethod = ({navigation}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    const handleRadioButtonPress = (option: string) => {
      setSelectedOption(option);
    };
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
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
            Payment Method
          </Text>
          {/* Placeholder view for symmetry */}
          <View style={tw`w-8`} />
        </View>
        {/* ======================================payment area ======================= */}
        <View style={tw`flex-col justify-between h-[90%]`}>
          <View style={tw`items-center justify-center my-12`}>
            <View
              style={tw`bg-[#262329] w-[100%] rounded-2xl p-2 flex-row items-center justify-between my-2`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml width={30} xml={IconPaypal} />
                <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                  Paypal
                </Text>
              </View>
              <SvgXml xml={IconRightArrow}/>
            </View>
            <View
              style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml width={30} xml={IconGoogle} />
                <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                  Google
                </Text>
              </View>
              <SvgXml xml={IconRightArrow}/>
            </View>
            <View
              style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml width={30} xml={IconAple} />
                <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                  Apple
                </Text>
              </View>
              <SvgXml xml={IconRightArrow}/>
            </View>
            <View
              style={tw`bg-[#262329] w-[100%] rounded-2xl px-2 py-4 flex-row items-center justify-between my-2`}>
              <View style={tw`flex-row gap-2 items-center`}>
                <SvgXml width={30} xml={IconVisa} />
                <Text style={tw`text-white text-lg font-AvenirLTProBlack`}>
                  Visa/Master card
                </Text>
              </View>
              <SvgXml xml={IconRightArrow}/>
            </View>
          </View>
         
        </View>
        <StatusBar backgroundColor="black" translucent />
      </View>
    );
  };
  
  export default PaymentMethod;
  
  const styles = StyleSheet.create({});
  