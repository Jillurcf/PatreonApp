import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import Home from '../screens/Home/Home';
import {
  IconCategoryDark,
  IconCategoryLight,
  IconGoogle,
  IconHomeDark,
  IconHomeLight,
  IconMessage,
  IconMessageFocus,
  IconProductDark,
  IconProductLight,
  IconSearch,
  IconSearchFocus,
  IconUserDark,
  IconUserLight,
} from '../assets/icons/icons';
import Discover from '../screens/Discover';
import IconArrow from '../components/IconArrow';
import MessageScreen from '../screens/MessageScreen';
import MessageList from '../screens/MessageList';

const Tab = createBottomTabNavigator();

function BottomRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        
        headerShown: false,
        tabBarStyle: tw`h-14 bg-black`,
        tabBarItemStyle: {
          marginVertical: 10,
        },
        tabBarLabelStyle: {
          display: 'none',
          backgroundColor: 'none'
        },
        tabBarActiveTintColor: '', // You can adjust this to the color you want for active label
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused}) => {
          let icon;
          let iconBackground = focused ? '' : 'transparent'; // Red background for active tab

          switch (route.name) {
            case 'Discover':
              icon = focused ? IconSearchFocus : IconSearch;
              break;

            case 'Message':
              icon = focused ? IconMessageFocus : IconMessage;
              break;
            case 'Product':
              icon = focused ? IconProductLight : IconProductDark;
              break;
            case 'Profile':
              icon = focused ? IconUserLight : IconUserDark;
              break;

            default:
              icon = focused ? IconUserDark : IconUserDark;
              break;
          }

          return (
            <View style={tw`rounded-2xl bg-${iconBackground} py-2 px-4`}>
              <SvgXml xml={icon} />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Message" component={MessageList} />
     
    </Tab.Navigator>
  );
}

export default BottomRoutes;
