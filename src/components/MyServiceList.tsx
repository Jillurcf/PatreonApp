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
const MyServiceList: React.FC<MyServiceListProps> = ({ data, handleEditService, handleDelete }) => {
  return (
    <View style={tw`mt-4`}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl py-4 p-3`}>
            <View style={tw`flex-row items-center`}>

              <View style={tw`flex-1 pb-2`}>
                <View style={tw`flex-row mr-2 items-center`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    {item?.title}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                    {item?.subtitle}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-2`}>
                  <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                    {item?.category}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-2`}>
                  {/* <Text style={tw`text-white font-AvenirLTProBlack`}>
                                                {item?.description.slice(0, 100)}...
                                            </Text> */}
                  <Text style={tw`text-[#C9C8C9] font-AvenirLTProLight`}>
                    {item?.description
                      ? item.description.replace(/\s*\n\s*/g, ' ').trim().slice(0, 100)
                      : "Service Description"}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row gap-4 items-center`}>
                <TouchableOpacity
                  onPress={() => handleEditService(item)}
                  style={tw` py-1 rounded-xl`}>
                  <SvgXml width={20} height={20} xml={IconEdit} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={tw`py-1 px-3 rounded-xl bg-red-500`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>Del.</Text>
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