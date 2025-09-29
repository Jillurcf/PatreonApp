import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { IconEdit } from '../assets/icons/icons';

interface MyServiceListProps {
    data: any[];
    handleEditService: (item: any) => void;
    handleDelete: (item: any) => void;
    IconEdit: string;
}
const MyServiceList: React.FC<MyServiceListProps> = ({data, handleEditService, handleDelete}) => {
  return (
    <View style={tw`mt-4`}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl py-4 p-3`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`flex-1 pb-2`}>
                <View style={tw`mr-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    Title: {item?.title}
                  </Text>
                  <Text style={tw`text-white mt-1 text-xs font-AvenirLTProBlack`}>
                    Price: {item?.price ? `$${item?.price}` : 'Free'}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    Subtitle: {item?.subtitle}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    Category: {item?.category}
                  </Text>
                </View>

                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`mt-2 text-white font-AvenirLTProBlack`}>
                    Description: {item?.description?.slice(0, 100)}
                  </Text>
                </View>
              </View>

              {/* Action buttons */}
              <View style={tw`flex-row gap-4 items-center`}>
                <TouchableOpacity
                  onPress={() => handleEditService(item)}
                  style={tw`py-1 rounded-xl`}
                >
                  <SvgXml width={20} height={20} xml={IconEdit} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={tw`py-1 px-3 rounded-xl bg-red-500`}
                >
                  <Text style={tw`text-white font-AvenirLTProBlack border-b border-white`}>
                    Del.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  
  )
}
export default MyServiceList;
const styles = StyleSheet.create({})