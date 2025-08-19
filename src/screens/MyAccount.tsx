import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../assets/icons/icons'
import { useAttachBankAccountMutation, useMyBanckAccountsQuery } from '../redux/apiSlice/paymentSlice'
import Button from '../components/Button'

type Props = {}

const MyAccount = ({ navigation }: { navigation: any }) => {
  const { data } = useMyBanckAccountsQuery({});
  

  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full items-center justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
          My accounts
        </Text>
        <View style={tw`w-8`} />
      </View>

      <FlatList
        style={tw`mt-4`}
        keyExtractor={(item) => item._id}
        data={data?.data}
        renderItem={({ item }) => {
          console.log(item, "item in MyAccount");
          return (
            <View style={tw`bg-[#262329] my-1 rounded-2xl py-4 p-3`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`flex-1 pb-2`}>
                  <Text style={tw`text-white font-AvenirLTProBlack`}>
                    Bank Name: {item?.bank_account?.bank_name}
                  </Text>
                  <Text style={tw`text-white mt-1 text-xs font-AvenirLTProBlack`}>
                    Account Id: {item?.id}
                  </Text>
                  <Text style={tw`text-white mt-1 text-xs font-AvenirLTProBlack`}>
                    Routing number: {item?.bank_account?.routing_number}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}

      />
      <View style={tw`my-4`}>
        <Button
        onPress={()=> navigation.navigate('AttachBankAccount')}
        title={"Add new account"} contentContainerStyle={tw`w-[50%]`} />
      </View>
      <StatusBar translucent={false} />
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({})