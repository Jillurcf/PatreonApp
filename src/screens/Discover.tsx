import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import tw from '../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {IconBusiness, IconDrawer, IconEconomy, IconFinance, IconGeneralSearch, IconGoogle, IconLaw, iconLock, IconMarketing, IconWriting} from '../assets/icons/icons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import InputText from '../components/InputText';

type Props = {};

const Discover = () => {
  const navigation = useNavigation();
  const [successModal, setSuccessModal] = useState(false);
  const DiscoverData = [
    {id: '1', title: 'Marketing', route: '', icon: IconMarketing, iconType: 'image'},
    {id: '2', title: 'Finnance', route: '', icon: IconFinance, iconType: 'image'},
    {id: '3', title: 'Law', route: '', icon: IconLaw, iconType: 'image'},
    {id: '4', title: 'Economy', route: '', icon: IconEconomy, iconType: 'image'},
    {id: '5', title: 'Writing', route: '', icon: IconWriting, iconType: 'image'},
    {id: '6', title: 'Business', route: '', icon: IconBusiness         , iconType: 'image'},
  ];
  const {width, height} = Dimensions.get('screen');
  const handlePress = (route: string, taskId: string, icon: string) => {
    if (taskId === '3') {
      setSuccessModal(true);
    } else {
      navigation.navigate(route, {taskId});
    }
  };
  const handleTransfer = () => {
    navigation.navigate('cashTransfer');
  };
  return (
    <View style={tw`bg-black flex-1 px-[4%]`}>
      <View style={tw`flex-row justify-between my-4 items-center`}>
        <TouchableOpacity
          onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
          <SvgXml width={30} xml={IconDrawer} />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white font-AvenirLTProBlack text-right`}>
            Welcome Back
          </Text>
          <Text style={tw`text-white font-AvenirLTProBlack text-lg text-right`}>
            Sub Bou
          </Text>
        </View>
      </View>
      <Text
        style={tw`text-white font-AvenirLTProBlack text-center text-2xl my-6`}>
        Discover Contributers to {'\n'} Learn and Consult
      </Text>
      <View style={tw`my-4`}>
        <InputText
        
          containerStyle={tw`bg-[#262329] border relative border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Search & Learn'}
          placeholderColor={'#949494'}
          //   label={'Password'}
          iconLeft={IconGeneralSearch}
          // iconRight={isShowConfirmPassword ? iconLock : iconLock}
          //   onChangeText={(text: any) => setConfirmPassword(text)}
          //   isShowPassword={!isShowConfirmPassword}
          //   rightIconPress={() =>
          //     setIsShowConfirmPassword(!isShowConfirmPassword)
          //   }
        />
        <TouchableOpacity
        onPress={() => navigation.navigate("DiscoverResult")}
        style={tw`absolute right-4 top-4`}>
          <Text style={tw`text-white`}>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          key={`flatlist-2`}
          data={DiscoverData}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'center'}}
          scrollEnabled={false} // Disable FlatList scrolling
          renderItem={({item}) => (
            <TouchableOpacity
              // style={tw`md:w-28 md:h-28 sm:w-20 sm:h-20  rounded-lg m-2 h-24 bg-[#F4F1F1] justify-center items-center`}
              style={{
                width: width * 0.4,
                height: height * 0.12,
                margin: width * 0.02,
                backgroundColor: '#262329',
                borderRadius: width * 0.02,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => handlePress(item.route, item.id, item.icon)}>
              {/* {item.iconType === 'Image' ? ( */}
              {/* <Image source={item.icon} style={{width: 22, height: 22}} /> */}
              <SvgXml width={24} height={24} xml={item?.icon}/>
              {/* ) : item.iconType === 'MaterialCommunityIcons' ? (
      <MaterialCommunityIcons
        name={item.icon}
        size={20}
        color="#0C84C5"
      />
    ) : (
      <MaterialCommunityIcons
        name={item.icon}
        size={20}
        color="#0C84C5"
      />
    )} */}
              <Text
                style={tw`text-start py-2 text-white font-AvenirLTProBlack`}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({});
