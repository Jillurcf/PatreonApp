import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { loadMediaPromptData, saveMediaPromptData } from '../utils';
import { SvgXml } from 'react-native-svg';
import { NavigProps } from '../interface/NaviProps';
import Textarea from 'react-native-textarea';

import {
  BulbIcon,
  CrossIcon,
  Gallery,
  IconBack,
  IconUpload,
  StillCamera,
  VideoCam,
} from '../assets/icons/icons';
import IButton from '../components/IButton';
import TButton from '../components/TButton';
import tw from '../lib/tailwind';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';


const EnterInput = ({ navigation }: NavigProps<null>) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [promptInput, setPromptInput] = useState("")
  console.log(promptInput, "input========================")
const allData = {selectedPdf, promptInput}


  

  const handleUploadPdf = async () => {
    
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      // Create a local path in app cache
      const destPath = `${RNFS.CachesDirectoryPath}/${res.name}`;

      // Copy the file to the cache directory
      await RNFS.copyFile(res.uri, destPath);

      const fileData = {
        uri: `file://${destPath}`,
        name: res.name,
        type: res.type,
        size: res.size,
      };

      console.log('PDF selected:', fileData.uri);
      setSelectedPdf(fileData);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picker');
      } else {
        console.error('Error selecting PDF:', err);
        Alert.alert('Error', 'Failed to upload PDF file');
      }
    }
  };
  const handleSave = () => {
    if(!allData.selectedPdf || !allData.promptInput) {
      Alert.alert('Error', 'Please fill in all fields before uploading.');
      return;
    }
    console.log(selectedPdf, promptInput, 'data before sending ==========');
    saveMediaPromptData(selectedPdf, null, promptInput);
    const { selectedImages: savedImages, promptInput: savedPrompt } = loadMediaPromptData();
    console.log(savedImages, savedPrompt, 'Retrieved data from storage ++++++++');
    Alert.alert('Saved', 'Your data has been saved successfully!');
    navigation?.navigate('ExplainMembership');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-black`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow bg-black items-center justify-between px-4`}
        keyboardShouldPersistTaps="handled">
        <View style={tw`my-10`}>
          <View style={tw`flex-row w-full justify-between mt-4`}>
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={tw`bg-PrimaryFocus rounded-full p-1`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
              Enter Input
            </Text>
            <View style={tw`w-8`} />
          </View>

          {/* Input Area */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Instruction</Text>
            <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
              <TextInput
                onChangeText={(text) => setPromptInput(text)}
                style={tw`text-left h-40 text-white`}
                placeholder="Write it here"
                placeholderTextColor="#c7c7c7"
                underlineColorAndroid="transparent"
                multiline
                maxLength={1000}
                textAlignVertical="top"
              />
              {!promptInput && (
                <Text style={tw`text-red-600 text-xs mt-2`}>
                  Please enter your instruction here.*
                </Text>
              )}
            </View>
          </View>

          {/* Media Upload */}
          <View style={tw`my-6`}>
            <Text style={tw`text-white font-AvenirLTProBlack`}>Upload Knowledge</Text>
            <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
              <View style={tw`flex-row gap-6`}>
                {/* <IButton containerStyle={tw`p-4 rounded-full`} svg={Gallery} onPress={openGallery} /> */}
                <TouchableOpacity onPress={handleUploadPdf}>

                  <SvgXml xml={IconUpload} />
                </TouchableOpacity>
              </View>
              <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>


            </View>
            {!selectedPdf && (
              <Text style={tw`text-red-600 text-xs mt-2`}>
                Please upload a PDF file.*
              </Text>)}
          </View>
        </View>
        {selectedPdf && (
          <View style={tw`w-full h-[500px] mt-4`}>
            <Pdf
              source={{ uri: selectedPdf.uri }}
              style={{ flex: 1 }}
              onError={(error) => console.error('PDF error:', error)}
            />
          </View>
        )}

        {/* Continue Button */}
        <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
          <TButton
            onPress={handleSave}
            titleStyle={tw`text-black font-bold text-center`}
            title="Save"
            containerStyle={tw`bg-primary w-[90%] rounded-full`}
          />
        </View>

        <StatusBar backgroundColor={'gray'} translucent={false} />
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

export default EnterInput;
