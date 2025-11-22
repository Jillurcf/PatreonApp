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
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';


const EnterInput = ({ navigation }: NavigProps<null>) => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [promptInput, setPromptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputConfirmationModalVisible, setInputConfirmationModalVisible] =
    useState(false);
  const [value, setValue] = useState<{ title: string }>({ title: '' });


  console.log(promptInput, "input========================")
  const allData = { selectedPdf, promptInput }

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
        // Alert.alert('Error', 'Failed to upload PDF file');
      }
    }
  };
  // const handleSave = async () => {
  //   if (!selectedPdf || !promptInput || !value?.title) {
  //     console.log(
  //       'Error',
  //       'Please upload a PDF, enter a title, and provide prompt input before saving.'
  //     );
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     await saveMediaPromptData(selectedPdf, null, promptInput, value);
  //     const { selectedImages: savedImages, promptInput: savedPrompt, title } = loadMediaPromptData();

  //     console.log(savedImages, savedPrompt, title, 'Retrieved data from storage ++++++++');
  //     setInputConfirmationModalVisible(true);
  //     navigation?.navigate('ExplainMembership');
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }

  // };

  const handleSave = async () => {
    if (!selectedPdf || !promptInput || !value?.title) {
      console.log(
        'Error',
        'Please upload a PDF, enter a title, and provide prompt input before saving.'
      );
      return;
    }

    setLoading(true);

    try {
      await saveMediaPromptData(selectedPdf, null, promptInput, value);

      const data = loadMediaPromptData();
      console.log(
        data.selectedImages,
        data.promptInput,
        data.title,
        'Retrieved data from storage ++++++++'
      );

      setInputConfirmationModalVisible(true);
      navigation.navigate('ExplainMembership');
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
    }
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
              style={tw`bg-black rounded-full p-1`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
              Enter Input
            </Text>
            <View style={tw`w-8`} />
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-white font-bold text-xs mt-4`}>Title</Text>
            <TextInput
              style={tw`mt-1 w-full h-12 text-white bg-[#262329] rounded-xl px-3`}
              placeholder="Write title here"
              placeholderTextColor="white"
              value={value.title}
              onChangeText={text => setValue({ ...value, title: text })}
            />
          </View>
          {!value?.title?.trim() && (
            <Text style={tw`text-red-600 text-xs mt-2`}>
              Please enter a title.*</Text>
          )}
          {/* Input Area */}
          <View style={tw``}>
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Add Instruction</Text>
            <View style={tw`h-44 p-2 bg-[#262329] w-full rounded-lg`}>
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
            <TouchableOpacity
              onPress={handleUploadPdf}
            >
              <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 justify-center`}>
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
            </TouchableOpacity>
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
            containerStyle={tw`bg-primary w-[100%] rounded-2xl`}
          />
        </View>
        <NormalModal
          layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
          containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
          visible={inputConfirmationModalVisible}
          setVisible={setInputConfirmationModalVisible}>
          <View>
            <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
              Your data has been saved successfully!
            </Text>

            <View style={tw`mt-2`}>
              <View style={tw`border-t-2 border-[#565358] w-full`}>

              </View>
              <View style={tw`border-t-2 border-b-2 border-[#565358] w-full`}>
                <Button
                  title="Continue"
                  style={tw`text-white px-6`}
                  containerStyle={tw`bg-gray-900`}
                  onPress={() => {
                    setInputConfirmationModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>
        <StatusBar backgroundColor={'gray'} translucent={false} />
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

export default EnterInput;
