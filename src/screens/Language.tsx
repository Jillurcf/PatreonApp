import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
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
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { RadioButton } from 'react-native-ui-lib';
import TButton from '../components/TButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slice/languageSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
// import RadioButtonRN from 'radio-buttons-react-native';

type Props = {};

const Language = ({ navigation }) => {
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const dispatch = useDispatch();
  // const currentLang = useSelector((state: any) => state.language.lang);
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // const handleRadioButtonPress = (option: string) => {
  //   setSelectedOption(option);
  const handleRadioButtonPress = (lang: string) => {
    dispatch(setLanguage(lang));
     setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };

  // };
  // const handleRadioButtonLanguage = (option1: string) => {
  //   setSelectedLanguage(option1);
  // };
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
          Language
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================Content area ======================= */}
      {/* ===================Suggested============ */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
          Suggested
        </Text>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            English (US)
          </Text>
          {/* <RadioButton
                          color="white"
                          selected={selectedOption === 'english_us'}
                          onPress={() => handleRadioButtonPress('english_us')}
                        /> */}
          <RadioButton
            color="white"
            selected={currentLang === "enUS"}
            onPress={() => handleRadioButtonPress("enUS")}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            English (UK)
          </Text>
          {/* <RadioButton
            color="white"
            selected={selectedOption === 'english_uk'}
            onPress={() => handleRadioButtonPress('english_uk')}
          /> */}
          <RadioButton
            color="white"
            selected={currentLang === "enUK"}
            onPress={() => handleRadioButtonPress("enUK")}
          />
        </View>
      </View>
      {/* ===================Suggested============ */}
      {/* <View style={tw`mt-8`}>
        <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
          Language
        </Text>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Mandarin
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'mandarin'}
            onPress={() => handleRadioButtonLanguage('mandarin')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Hindi
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'hindi'}
            onPress={() => handleRadioButtonLanguage('hindi')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Spanish
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'spanish'}
            onPress={() => handleRadioButtonLanguage('spanish')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            French
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'french'}
            onPress={() => handleRadioButtonLanguage('french')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Arabic
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'arabic'}
            onPress={() => handleRadioButtonLanguage('arabic')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Bengali
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'bengali'}
            onPress={() => handleRadioButtonLanguage('bengali')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Russian
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'russian'}
            onPress={() => handleRadioButtonLanguage('russian')}
          />
        </View>
        <View style={tw`mt-4 flex-row justify-between`}>
          <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
            Indonesia
          </Text>
          <RadioButton
            color="white"
            selected={selectedLanguage === 'indonesia'}
            onPress={() => handleRadioButtonLanguage('indonesia')}
          />
        </View>
      </View> */}

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({});
