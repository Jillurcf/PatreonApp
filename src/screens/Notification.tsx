import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import tw from '../lib/tailwind';
import {
  IconBack,
  IconNotification,
  IconNotificationMessage,
} from '../assets/icons/icons';
import { SvgXml } from 'react-native-svg';
import { useNotificationQuery } from '../redux/apiSlice/userSlice';
import { use } from 'i18next';

type Props = {};

const Notification = ({ navigation }: { navigation: any }) => {
  const { data, isLoading, isError } = useNotificationQuery({});
  console.log(data?.data, "data+++++++++")

// const sortedData = [...(data?.data ?? [])].sort(
//   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
// );

const storedData = useMemo(() => {
  return [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}, [data]);

return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
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
          style={tw`bg-black rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Notification
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>
      <View style={tw`mt-6`}>
        <FlatList
          data={storedData}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            console.log(item, "Item++++++++++++")
            return (
              <View
                style={tw`flex-row gap-3 bg-[#262329] p-4 my-1 items-center rounded-lg px-[4%]`}>
                <SvgXml xml={IconNotificationMessage} />
                <View style={tw``}>
                  {/* <Text style={tw`text-white font-AvenirLTProBlack pr-[2%]`}>
                    {item?.title}
                  </Text> */}
                  <Text style={tw`text-white font-AvenirLTProBlack pr-[14%]`}>
                    {item?.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});

// import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useMemo } from 'react';
// import tw from '../lib/tailwind';
// import { IconBack, IconNotificationMessage } from '../assets/icons/icons';
// import { SvgXml } from 'react-native-svg';
// import { useNotificationQuery } from '../redux/apiSlice/userSlice';

// const Notification = ({ navigation }: { navigation: any }) => {
//   const { data, isLoading, isError } = useNotificationQuery({});
// console.log(data?.data, "data+++++++++")
//   // Sort notifications by latest time on top, safely
//  const sortedData = useMemo(() => {
//     if (!data?.data) return [];
//     return [...data.data].sort((a, b) => {
//       const timeA = new Date(a.createdAt || 0).getTime();
//       const timeB = new Date(b.createdAt || 0).getTime();
//       return timeB - timeA; // latest first
//     });
//   }, [data]);

//   return (
//     <View style={tw`flex-1 bg-black px-[4%]`}>
//       {/* Header */}
//       <View style={tw`flex-row w-full justify-between mt-4 items-center`}>
//         <TouchableOpacity
//           onPress={() => {
//             if (navigation.canGoBack()) navigation.goBack();
//             else console.log('No screen to go back to');
//           }}
//           style={tw`bg-black rounded-full p-1`}>
//           <SvgXml xml={IconBack} />
//         </TouchableOpacity>
//         <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
//           Notification
//         </Text>
//         <View style={tw`w-8`} /> 
//       </View>

//       {/* Notification List */}
//       <View style={tw`mt-6 flex-1`}>
//         {isLoading ? (
//           <Text style={tw`text-white text-center mt-4`}>Loading...</Text>
//         ) : isError ? (
//           <Text style={tw`text-red-500 text-center mt-4`}>Failed to load notifications.</Text>
//         ) : sortedData.length === 0 ? (
//           <Text style={tw`text-white text-center mt-4`}>No notifications available.</Text>
//         ) : (
//           <FlatList
//             data={sortedData}
//             keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
//             renderItem={({ item }) => (
//               <View
//                 style={tw`flex-row gap-3 bg-[#262329] p-4 my-1 items-center rounded-lg px-[4%]`}>
//                 <SvgXml xml={IconNotificationMessage} />
//                 <View style={tw`flex-1`}>
//                   <Text style={tw`text-white font-AvenirLTProBlack pr-[14%]`}>
//                     {item?.message || 'No message'}
//                   </Text>
//                   {item?.time && (
//                     <Text style={tw`text-gray-400 text-xs`}>
//                       {new Date(item.time).toLocaleString()}
//                     </Text>
//                   )}
//                 </View>
//               </View>
//             )}
//             showsVerticalScrollIndicator={false}
//           />
//         )}
//       </View>

//       <StatusBar backgroundColor="black" translucent />
//     </View>
//   );
// };

// export default Notification;

// const styles = StyleSheet.create({});
