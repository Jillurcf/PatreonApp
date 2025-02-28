import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import NumericInput from 'react-native-numeric-input';

import {NavigProps} from '../interface/NaviProps';
import {Dropdown} from 'react-native-element-dropdown';
import Textarea from 'react-native-textarea';

import {
  AttachmentIcon,
  BulbIcon,
  CrossIcon,
  Gallery,
  IconBack,
  IconDollar,
  IconRightArrow,
  StillCamera,
  VideoCam,
} from '../assets/icons/icons';
import IButton from '../components/IButton';
import TButton from '../components/TButton';
import tw from '../lib/tailwind';
import IconArrow from '../components/IconArrow';
import {SvgXml} from 'react-native-svg';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const ExplainMembership = ({navigation}: NavigProps<null>) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Explain Membership
          </Text>
          <View style={tw`w-8`} />
        </View>
        
        <Text style={tw`text-white font-AvenirLTProBlack mt-6 mb-2`}>
          Price
        </Text>
        <View style={tw`flex-row w-[100%] items-center p-3`}>
          <TouchableOpacity
            // onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-6 z-30`}>
            <SvgXml xml={IconDollar} width={20} height={20} />
          </TouchableOpacity>
          <View
            style={tw`flex-row  gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Currency"
              placeholderTextColor={'white'}
              cursorColor={'white'}
              // value={text}
              // onChangeText={value => setText(value)}
            />
          </View>
        </View>

        {/* ==========================input textarea ========================= */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text>
          <View
            style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
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
        {/* ==========================drop down area =============================== */}
        <View style={tw`mt-8`}>
          <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text>
          <View
            style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
            <View style={styles.container}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
          titleStyle={tw`text-black font-bold text-center`}
          title="Save"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default ExplainMembership;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262329',
    padding: 16,
  },
  dropdown: {
    height: 50,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },
  // label: {
  //   position: 'absolute',

  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
