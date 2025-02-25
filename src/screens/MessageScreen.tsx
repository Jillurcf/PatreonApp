import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Video from 'react-native-video'; // Ensure this is installed: npm install react-native-video
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'; // For document selection
import tw from 'twrnc'; // Tailwind for React Native

import {SvgXml} from 'react-native-svg';

import NormalModal from '../components/NormalModal';
import {
  AttachmentIcon,
  CrossIcon,
  IconBack,
  KibubIcon,
  LeftArrow,
  SendIcon,
  StillCamera,
  Uparrow,
  VideoCam,
} from '../assets/icons/icons';

const MessageScreen = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [conversation_id, setConversation_id] = useState();
  // console.log('cid', conversation_id);
  // const {data} = useGetUserQuery({});
  // const {data: messageData, refetch} = useGetMessageQuery({
  //   per_page: 10,
  //   id: conversation_id,
  // });
  // const [postSendMessage] = usePostSendMessageMutation();
  // console.log('data++++++++', messageData?.messages?.data);
  // const receiverInfo = route?.params;
  // const id = route?.params.id;
  // useEffect(() => {
  //   setConversation_id(id);
  // }, [id]);
  // console.log('receiver info++++++++++++++++++++++++', receiverInfo);

  // console.log('receiverInfo', receiverInfo);

  const [mediaUri, setMediaUri] = useState(null); // For holding the selected media URI
  const [mediaType, setMediaType] = useState(null); // 'image', 'video', or 'document'
  const [text, setText] = useState(''); // Message input field
  const [messages, setMessages] = useState([]); // Message state
  console.log('messages', messages?.text);
  // console.log('message==================', messages);
  // const socket = getSocket();

  // Join the chat room and listen for real-time messages
  // useEffect(() => {
  //   if (receiverInfo && data?.data?.id) {
  //     socket.emit('joinRoom', {
  //       userId: data?.data?.id,
  //       receiverId: receiverInfo?.receiverId,
  //     });

  //     const receiveMessageListener = () => {
  //       refetch();
  //     };

  //     socket.on(`receive_message`, receiveMessageListener);
  //     // console.log("reciveImge ++++++++++++++++++++++++++++++++++++", receiveImage)

  //     return () => {
  //       socket.off('receive_message', receiveMessageListener);
  //     };
  //   }
  // }, [receiverInfo, data?.data]);

  // Fetch initial chat messages
  // useEffect(() => {
  //   if (messageData) {
  //     setMessages(messageData?.messages?.data);
  //   }
  // }, [messageData, conversation_id]);

  // const sendMessage = async () => {
  //   if (text.trim() || mediaUri) {
  //     const messageText = text.trim() || 'Sent an image/video/document';
  //     const message = {
  //       message: messageText,
  //       user: 'User1', // Use dynamic data for the user
  //       createdAt: new Date(),
  //       media: mediaUri || null, // Add media URI if exists
  //       is_sender: true, // Mark this message as sent by the user
  //     };

  //     // Update local state for instant message visibility
  //     setMessages(prev => [...prev, message]);

  //     // Emit message via socket
  //     // socket.emit('send_message', {
  //     //   conversation_id: conversation_id, // Ensure you have conversation_id
  //     //   userId: "User1", // Replace with the dynamic user ID
  //     //   receiverId: receiverInfo?.receiverId,
  //     //   message: messageText,
  //     //   media: mediaUri || null,
  //     // });

  //     // Clear the input fields after sending the message
  //     setText('');
  //     setMediaUri(null);
  //     setMediaType(null);
  //   }
  // };

  const sendMessage = () => {
    if (text.trim() || mediaUri) {
      console.log('message sent: ', text);
      const message = {
        text: text.trim() || 'Sent a document',
        user: 'User1', // Replace with dynamic user data
        createdAt: new Date(),
        media: mediaUri,
        mediaType, // 'image', 'video', or 'document'
      };
      // console.log('message', message);
      // Add the message to local state
      setMessages(prev => [...prev, message]);

      // Clear input fields after sending the message
      setText('');
      setMediaUri(null);
      setMediaType(null);
    }
  };

  async function requestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const pickMedia = type => {
    launchImageLibrary(
      {
        mediaType: type,
        quality: 1,
        selectionLimit: 1, // Allow only one selection
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled media selection');
        } else if (response.errorMessage) {
          console.error('MediaPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setMediaUri(response.assets[0].uri); // Set the URI of the selected media
          setMediaType(type); // Set the media type (image or video)
        }
      },
    );
  };

  // Function to pick document (PDF, Word, etc.)
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setMediaUri(res.uri); // Set the URI of the selected document
      setMediaType('document'); // Set media type as 'document'
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
      }
    }
  };

  const capturePhoto = async () => {
    // Request camera permission before launching camera
    await requestCameraPermission();

    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      },
      response => {
        console.log('photos', response);
        if (response.didCancel) {
          console.log('User cancelled photo capture');
        } else if (response.errorMessage) {
          console.error('Camera Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setMediaUri(response.assets[0].uri); // Set the captured photo URI
          setMediaType('image'); // Set the media type as 'image'
        }
      },
    );
  };

  const pickPhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1, // Allow only one image
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled media selection');
        } else if (response.errorMessage) {
          console.error('MediaPicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log('Selected Image:', response.assets[0]); // Debugging log
          setMediaUri(response.assets[0].uri);
          setMediaType('image');
        }
      },
    );
  };

  const recordVideo = async () => {
    // Request camera permission before recording video
    await requestCameraPermission();

    launchCamera(
      {
        mediaType: 'video',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled video recording');
        } else if (response.errorMessage) {
          console.error('Camera Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setMediaUri(response.assets[0].uri); // Set the recorded video URI
          setMediaType('video'); // Set the media type as 'video'
        }
      },
    );
  };
  const toggleModal = () => setOpenModal(prev => !prev);

  // React.useEffect(() => {

  // }, [receiverInfo, data?.data]);
  const selectMediaType = () => {
    Alert.alert('Choose Media', 'Select the type of media you want to upload', [
      {
        text: 'Image',
        onPress: () => pickMedia('photo'),
      },
      {
        text: 'Video',
        onPress: () => pickMedia('video'),
      },
      {
        text: 'Document',
        onPress: () => pickDocument(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={tw`flex-1 px-2 bg-black`}>
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
          User Name
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      {/* Message List */}
      <FlatList
        keyboardShouldPersistTaps="always"
        inverted
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          // console.log('messageItem', item);
          return (
            <View
              style={[
                tw`mb-3 p-3 rounded-lg  w-[85%] text-black`,
                item?.is_sender === true
                  ? tw`bg-gray-200 self-end text-black`
                  : tw`bg-gray-200 self-start text-black`,
              ]}>
              <View>
                <Text style={tw`font-MontserratRegular text-black`}>
                  {item.user|| 'Jillur'}
                </Text>
                {item.media && (
                  <>
                    {item.media.includes('.mp4') ||
                    item.media.includes('.mov') ? (
                      <Video
                        source={{uri: item.media}}
                        style={tw`h-30 w-full rounded-lg my-2`}
                        resizeMode="cover"
                        controls
                      />
                    ) : (
                      <Image
                        source={{uri: item.media}}
                        style={tw`h-30 w-full rounded-lg my-2`}
                        resizeMode="cover"
                      />
                    )}
                  </>
                )}
                <Text style={tw`text-black font-MontserratRegular`}>
                 {item?.text}
                </Text>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-xs flex-row text-end text-black mt-2`}>
                    {item.created_at_formatted}
                  </Text>
                  <Text style={tw`text-xs flex-row text-end text-black mt-2`}>
                    {item.created_at_date}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={tw`p-4`}
      />

      {/* Input and Send Button */}
      <View style={tw``}>
        <View style={tw`flex-row items-center p-3  w-[95%]`}>
          <TouchableOpacity
            onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-14 z-30`}>
            <SvgXml xml={AttachmentIcon} width={20} height={20} />
          </TouchableOpacity>
          <View
            style={tw`flex-row w-[90%] gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-full h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Message..."
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={text}
              onChangeText={value => setText(value)}
            />
            {/* message send option */}
            <TouchableOpacity
              onPress={sendMessage}
              style={tw` border items-center justify-center p-2 rounded-2xl`}>
              {/* <Text style={tw`text-white text-sm font-MontserratBold`}>Send</Text> */}
              <View
                style={tw`bg-white h-10 w-10 justify-center rounded-full items-center`}>
                <SvgXml xml={Uparrow} width={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Preview Selected Media */}
      {mediaUri && mediaType === 'image' && (
        <View style={tw`flex-row items-center p-3`}>
          <Image
            source={{uri: mediaUri}}
            style={tw`h-20 w-20 rounded-lg`}
            resizeMode="cover"
          />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )}
      {mediaUri && mediaType === 'video' && (
        <View style={tw`flex-row items-center p-3`}>
          <Video
            source={{uri: mediaUri}}
            style={tw`h-40 w-full rounded-lg`}
            resizeMode="cover"
            controls
          />
          <SvgXml xml={VideoCam} width={20} height={20} />
          <Button title="Remove" onPress={() => setMediaUri(null)} />
        </View>
      )}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* Button to open the modal */}
        {/* <Button title="Open Modal"  /> */}

        {/* NormalModal usage */}
        <NormalModal
          visible={openModal}
          setVisible={setOpenModal}
          animationType="fade" // Optional, choose 'none', 'slide', or 'fade'
          scrollable={true} // Optional, to make the modal content scrollable
          layerContainerStyle={{padding: 20}} // Optional, styling for the background layer
          containerStyle={{borderRadius: 10}} // Optional, styling for the modal container
        >
          {/* Content inside the modal */}
          <View>
            <View style={tw`flex-row w-full justify-end`}>
              <TouchableOpacity
                style={tw`text-red-700 border border-red-800 items-center justify-center h-6 w-6 rounded-full`}
                onPress={toggleModal}>
                <SvgXml color={'red'} xml={CrossIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={tw`font-MontserratBold text-black text-xl`}>
                Delete Conversation
              </Text>
              <Text style={tw`font-MontserratBold text-black text-xl py-4`}>
                Block
              </Text>
              <Text style={tw`font-MontserratBold text-red-900 text-xl`}>
                Delete{' '}
              </Text>
            </View>
          </View>
        </NormalModal>
      </View>
      <StatusBar translucent={false} />
    </View>
  );
};

export default MessageScreen;
