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
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);
  const [input, setInput] = useState("")
  console.log(input, "input========================")

  console.log('Selected Images:', selectedImages);

  // Open gallery to select images
  const openGallery = async () => {
    try {
      const images = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: true,
      });

      const imagePaths = images.map((image: any) => image.path);
      setSelectedImages(prev => [...prev, ...imagePaths]);
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };


  const [selectedPdf, setSelectedPdf] = useState(null);

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
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Input</Text>
            <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
              <TextInput
                onChangeText={(text) => setInput(text)}
                style={tw`text-left h-40 text-white`}
                placeholder="Write it here"
                placeholderTextColor="#c7c7c7"
                underlineColorAndroid="transparent"
                multiline
                maxLength={120}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Media Upload */}
          <View style={tw`my-6`}>
            <Text style={tw`text-white font-AvenirLTProBlack`}>Upload file</Text>
            <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
              <View style={tw`flex-row gap-6`}>
                {/* <IButton containerStyle={tw`p-4 rounded-full`} svg={Gallery} onPress={openGallery} /> */}
                <TouchableOpacity onPress={handleUploadPdf}>

                  <SvgXml xml={IconUpload} />
                </TouchableOpacity>
              </View>
              <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>


            </View>
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
            onPress={() => Alert.alert("Success")}
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
