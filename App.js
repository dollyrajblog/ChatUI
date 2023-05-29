import {
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Store from './src/Redux/Store';
import {Provider} from 'react-redux';
import MainNavigation from './src/Routes/MainNavigation';
const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Provider store={Store}>
        <MainNavigation />
      </Provider>
    </SafeAreaView>
  );
};
export default App;
