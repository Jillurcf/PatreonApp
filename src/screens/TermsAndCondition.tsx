import {
  Alert,
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
import { useTranslation } from "react-i18next";
import { RadioButton } from 'react-native-ui-lib';
import TButton from '../components/TButton';
// import RadioButtonRN from 'radio-buttons-react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

type Props = {};

const TermsAndCondition = ({ navigation }: { navigation: any }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { t } = useTranslation();
  const handleRadioButtonPress = (option: string) => {
    setSelectedOption(option);
  };

  const handleDownload = async () => {
    try {
      const destPath = RNFS.CachesDirectoryPath + '/pp.pdf';

      // Copy from assets to cache
      await RNFS.copyFileAssets('pp.pdf', destPath);

      // Open share dialog
      await Share.open({
        url: 'file://' + destPath,
        type: 'application/pdf',
        title: 'Share PDF',
      });

    } catch (error) {
      console.log('Error downloading PDF:', error);
      // Alert.alert('Error', 'Could not download or share PDF.');
    }
  }
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
          {/* Terms & Agreements */}
          {/* {t("Terms & Agreements")} */}
          {t("terms_agreements")}
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* ======================================Content area ======================= */}

      <View style={tw`my-6`}>
        <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
          1. Introduction
        </Text>
        <Text style={tw`text-white mt-4 font-AvenirLTProBlack`}>
          1.1. By using or accessing the Between AI Agent Marketplace (the “Marketplace”) and/or
          downloading or using any applications, tools, configurations, features, software,
          products, source code, agents, code, use cases and services provided through the
          Marketplace (collectively “Marketplace Services”), you acknowledge and agree that
          you have read, understood, and agree to the terms of service outlined below (“Terms”).
          This agreement is effective between you and Betweenai Limited (“we”, “us” “our”) as
          of the date of your accepting these Terms. Additional terms may apply...
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleDownload}
        style={tw`bg-PrimaryFocus p-4 rounded-2xl mb-10`}
      >
        <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
          Read more? Download TOS as PDF
        </Text>
      </TouchableOpacity>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
