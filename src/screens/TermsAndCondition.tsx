import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  IconBack,
} from '../assets/icons/icons';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { useTranslation } from "react-i18next";
import HtmlToText from '../components/HtmlToText';

type Props = {};

const TermsAndCondition = ({ navigation }: { navigation: any }) => {

  const { t } = useTranslation();
 
 
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
      <ScrollView style={{ flex: 1, padding: 15, backgroundColor: '#0000' }}>
        <HtmlToText />
      </ScrollView>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
