import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

import {SvgXml} from 'react-native-svg';
import {NavigProps} from '../interface/NaviProps';
import Textarea from 'react-native-textarea';

import {
  BulbIcon,
  CrossIcon,
  Gallery,
  IconBack,
  StillCamera,
  VideoCam,
} from '../assets/icons/icons';
import IButton from '../components/IButton';
import TButton from '../components/TButton';
import tw from '../lib/tailwind';

const EnterInput = ({navigation}: NavigProps<null>) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);

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

  // Open camera to capture images
  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });

      setSelectedImages(prev => [...prev, image.path]);
      Alert.alert('Success', 'Image saved locally!');
    } catch (error) {
      console.error('Camera Error:', error);
      Alert.alert('Error', 'Camera not available. Please check permissions.');
    }
  };

  // Capture video
  const captureVideo = async () => {
    try {
      const video = await ImageCropPicker.openCamera({
        mediaType: 'video',
      });
      setCapturedVideo(video.path);
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  // Remove a specific image
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Clear the captured video
  const clearCapturedVideo = () => {
    setCapturedVideo(null);
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] items-center justify-between px-4`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>Enter Input</Text>
          <View style={tw`w-8`} />
        </View>
        {/* ==========================input area ========================= */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Input</Text>
          <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
            <Textarea
              style={tw`text-left h-40 text-white`}
              placeholder={'Write it here'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              multiline
              maxLength={120}
              //   value={text}
              //   onChangeText={setText}
              textAlignVertical="top" // Ensures text starts from the top
            />
          </View>
        </View>
        {/* Media Upload */}
        <View style={tw` my-6 `}>
          <Text style={tw`text-white font-AvenirLTProBlack`}>Upload file</Text>
          <View
            style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
            <View style={tw`flex-row gap-6`}>
              <IButton
                containerStyle={tw`p-4 rounded-full`}
                svg={Gallery}
                onPress={openGallery}
              />
              <IButton
                containerStyle={tw`p-4 rounded-full`}
                svg={StillCamera}
                onPress={openCamera}
              />
              <IButton
                containerStyle={tw`p-4 rounded-full`}
                svg={VideoCam}
                onPress={captureVideo}
              />
            </View>
            <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>

            {/* Display selected images */}
            {selectedImages.length > 0 && (
              <View style={tw`flex-row flex-wrap gap-2 my-4`}>
                {selectedImages.map((image, index) => (
                  <View key={index} style={tw`relative`}>
                    <TouchableOpacity
                      onPress={() => navigation?.navigate('promptScreen')}>
                      <Image
                        source={{uri: image}}
                        style={tw`w-24 h-24 rounded-lg`}
                      />
                    </TouchableOpacity>
                    <IButton
                      containerStyle={tw`absolute top-[-8px] right-[-8px] bg-red-500 rounded-full p-1`}
                      svg={CrossIcon}
                      onPress={() => handleRemoveImage(index)}
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Display captured video */}
            {capturedVideo && (
              <View style={tw`relative`}>
                <Video
                  source={{uri: capturedVideo}}
                  style={tw`w-72 h-48 mt-2`}
                  controls
                  resizeMode="contain"
                />
                <IButton
                  containerStyle={tw`absolute top-[-8px] right-[-8px] bg-red-500 rounded-full p-1`}
                  svg={CrossIcon}
                  onPress={clearCapturedVideo}
                />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
          onPress={() => {
            if (selectedImages.length >= 4) {
              navigation?.navigate('promptScreen', {selectedImages});
            } else {
              Alert.alert('You must select at least 4 images!');
            }
          }}
          titleStyle={tw`text-black font-bold text-center`}
          title="Save"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default EnterInput;
