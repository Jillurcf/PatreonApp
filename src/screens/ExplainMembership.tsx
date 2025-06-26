// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Modal,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// import { SvgXml } from 'react-native-svg';
// import { useColorScheme } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import Textarea from 'react-native-textarea';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// import { usePostBecmeAContibutorMutation } from '../redux/apiSlice/serviceSlice';
// import { getExplainMemberValue, setExplainMemberValue } from '../utils';
// import tw from '../lib/tailwind';
// import { IconBack, IconCross, IconDollar, IconUpload } from '../assets/icons/icons';
// import TButton from '../components/TButton';
// import { useGetAllCategoryQuery } from '../redux/apiSlice/categorySlice';

// const initialDropdown = [
//   { label: 'marketing', value: '1' },
//   { label: 'finance', value: '2' },
//   { label: 'law', value: '3' },
//   { label: 'economy', value: '4' },
//   { label: 'writing', value: '5' },
//   { label: 'business', value: '6' },
//   { label: 'Add New...', value: 'add_new' },
// ];

// const ExplainMembership = ({ navigation }: { navigation: any }) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [iconUri, setIconUri] = useState(null);
//   const [value, setValue] = useState({
//     title: '',
//     subtitle: '',
//     currency: '',
//     price: '',
//     description: '',
//     category: '',
//     icon: null as null | {
//       uri: string;
//       type: string;
//       name: string;
//       content: string;
//     },
//   });
//   console.log(value?.category, "value in explainMembership++++++")
//   const [dropdownItems, setDropdownItems] = useState();
//   const [isFocus, setIsFocus] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [newCategory, setNewCategory] = useState('');
//   const { data: category } = useGetAllCategoryQuery({})
//   console.log(category?.data, "category data from api")
//   // const [postBecmeAContibutor, { isLoading }] = usePostBecmeAContibutorMutation();

//   useEffect(() => {
//     const savedValue = getExplainMemberValue();
//     if (savedValue) setValue(savedValue);
//   }, []);

//   useEffect(() => {
//     setExplainMemberValue(value);
//   }, [value]);

//   useEffect(() => {
//   if (category?.data) {
//     const formatted = [
//       ...category.data.map(item => ({
//         label: item.name,
//         value: item._id,
//         ...item,
//       })),
//       { label: 'Add New...', value: 'add_new' },
//     ];
//     setDropdownItems(formatted);
//   }
// }, [category]);


//   const handleSave = async () => {
//     // try {
//     //   const formData = new FormData();
//     //   formData.append('title', value.title);
//     //   formData.append('subtitle', value.subtitle);
//     //   formData.append('currency', value.currency);
//     //   formData.append('description', value.description);
//     //   formData.append('category', value.category);

//     //   const res = await postBecmeAContibutor(formData);
//     //   if ('data' in res) {
//     setExplainMemberValue(value);
//     navigation.navigate('ExplainMembership1');
//     //   } else {
//     //     Alert.alert('Submission Failed', 'Please try again later.');
//     //   }
//     // } catch (err) {
//     //   Alert.alert('Error', 'An unexpected error occurred.');
//     // }
//   };

//  const addNewCategory = () => {
//   if (newCategory.trim() === '') return;

//   const items = dropdownItems ?? [];

//   const updated = [
//     ...items.slice(0, -1),
//     { label: newCategory, value: `${items.length}` },
//     items[items.length - 1],
//   ];

//   setDropdownItems(updated);
//   setValue(prev => ({ ...prev, category: newCategory }));
//   setNewCategory('');
//   setShowModal(false);
// };


//   const renderItem = (item: { label: string; value: string }) => (
//     <View
//       style={[
//         styles.item,
//         { backgroundColor: isDarkMode ? '#222' : '#eee' },
//       ]}
//     >
//       <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.label}</Text>
//     </View>
//   );
//   const handleAdd = () => {
//     if (newCategory.trim()) {
//       addNewCategory(newCategory.trim());
//       setNewCategory('');
//       setShowModal(false);
//     }
//   };

//   const uploadIcon = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles], // OR use explicit MIME
//         // type: ['image/svg+xml'],
//       });

//       const file = res[0];
//       console.log(file);

//       // Check and validate MIME
//       if (file.type !== 'image/svg+xml') {
//         Alert.alert('Invalid file', 'Please upload an SVG file.');
//         return;
//       }

//       // setValue(prev => ({
//       //   ...prev,
//       //   icon: {
//       //     uri: file.uri,
//       //     type: file.type,
//       //     name: file.name,
//       //   },
//       // }));
//       const svgContent = await RNFS.readFile(file.uri, 'utf8');
//       setValue(prev => ({
//         ...prev,
//         icon: {
//           uri: file.uri,
//           type: file.type,
//           name: file.name,
//           content: svgContent, // ✅ store SVG string
//         },
//       }));
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled picker');
//       } else {
//         console.error('File picker error', err);
//       }
//     }
//   };

//  const formattedCategoryData = Array.isArray(category?.data)
//   ? [
//       ...category.data.map(item => ({
//         label: item.name,
//         value: item._id,
//         ...item,
//       })),
//       { label: 'Add New...', value: 'add_new' },
//     ]
//   : [{ label: 'Add New...', value: 'add_new' }];



//   return (
//     <ScrollView contentContainerStyle={tw`flex-1 bg-black px-[4%]`}>
//       <View style={tw`my-10`}>
//         {/* Header */}
//         <View style={tw`flex-row w-full justify-between items-center`}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={tw`bg-PrimaryFocus rounded-full p-1`}
//           >
//             <SvgXml xml={IconBack} />
//           </TouchableOpacity>
//           <Text style={tw`text-white font-bold text-2xl`}>
//             Explain Membership
//             </Text>
//           <View style={tw`w-8`} />
//         </View>

//         {/* Title Input */}
//         <Text style={tw`text-white font-bold text-xs mt-4`}>
//           Title
//         </Text>
//         <TextInput
//           style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
//           placeholder="Write title here"
//           placeholderTextColor={'white'}
//           value={value.title}
//           onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
//         />

//         {/* Subtitle Input */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           Subtitle
//         </Text>
//         <TextInput
//           style={tw`mt-1 w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-3`}
//           placeholder="Write subtitle here"
//           placeholderTextColor={'white'}
//           value={value.subtitle}
//           onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
//         />

//         {/* Currency Input */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           price
//         </Text>
//         <View style={tw`relative mt-2`}>
//           <TextInput
//             style={tw`w-full h-10 text-white bg-[#262329] border border-gray-400 rounded-2xl px-10`}
//             placeholder="Enter price"
//             placeholderTextColor={'white'}
//             value={value.currency}
//             onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
//           />
//           <View style={tw`absolute left-3 top-2`}>
//             <SvgXml xml={IconDollar} width={20} height={20} />
//           </View>
//         </View>

//         {/* Description Textarea */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           About
//         </Text>
//         <View style={tw`h-44 mt-2 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
//           <Textarea
//             style={tw`h-40 text-white`}
//             placeholder="Write description here"
//             placeholderTextColor="#c7c7c7"
//             underlineColorAndroid="transparent"
//             multiline
//             maxLength={120}
//             value={value.description}
//             onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
//             textAlignVertical="top"
//           />
//         </View>

//         {/* Dropdown */}
//         <Text style={tw`text-white font-bold text-xs mt-2`}>
//           Category
//         </Text>
//         <View style={tw`mt-2`}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             data={formattedCategoryData}
//             maxHeight={600}
//             labelField="label"
//             valueField="label"
//             placeholder={!isFocus ? 'Select category' : '...'}
//             value={value.category}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={item => {
//               console.log(item, "item from dropdown")
//               if (item.value === 'add_new') {
//                 setShowModal(true);
//               } else {
//                 setValue(prev => ({ ...prev, category: item.label }));
//               }
//               setIsFocus(false);
//             }}
//             renderItem={renderItem}
//           />
//         </View>
//       </View>

//       {/* Submit Button */}
//       <View style={tw`mb-10 mt-6 items-center`}>
//         <TButton
//           onPress={handleSave}
//           title="Continue"
//           titleStyle={tw`text-black font-bold`}
//           containerStyle={tw`bg-primary w-[90%] rounded-full`}
//         />
//       </View>

//       {/* Modal */}
//       <Modal visible={showModal} transparent animationType="slide">
//         <View style={tw`flex-1 justify-center items-center bg-black/50`}>
//           <View style={tw`bg-[#262329] w-[90%] p-5 rounded-xl`}>
//             <Text style={tw`text-lg font-semibold mb-3 text-white`}>
//               Add New Category
//             </Text>

//             <TextInput
//               placeholder="Enter category name"
//               value={newCategory}
//               onChangeText={setNewCategory}
//               placeholderTextColor="#999"
//               style={tw`border border-gray-300 px-3 py-2 rounded-lg text-white`}
//             />
//             {/* <View style={tw`mt-2 h-24 items-center justify-center border border-gray-300 rounded-lg p-2`}>
//               {value.icon?.content ? (
//                 <View style={tw`relative right-0 items-center p-2 border  border-white rounded-lg w-[14]`}>
//                   <SvgXml
//                     xml={value.icon.content}
//                     width={25}
//                     height={25}
//                   />
//                   <TouchableOpacity
//                     style={tw`absolute top-0 right-0`}
//                     onPress={(e) => {
//                       e.stopPropagation(); // Prevent triggering the upload
//                       setValue(prev => ({ ...prev, icon: null })); // Clear icon
//                     }}
//                   >
//                     <SvgXml xml={IconCross} width={20} height={20} />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <TouchableOpacity onPress={uploadIcon} style={tw``}>
//                   <SvgXml xml={IconUpload} width={25} height={25} />
//                 </TouchableOpacity>

//               )}
//               {!value.icon?.uri && (
//                 <Text style={tw`text-center font-bold mt-2 `}>Add Iocn</Text>
//               )}

//             </View> */}

//             <View style={tw`flex-row justify-end mt-4`}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setNewCategory('');
//                   setShowModal(false);
//                 }}
//                 style={tw`mr-4`}
//               >
//                 <Text style={tw`text-red-500`}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={handleAdd}>
//                 <Text style={tw`text-white`}>Add</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     height: 50,
//     borderColor: '#888',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     backgroundColor: '#262329',
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: '#ccc',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: 'white',
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   item: {
//     padding: 15,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//   },
// });

// export default ExplainMembership;

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
  const [newCategory, setNewCategory] = useState('');
  const { data: category } = useGetAllCategoryQuery({});

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
    const isEmpty =
      !value.title.trim() ||
      !value.subtitle.trim() ||
      !value.currency.trim() ||
    
      !value.description.trim() ||
      !value.category.trim()
      

    if (isEmpty) {
      console.log(isEmpty, "isEmpty+++++++++++++")
      Alert.alert('Error', 'Please fill in all fields before continue.');
      console.log('Error', 'Please fill in all fields before uploading.');
      return;
    }

    setExplainMemberValue(value);
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

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`bg-PrimaryFocus rounded-full p-1`}>
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
            onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
          />
          <View style={tw`absolute left-3 top-2`}>
            <SvgXml xml={IconDollar} width={20} height={20} />
          </View>
        </View>
 {!value.currency.trim() && (
          <Text style={tw`text-red-600 text-xs mt-2`}>
            Please enter a price.*</Text>
        )}
        <Text style={tw`text-white font-bold text-xs mt-2`}>About</Text>
        <View style={tw`h-44 mt-2 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
          <Textarea
            style={tw`h-40 text-white`}
            placeholder="Write description here"
            placeholderTextColor="#c7c7c7"
            underlineColorAndroid="transparent"
            multiline
            maxLength={120}
            value={value.description}
            onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
            textAlignVertical="top"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 12,
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
