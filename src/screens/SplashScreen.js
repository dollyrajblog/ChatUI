import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
const SplashScreen = ({navigation}) => {
  let check = useSelector(state => state.theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate('MyTabs');
    }, 2000);
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: check === 'light' ? '#fff' : '#000',
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={check === 'light' ? '#fff' : '#000'}
        barStyle={check === 'light' ? 'dark-content' : 'light-content'}
        hidden={false} // to show content
      />
      <View style={styles.mainContainer}>
        <Animated.Image
          source={require('../assets/Images/logo.png')}
          style={{height: 130, width: 250, opacity: fadeAnim}}
        />
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
