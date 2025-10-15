import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useGetAllServiceQuery } from '../redux/apiSlice/serviceSlice';
import tw from '../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { IconBack, IconGeneralSearch, IconRightArrow } from '../assets/icons/icons';
import InputText from '../components/InputText';
import { imageUrl } from '../redux/baseApi';

const DiscoverResult = ({ navigation, route }: { navigation: any }) => {
  const { title, taskId } = route.params || {};
  console.log(title, taskId, 'title and taskId+++++++');
  const lowerCaseTaskId = taskId?.toLowerCase() || '';
  // console.log( 'loserCaseTaskId++++++', lowerCaseTaskId);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [titles, setTitles] = useState(title || '');
  const [page, setPage] = useState(1);
  const [services, setServices] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  console.log(services, 'services+++++++');
  // Debounce title input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() === '') return;
      setTitles(searchText);
      setPage(1);
      setServices([]);
      setHasMore(true);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const { data, isLoading, error, isFetching, refetch } = useGetAllServiceQuery({
    category: lowerCaseTaskId,
    title: titles,
    page,
    limit,
  });

  // console.log(data?.data?.result, 'data+++++++');

  useEffect(() => {
    if (Array.isArray(data?.data?.result)) {
      console.log('Fetched services:', data.data.result);
      if (page === 1) {
        setServices(data.data.result);
      } else {
        setServices(prev => [...prev, ...data.data.result]);
      }
      setHasMore(page < data.data.totalPages);
    }
  }, [data]);


  const handleService = (index, item) => {
    console.log(item, 'item+++++++');
    navigation.navigate('Profile', {
      userId: item?.contributor?._id,
      serviceId: item?._id,
      title: item?.title,
      price: item?.price,
      index: index,
    });
  };

  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Search Result
        </Text>
        <View style={tw`w-8`} />
      </View>

      <View style={tw`my-8`}>
        <InputText
          style={tw`text-white`}
          containerStyle={tw`bg-[#262329] h-14 relative`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Search by service title'}
          cursorColor={'white'}
          placeholderColor={'#949494'}
          iconLeft={IconGeneralSearch}
          readonly={true}
          onChangeText={(text) => {
            setSearchText(text);
            setShowDropdown(!!text); // Show dropdown if there's input
          }}
        />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              setPage(1);
              setServices([]);
              refetch();
            }}
          />
        }
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const contributorImage = item?.contributor?.image
            ? { uri: `${imageUrl}/${item?.contributor?.image}` }
            : require('../assets/images/alteravater.png');

          return (
            <TouchableOpacity
              onPress={() => handleService(index, item)}
              style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-3`}>
              <View style={tw`flex-row items-center justify-center`}>
                <View style={tw`relative items-center mr-2`}>
                  <Image
                    source={contributorImage}
                    style={tw`w-12 h-12 rounded-full`}
                    resizeMode="cover"
                  />
                </View>

                <View style={tw`flex-1 justify-center`}>
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      {item?.title}
                    </Text>
                    <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                      {item?.description
                        ? item.description.replace(/\s*\n\s*/g, ' ').trim().slice(0, 30)
                        : "Service Description"}
                    </Text>
                  </View>
                  {/* <View style={tw`flex-row justify-between `}>
                   
                  </View> */}

                </View>

                <SvgXml xml={IconRightArrow} />
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => {
          if (!isFetching && hasMore && data?.data?.totalPages > page) {
            setPage(prev => prev + 1);
          }
        }}
        onEndReachedThreshold={0.5}
      // ListFooterComponent={
      //   isFetching && hasMore ? (
      //     <ActivityIndicator size="large" color="white" />
      //   ) : null
      // }
      />

      <StatusBar backgroundColor="black" translucent={false} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DiscoverResult;
