import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {data} from '../utils/dummyData';
import {useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
const {height, width} = Dimensions.get('screen');
console.log(height, width);
const AllChats = ({navigation}) => {
  const check = useSelector(state => state.theme);
  // ====== HANDLE BACK BUTTON =======
  // function handleBackButtonClick() {
  //   // console.log("===>back")
  //   BackHandler.exitApp();
  //   return true;
  // }

  // useEffect(() => {
  //   // console.log("====>b")
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);
  const RenderItem = ({item}) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatUI', {name: item.username})}
        style={{
          height: height * 0.08,
          paddingHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: check === 'light' ? 'whitesmoke' : '#424445',
          opacity: '0.1',
          marginVertical: 5,
          elevation: 1,
        }}>
        <Image
          source={require('../assets/Images/profile.png')}
          style={{height: 50, width: 50, borderRadius: 100}}
        />
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: check === 'light' ? '#000' : '#fff'}}>
              {item.username}
            </Text>
            <Text style={{color: check === 'light' ? '#000' : '#fff'}}>
              {`${item.time} pm`}
            </Text>
          </View>
          <Text style={{color: check === 'light' ? '#000' : '#fff'}}>
            {item.msg}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: check === 'light' ? '#fff' : '#000'}}>
      <StatusBar
        barStyle={check === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={check === 'light' ? '#fff' : '#000'}
        hidden={false}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => RenderItem(item)}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default AllChats;
const styles = StyleSheet.create({});
