


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
            <View style={tw`my-6`}>
                <Text style={tw`text-white font-AvenirLTProBlack text-xl`}>
                    1. Introduction
                </Text>
                <Text style={tw`text-white mt-4 font-AvenirLTProBlack`}>
                    1.1. Unless otherwise defined in this Privacy Policy, capitalized terms shall have the same
                    meaning as set forth in the Terms of Use of the Between AI Agent Marketplace....
                </Text>
            </View>

            {/* Download Button */}
            <TouchableOpacity
                onPress={handleDownload}
                style={tw`bg-PrimaryFocus p-4 rounded-2xl mb-10`}
            >
                <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                    Read more? Download PP as PDF
                </Text>
            </TouchableOpacity>

            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
