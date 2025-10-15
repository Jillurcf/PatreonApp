


import React from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import tw from '../lib/tailwind';
import { IconBack } from '../assets/icons/icons';
import PrivacyPolicyHtmlToText from '../components/PrivacyPolicyHtmlToText';


const PrivacyPolicy = ({ navigation }: { navigation: any }) => {
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
        <ScrollView style={tw`flex-1 bg-black px-[4%]`}>
            {/* Header */}
            <View style={tw`flex-row w-full justify-between mt-4`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`bg-black rounded-full p-1`}
                >
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                    Privacy policy
                </Text>
                <View style={tw`w-8`} />
            </View>

            {/* Content */}
            <ScrollView style={{ flex: 1, padding: 15, backgroundColor: '#0000' }}>
                <PrivacyPolicyHtmlToText />
            </ScrollView>

            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
