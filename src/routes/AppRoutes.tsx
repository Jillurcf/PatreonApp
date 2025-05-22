import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from './Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '../redux/store';





const AppRoutes = () => {
 

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
      <NavigationContainer >
        <SafeAreaView style={{flex: 1}}>
        <Routes />
        </SafeAreaView>
      </NavigationContainer>
      </Provider>
      
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
