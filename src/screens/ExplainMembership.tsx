
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { useColorScheme } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Textarea from 'react-native-textarea';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import { usePostBecmeAContibutorMutation } from '../redux/apiSlice/serviceSlice';
import { getExplainMemberValue, setExplainMemberValue } from '../utils';
import tw from '../lib/tailwind';
import { IconBack, IconCross, IconDollar, iconTick, IconUpload } from '../assets/icons/icons';
import TButton from '../components/TButton';
import { useGetAllCategoryQuery } from '../redux/apiSlice/categorySlice';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';

const ExplainMembership = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = useState({
    title: '',
    subtitle: '',
    currency: '',
    price: '',
    description: '',
    category: '',
    icon: null,
  });
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [priceError, setPriceError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { data: category } = useGetAllCategoryQuery({});
  const [explainMembershipConfirmationModalVisible, setExplainMembershipConfirmationModalVisible] =
    useState(false);

  useEffect(() => {
    const savedValue = getExplainMemberValue();
    if (savedValue) setValue(savedValue);
  }, []);

  useEffect(() => {
    setExplainMemberValue(value);
  }, [value]);

  useEffect(() => {
    if (category?.data) {
      const formatted = [
        ...category.data.map(item => ({
          label: item.name,
          value: item._id,
        })),
        { label: 'Add New...', value: 'add_new' },
      ];
      setDropdownItems(formatted);
    }
  }, [category]);




  const handleSave = async () => {

    // currently checking if it is less than 3, but should be less than or equal to 3
    const price = parseFloat(value.currency);

    if (isNaN(price)) {
      console.log('Error', 'Please enter a valid number');
        setPriceError("Please enter a valid number")
      return;
    }

    if (price < 3) {
      console.log('Error', 'Price must be at least $3');
      setPriceError('Price must be at least $3');
      return;
    }

    // Proceed with saving
    console.log('Valid price:', price);


    const isEmpty =
      !value.title.trim() ||
      !value.subtitle.trim() ||
      !value.currency.trim() ||
      !value.description.trim() ||
      !value.category.trim()


    if (isEmpty) {
      console.log(isEmpty, "isEmpty+++++++++++++")
      // Alert.alert('Error', 'Please fill in all fields before continue.');
      setExplainMembershipConfirmationModalVisible(true);
      console.log('Error', 'Please fill in all fields before uploading.');
      return;
    }

    setExplainMembershipConfirmationModalVisible(true);
    setExplainMemberValue(value);
    // setValue(
    //   {
    //     title: '',
    //     subtitle: '',
    //     currency: '',
    //     description: '',
    //     category: '',
    //   }
    // )
    navigation.navigate('ExplainMembership1');
    
  };

  const addNewCategory = () => {
    if (newCategory.trim() === '') return;

    const updated = [
      ...dropdownItems.slice(0, -1),
      { label: newCategory, value: `custom_${Date.now()}` },
      dropdownItems[dropdownItems.length - 1],
    ];

    setDropdownItems(updated);
    setValue(prev => ({ ...prev, category: newCategory }));
    setNewCategory('');
    setShowModal(false);
  };

  const renderItem = item => (
    <View style={[styles.item, { backgroundColor: isDarkMode ? '#222' : '#262329', }]}>

      <Text style={{ color: isDarkMode ? '#fff' : 'white' }}>{item.label}</Text>

    </View>
  );

  const uploadIcon = async () => {
    try {
      const res = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] });
      const file = res[0];
      if (file.type !== 'image/svg+xml') {
        Alert.alert('Invalid file', 'Please upload an SVG file.');
        return;
      }
      const svgContent = await RNFS.readFile(file.uri, 'utf8');
      setValue(prev => ({
        ...prev,
        icon: {
          uri: file.uri,
          type: file.type,
          name: file.name,
          content: svgContent,
        },
      }));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) console.error('File picker error', err);
    }
  };

  // const handleCurrencyChange = (text: string) => {
  //   // Convert input text to number
  //   const price = parseFloat(text);

  //   // Check if it's a valid number and less than 3
  //   // if (!isNaN(price) && price < 3) {
  //   //   Alert.alert('Error', 'Minimum price must be $3');
  //   //   return;
  //   // }

  //   if (isNaN(price) || Number(price) < 3) {
  //     // Alert.alert('Error', 'Minimum price must be $3');
  //     return;
  //   }

  //   // proceed with valid price
  //   console.log('Valid price:', price);


  //   // If valid, update currency state
  //   setValue(prev => ({ ...prev, currency: text }));
  // };

  const handleCurrencyChange = (text: string) => {
    // Allow user to type anything, just store the value
    setValue(prev => ({ ...prev, currency: text }));
  };


  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-black rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold text-2xl`}>Explain Membership</Text>
          <View style={tw`w-8`} />
        </View>

        <Text style={tw`text-white font-bold text-xs mt-4`}>Title</Text>
        <TextInput
          style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
          placeholder="Write title here"
          placeholderTextColor="white"
          value={value.title}
          onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
        />
        {!value.title.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a title.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>Subtitle</Text>
        <TextInput
          style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
          placeholder="Write subtitle here"
          placeholderTextColor="white"
          value={value.subtitle}
          onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
        />
        {!value.subtitle.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a subtitle.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>Price</Text>
        <View style={tw`relative mt-2`}>
          <TextInput
            style={tw`w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-10`}
            placeholder="Enter price (Minimum 3$)"
            placeholderTextColor="white"
            value={value.currency}
            // onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
            onChangeText={handleCurrencyChange}
          />
          <View style={tw`absolute left-3 top-2`}>
            <SvgXml xml={IconDollar} width={20} height={20} />
          </View>
        </View>
        {priceError ? (
          <Text style={tw`text-red-600 text-xs mt-2`}>{priceError}</Text>
        ) : null}
        {!value.currency.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a price.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>About</Text>
        <View style={tw`h-44 mt-2 p-2 bg-[#262329] border border-gray-400 w-full rounded-2xl`}>
          <TextInput
            selectionColor="white"
            style={tw`text-white rounded-lg p-3 h-32 `}
            onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
            value={value.description}
            placeholder="Enter your text here..."
            placeholderTextColor="#c7c7c7"
            multiline={true} // makes it a text area
            textAlignVertical="top" // keeps text starting from top
          />
        </View>
        {!value.description.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a description.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>Category</Text>
        <View style={tw`mt-2`}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dropdownItems}
            maxHeight={600}
            labelField="label"
            valueField="label"
            placeholder={!isFocus ? 'Select category' : '...'}
            value={value.category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              if (item.value === 'add_new') {
                setShowModal(true);
              } else {
                setValue(prev => ({ ...prev, category: item.label }));
              }
              setIsFocus(false);
            }}
            renderItem={renderItem}
          />
        </View>
        {!value.description.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please select a category.*</Text>
        )}
      </View>

      <View style={tw`mb-10 mt-4 items-center`}>
        <TButton
          onPress={handleSave}
          title="Continue"
          titleStyle={tw`text-black font-bold`}
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-[#262329] w-[90%] p-5 rounded-xl`}>
            <Text style={tw`text-lg font-semibold mb-3 text-white`}>Add New Category</Text>

            <TextInput
              placeholder="Enter category name"
              value={newCategory}
              onChangeText={setNewCategory}
              placeholderTextColor="#999"
              style={tw`border border-gray-300 px-3 py-2 rounded-lg text-white`}
            />

            <View style={tw`flex-row justify-end mt-4`}>
              <TouchableOpacity
                onPress={() => {
                  setNewCategory('');
                  setShowModal(false);
                }}
                style={tw`mr-4`}
              >
                <Text style={tw`text-red-500`}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={addNewCategory}>
                <Text style={tw`text-white`}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <NormalModal
        layerContainerStyle={tw`flex-1 justify-center items-center mx-5`}
        containerStyle={tw`rounded-xl bg-zinc-900 p-5`}
        visible={explainMembershipConfirmationModalVisible}
        setVisible={setExplainMembershipConfirmationModalVisible}>
        <View>
          <Text style={tw`text-white text-lg text-center font-RoboBold mb-2`}>
            Please fill in all fields before continue.
          </Text>

          <View style={tw`mt-2`}>
            <View style={tw`border-t-2 border-gray-800 w-full`}>

            </View>
            <View style={tw`border-t-2 border-b-2 border-slate-800 w-full`}>
              <Button
                title="Continue"
                style={tw`text-white px-6`}
                containerStyle={tw`bg-gray-900`}
                onPress={() => {
                  setExplainMembershipConfirmationModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </NormalModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: '#262329',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#ccc',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
});

export default ExplainMembership;
